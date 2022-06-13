import { ILevelParams } from "./beatmap";

const notePositions = [
  [0, 2],[1, 2],[2, 2],
  [3, 2],[0, 1],[3, 1],
  [0, 0],[1, 0],[2, 0],
  [3, 0],[1, 1],[2, 1]
]

// Rate defines the number of beats between each note given a rate preset
export const def_rate = (param: number) => {
  switch (param) {
    case 1: return 8;
    case 2: return 6;
    case 3: return 4;
    case 4: return 2;
    default: return 4;
  }
}

// Defines a list of target indexes given a binary string of length 10
export const def_targets = (param: string): number[] => {
  let posList = [];
  for (let i = 0; i < param.length; i++)
    if (param[i] == '1') posList.push(i);
  return posList;
}

export const def_note_position = (param: number) => {
  return notePositions[param] as [0 | 1 | 2 | 3, 0 | 1 | 2];
}

export const def_walls = (params:ILevelParams): (0|1|2)[] => {
  let walls:(0|1|2)[] = [];
  if (params.wallLeft) walls.push(0); // Left
  if (params.wallTop) walls.push(1); // Top
  if (params.wallRight) walls.push(2); // Right
  return walls;
}

// Defines the duration in seconds of the song
export const def_duration = (param: string): number => {
  switch (param) {
    case '1': return 60;
    case '2': return 120;
    case '3': return 180;
    default: return 60;
  }
}

// Defines the enabled hands
export const enum HANDS{
  LEFT, RIGHT, BOTH_MIXED, BOTH_SEPERATE 
}

export const def_note_type = (hand: HANDS, position:number): 1 | 0 => {
  let index = def_note_position(position)[0];
  if(hand == HANDS.BOTH_SEPERATE){
    return (index >= 2) ? 1 : 0;
  } else if(hand == HANDS.BOTH_MIXED) {
    return ((Math.random() > 0.5) ? 0 : 1)
  } else {
    return (hand == HANDS.LEFT) ? 0 : 1;
  }
}

export const def_hand = (param: string): HANDS => { 
  switch (param) {
    case 'left': return HANDS.LEFT;
    case 'right': return HANDS.RIGHT;
    case 'both': return HANDS.BOTH_MIXED;
    case 'split': return HANDS.BOTH_SEPERATE;
    default: return HANDS.BOTH_MIXED;
  }
}

export const def_distribution = (peram: string): number => parseInt(peram);


export type NoteData = {
  "_time": number,
  "_lineIndex": number,
  "_lineLayer": number,
  "_type": number,
  "_cutDirection": number,
}

export type WallData = {
  "_time": number,
  "_lineIndex": number,
  "_duration": number,
  "_type": number,
  "_width": number,
}