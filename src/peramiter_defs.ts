// Rate defines the number of beats between each note
export const def_rate = (param: string) => {
  switch (param) {
    case '1': return 6;
    case '2': return 4;
    case '3': return 2;
    case '4': return 1;
    default: return 8;
  }
}

// Defines a list of target indexes given a binary string
export const def_targets = (param: boolean[]) => {
  let posList = [];
  for (let i = 0; i < param.length; i++)
    if (param[i]) posList.push(i);
  return posList;
}

// Defines the notes in game position given there binary index
export const def_note_position = (param: number):[ 0 | 1 | 2 | 3, 0 | 1 | 2] => {
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