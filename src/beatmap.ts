import { compileInfoJSON } from "./compileInfoJson";
import { compileLevelJSON } from "./compileLevelJson";
import { fileNameToParams, IStrLevelParams } from "./ILevelParams";
import { createNoteData } from "./level_obj/notedata";
import { createWallData } from "./level_obj/walldata";
import { def_distribution, def_duration, def_hand, def_note_type, def_rate, def_targets, def_walls, HANDS, NoteData, WallData } from "./paramiter_defs";
import { shuffleArray } from "./util";

export interface ILevelPerams {
  [index:string]:unknown,
  duration: 1|2|3,
  distribution: 1|2,
  hand: 'left' | 'right' | 'both' | 'split'
  rate: number,
  rhythm: 1,
  target0: boolean,
  target1: boolean,
  target2: boolean,
  target3: boolean,
  target4: boolean,
  target5: boolean,
  target6: boolean,
  target7: boolean,
  target8: boolean,
  target9: boolean,
  target10: boolean,
  target11: boolean,
  visDistance: 2,
  wallLeft: boolean,
  wallRight: boolean,
  wallTop: boolean,
  song:string,
}

const RATIO = 0.8;

export class BeatMap{
  song:string;
  file_path: string;
  len_in_beats: number;
  len_in_bars: number;
  current_len_in_bars: number;

  // ConvertedPeramiters:
  rate: number; // Beats between notes
  enabled_targets: number[];
  enabled_walls: (0|1|2)[];
  enabled_hands: HANDS;
  duration: number;
  distribution: number;
  rhythm:number;

  shuffled_note_positions: number[];
  shuffled_wall_positions: number[];

  notes: NoteData[];
  walls: WallData[];

  constructor(level_perams: ILevelPerams) {
    this.notes = [];
    this.walls = [];
    this.file_path = level_perams.song;
    this.song = level_perams.song;

    this.rate = def_rate(level_perams.rate);
    this.enabled_targets = [];
    for(let i = 0; i < 12; i++){
      if(level_perams[("target" + i)])
        this.enabled_targets.push(i)
    }

    this.enabled_walls = def_walls(
      level_perams.wallTop, 
      level_perams.wallLeft, 
      level_perams.wallRight)
      
    this.enabled_hands = def_hand(level_perams.hand)
    this.duration = level_perams.duration;
    this.distribution = level_perams.distribution;
    this.rhythm = level_perams.rhythm;
    this.len_in_beats = Math.floor(100 * (this.duration / 60))
    this.len_in_bars = Math.floor(this.len_in_beats / this.rate)
    
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
    return (this.rhythm == 3) ? (Math.random() * this.rate) - this.rate / 2 : 0;
  }

  getBeatmapJson() {
    let compiled = {
      ...compileLevelJSON(this, this.notes, this.walls), 
      ...compileInfoJSON(this),
      id:this.file_path,
      songName:this.song,
    }
    return compiled;
    return {
      level: compileLevelJSON(this, this.notes, this.walls),
      info: compileInfoJSON(this),
      id: this.file_path,
      songName: this.song,
    }
  }
}