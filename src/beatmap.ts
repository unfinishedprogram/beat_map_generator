import { CompileInfoJSON } from "./compileInfoJson";
import { compileLevelJSON } from "./compileLevelJson";
import { fileNameToParams, IStrLevelParams } from "./ILevelParams";
import { createNoteData } from "./level_obj/notedata";
import { createWallData } from "./level_obj/walldata";
import { def_distribution, def_duration, def_hand, def_note_type, def_rate, def_targets, def_walls, HANDS, NoteData, WallData } from "./paramiters";
import { shuffleArray } from "./util";

const RATIO = 0.8;

export class BeatMap{
  file_name: string;
  params: IStrLevelParams;
  len_in_beats: number;
  len_in_bars: number;
  current_len_in_bars: number;

  // ConvertedPeramiters:
  rate: number; // Beats between notes
  enabled_targets: number[];
  enabled_walls: (0|1|2|3)[];
  enabled_hands: HANDS;
  duration: number;
  distribution: number;

  shuffled_note_positions: number[];
  shuffled_wall_positions: number[];

  notes: NoteData[];
  walls: WallData[];

  constructor(fileName: string) {
    // Parsing the fileName string into a nice usable JSON object
    this.params = fileNameToParams(fileName);
    console.log(this.params)
    this.notes = [];
    this.walls = [];

    this.file_name = fileName
    // Initalizing from paramaters

    this.rate = def_rate(this.params.rate);
    this.enabled_targets = def_targets(this.params.targets)
    this.enabled_walls = def_walls(this.params.wall)
    this.enabled_hands = def_hand(this.params.hand)
    this.duration = def_duration(this.params.duration)
    this.distribution = def_distribution(this.params.distribution)

    this.len_in_beats = Math.floor(100 * (this.duration / 60))
    this.len_in_bars = Math.floor(this.len_in_beats / this.rate)

    console.log(this.len_in_beats)
  
    this.shuffled_note_positions = [];
    this.shuffled_wall_positions = [];

    this.current_len_in_bars = 1; // Set a starting point for buffer

    let map = this.generateMap();

    this.notes = map.notes;
    this.walls = map.obstacles;
  }

  generateMap() {
    let notes: NoteData[] = [];
    let obstacles: WallData[] = [];
    let ratio = RATIO;

    if (this.enabled_walls.length && this.enabled_targets.length) ratio = RATIO;
    if (!this.enabled_targets.length) ratio = 0;
    if (!this.enabled_walls.length) ratio = 1;

    // Generative Loop
    while(this.current_len_in_bars < this.len_in_bars) {
      
      if(Math.random() < ratio){
        let note_pos = this.getNextNotePosition();
        let note_type = def_note_type(this.enabled_hands, note_pos)
        for(let i = 0; i < (this.distribution == 2 ? 4 : 1); i++)
          this.addNote(notes, note_pos, note_type);
      } else{
        this.addWall(obstacles, this.getNextWallPosition());
      }
    }

    return {
      notes: notes,
      obstacles: obstacles,
    }
  }

  addNote(notes:NoteData[], position:number, hand: 0|1) {
    notes.push(createNoteData(this.current_len_in_bars * this.rate + this.getRhythmOffset(), position, hand))
    this.current_len_in_bars++;
  }

  addWall(walls:WallData[], position: 0 | 1 | 2){
    walls.push(createWallData(this.current_len_in_bars * this.rate + this.getRhythmOffset(), position, 1))
    this.current_len_in_bars++;
  }

  getNextNotePosition() {
    if(!this.shuffled_note_positions.length) {
      this.shuffled_note_positions = shuffleArray(this.enabled_targets)
    }
    return this.shuffled_note_positions.pop() as number;
  }

  getNextWallPosition() {
    if(!this.shuffled_note_positions.length) {
      this.shuffled_note_positions = shuffleArray(this.enabled_walls)
    }
    return this.shuffled_note_positions.pop() as 0 | 1 | 2;
  }

  getRhythmOffset() {
    return (this.params.rhythm == "3") ? (Math.random() * this.rate) - this.rate / 2 : 0;
  }

  getBeatmapJson() {
    return {
      level: compileLevelJSON(this, this.notes, this.walls),
      info: CompileInfoJSON(this)
    }
  }
}