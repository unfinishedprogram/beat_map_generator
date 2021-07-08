// Rate defines the number of beats between each note given a rate preset
export const def_rate = (param: string) => {
  switch (param) {
    case '1': return 90;
    case '2': return 100;
    case '3': return 110;
    case '4': return 120;
    default: return 100;
  }
}

// Defines a list of target indexes given a binary string of length 10
export const def_targets = (param: string): number[] => {
  let posList = [];
  for (let i = 0; i < param.length; i++)
    if (param[i] == '1') posList.push(i);
  return posList;
}

// Defines the notes in game position given there binary index
export const def_note_position = (param: number): [
  0 | 1 | 2 | 3,
  0 | 1 | 2] => {
  
  switch (param) {
    case 0: return [0, 2];
    case 1: return [1, 2];
    case 2: return [2, 2];
    case 3: return [3, 2];
    case 4: return [0, 1];
    case 5: return [3, 1];
    case 6: return [0, 0];
    case 7: return [1, 0];
    case 8: return [2, 0];
    case 9: return [3, 0];
    default: return [0, 0];
  }
}

// Defines a list of enabled wall indexes from a binary string of length 3
export const def_walls = (param: string): (0|1|2)[] => {
  let walls:(0|1|2)[] = [];
  if (param[0] == '1') walls.push(0); // Left
  if (param[2] == '1') walls.push(1); // Top
  if (param[1] == '1') walls.push(2); // Right
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
    return (index >= 2) ? 0 : 1;
  } else if(hand == HANDS.BOTH_MIXED) {
    return ((Math.random() > 0.5) ? 0 : 1)
  } else {
    return (hand == HANDS.LEFT) ? 0 : 1;
  }
}

export const def_hand = (param: string): HANDS => { 
  switch (param) {
    case '10': return HANDS.LEFT;
    case '01': return HANDS.RIGHT;

    case '20': return HANDS.LEFT;
    case '02': return HANDS.RIGHT;

    case '11': return HANDS.BOTH_MIXED;
    case '22': return HANDS.BOTH_SEPERATE;
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