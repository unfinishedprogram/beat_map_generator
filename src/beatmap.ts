import { CompileInfoJSON } from "./compileInfoJson";
import { compileLevelJSON } from "./compileLevelJson";
import { fileNameToParams, ILevelParams, strParamsToLevelParams } from "./ILevelParams";
import { NoteData } from "./level_obj/notedata";
import { ObstacleData } from "./level_obj/obstacledata";
import { def_rate, def_targets } from "./peramiter_defs";
import { shuffleArray } from "./util";

const bar_size_mapping = [8, 6, 4, 2, 1]
export class BeatMap{
  file_name: string;
  params: ILevelParams;
  len_in_beats: number;
  len_in_bars: number;


  // ConvertedPeramiters:
  rate: number; // Beats between notes
  enabled_targets: number[];



  shuffled_note_positions_list: number[];

  shuffled_hand_list: number[];
  
  current_len_in_beats: number;
  current_len_in_bars: number;

  notes: NoteData[];
  obstacles: ObstacleData[];

  constructor(fileName: string) {

    // Parsing the fileName string into a nice usable JSON object
    this.params = strParamsToLevelParams(fileNameToParams(fileName));

    this.notes = [];
    this.obstacles = [];

    this.file_name = fileName
    
    // Calculating the total number of beats in the song
    
    

    // Initalizing paramaters
    this.rate = def_rate(this.params.rate);
    this.enabled_targets = def_targets(this.params.targets)

    this.len_in_beats = Math.floor(100 * (this.params.duration / 60));
    

    this.len_in_bars = Math.floor(this.len_in_beats / this.rate);

    this.current_len_in_bars = 0;
    this.current_len_in_beats = 0;
  
    this.shuffled_note_positions_list = this.getShuffledList(this.len_in_bars, this.enabled_targets);
    this.shuffled_hand_list = this.getShuffledList(this.len_in_bars, [[0], [1], [0, 1]][this.params.hand])
    

    this.notes = this.generateNotes();
  }

  getShuffledList(length: number, arr: any[]) {
    let newArr = [] as number[];
    if (arr.length < 1) return newArr;
    while (newArr.length < length) {
      newArr = newArr.concat(shuffleArray(arr))
    }
    return newArr;
  }

  generateNotes() {
    let notes = []

    // Starting at 1, so we dont spawn an impossible note on the zeroth bar
    for (let i = 1; i < this.len_in_bars; i++){
      let randomVariationOffset = (this.params.rhythm == "2") ? (Math.random() * this.rate) - this.rate / 2 : 0;
      notes.push(new NoteData(
        this.rate * i + randomVariationOffset,
        this.shuffled_note_positions_list[i],
        this.shuffled_hand_list[i] as 1 | 0
      ));
    }
    return notes;
  }

  getBeatmapJson() {
    return {
      level: compileLevelJSON(this.notes.map((note) => note.toJson())),
      info: CompileInfoJSON("song" + this.params.song, this.file_name, 100)
    }
  }
}