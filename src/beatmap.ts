import { CompileInfoJSON } from "./compileInfoJson";
import { compileLevelJSON } from "./compileLevelJson";
import { fileNameToParams, IStrLevelParams } from "./ILevelParams";
import { NoteData } from "./level_obj/notedata";
import { WallData } from "./level_obj/walldata";
import { def_duration, def_hand, def_rate, def_targets, def_walls } from "./peramiter_defs";
import { shuffleArray } from "./util";

const bar_size_mapping = [8, 6, 4, 2, 1]
export class BeatMap{
  file_name: string;
  params: IStrLevelParams;
  len_in_beats: number;
  len_in_bars: number;


  // ConvertedPeramiters:
  rate: number; // Beats between notes
  enabled_targets: number[];
  enabled_walls: number[];
  enabled_hands: number[];
  duration: number;


  shuffled_note_positions_list: number[];
  shuffled_wall_positions_list: number[];
  shuffled_hand_list: number[];

  notes: NoteData[];
  walls: WallData[];

  constructor(fileName: string) {

    // Parsing the fileName string into a nice usable JSON object
    this.params = fileNameToParams(fileName);
    console.log(this.params)

    this.notes = [];
    this.walls = [];

    this.file_name = fileName

    // Initalizing paramaters
    this.rate = def_rate(this.params.rate);

    this.enabled_targets = def_targets(this.params.targets)
    this.enabled_walls = def_walls(this.params.wall)
    this.enabled_hands = def_hand(this.params.hand)
    this.duration = def_duration(this.params.duration)

    this.len_in_beats = Math.floor(100 * (this.duration / 60));
    this.len_in_bars = Math.floor(this.len_in_beats / this.rate);
  
    this.shuffled_note_positions_list = this.getShuffledList(this.len_in_bars, this.enabled_targets);
    this.shuffled_wall_positions_list = this.getShuffledList(this.len_in_bars, this.enabled_walls);
    this.shuffled_hand_list = this.getShuffledList(this.len_in_bars, this.enabled_hands)

    
    let dat = this.generateMap();
    this.notes = dat.notes;
    this.walls = dat.obstacles;
  }

  getShuffledList(length: number, arr: any[]) {
    let newArr = [] as number[];
    if (arr.length < 1) return newArr;
    while (newArr.length < length) {
      newArr = newArr.concat(shuffleArray(arr))
    }
    return newArr;
  }

  generateMap() {
    let notes: NoteData[] = [];
    let obstacles: WallData[] = [];

    let ratio = 0.5;
      if (this.enabled_walls.length != 0 && this.enabled_targets.length != 0)
        ratio = 0.5;
      if (this.enabled_targets.length == 0)
        ratio = 1;
      if (this.enabled_walls.length == 0)
        ratio = 0;
    

     for (let i = 1; i < this.len_in_bars; i++){
      let randomVariationOffset = (this.params.rhythm == "2") ? (Math.random() * this.rate) - this.rate / 2 : 0;

      if (Math.random() >= ratio) {
        // WALLS
        obstacles.push(new WallData(
          this.rate * i + randomVariationOffset,
          this.shuffled_wall_positions_list[i] as 0 | 1 | 2,
          this.rate/2
        ))
      } else {
        notes.push(new NoteData(
          this.rate * i + randomVariationOffset,
          this.shuffled_note_positions_list[i],
          this.shuffled_hand_list[i] as 1 | 0
        ));
      }
    }
    return {
      notes: notes,
      obstacles: obstacles,
    }
  }

  getBeatmapJson() {
    return {
      level: compileLevelJSON(
        this.notes.map((note) => note.toJson()),
        this.walls.map((wall) => wall.toJson())),
      info: CompileInfoJSON("song" + this.params.song, this.file_name, 100)
    }
  }
}