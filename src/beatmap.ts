import { fileNameToParams, ILevelParams, strParamsToLevelParams } from "./ILevelParams";
import { createInfoDat } from "./InfoDat";
import { createLevelDat } from "./levelDat";
import { NoteData } from "./level_obj/notedata";
import { ObstacleData } from "./level_obj/obstacledata";

const bar_size_mapping = [8, 6, 4, 2, 1]
export class BeatMap{
  file_name: string;
  params: ILevelParams;
  len_in_beats: number;
  len_in_bars: number;

  bar_size: number;

  possible_note_pos_list: number[];
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
    
    this.bar_size = bar_size_mapping[this.params.rate];

    this.len_in_beats = Math.floor(100 * (this.params.duration / 60));
    

    this.len_in_bars = Math.floor(this.len_in_beats / this.bar_size);

    this.current_len_in_bars = 0;
    this.current_len_in_beats = 0;


    this.possible_note_pos_list = this.getPossibleNotePositions(this.params.targets);
  
    this.shuffled_note_positions_list = this.getShuffledList(this.len_in_bars, this.possible_note_pos_list);
    this.shuffled_hand_list = this.getShuffledList(this.len_in_bars, [[0], [1], [0, 1]][this.params.hand])
    
    

    this.notes = this.generateNotes();
  }

  getPossibleNotePositions(targets: boolean[]) {
    let posList = [];
    for (let i = 0; i < targets.length; i++)
      if (targets[i]) posList.push(i);
    return posList;
  }

  getShuffledList(length: number, arr: any[]) {
    let newArr = [] as number[];
    
    while (newArr.length < length) {
      newArr = newArr.concat(this.shuffle(arr))
    }
    return newArr;
  }

  shuffle(arr: any[]) {
    let currentIndex = arr.length;
    let randomIndex = 0;
    
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }
    return arr;
  }

  generateNotes() {
    let notes = []
    // Starting at 1, so we dont spawn an impossible note on the zeroth bar
    for (let i = 1; i < this.len_in_bars; i++){
      let randomVariationOffset = (this.params.rhythm == "2") ? (Math.random() * this.bar_size) - this.bar_size / 2 : 0;
      notes.push(new NoteData(
        this.bar_size * i + randomVariationOffset,
        this.shuffled_note_positions_list[i],
        this.shuffled_hand_list[i] as 1 | 0
      ));
    }
    return notes;
  }

  makeLevelJson() {
    return {
      levelDat: createLevelDat(this.notes.map((note) => note.toJson())),
      infoDat: createInfoDat("song" + this.params.song, this.file_name, 100)
    }
  }
}