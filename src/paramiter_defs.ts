// Rate defines the number of beats between each note given a rate preset
export const def_rate = (param: string) => {
  switch (param) {
    case '1': return 6;
    case '2': return 4;
    case '3': return 2;
    case '4': return 1;
    default: return 8;
  }
}

// Defines a list of target indexes given a binary string of length 10
export const def_targets = (param: string) => {
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
export const def_walls = (param: string): number[] => {
  let walls = [];
  if (param[0] == '1') walls.push(0);
  if (param[1] == '1') walls.push(1);
  if (param[2] == '1') walls.push(2);
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
export const def_hand = (param: string): number[] => { 
  switch (param) {
    case '10': return [0];
    case '01': return [1];
    case '11': return [0,1];
    default: return [0,1];
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