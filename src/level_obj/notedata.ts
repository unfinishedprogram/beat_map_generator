import { def_note_position, HANDS, NoteData } from "../paramiter_defs";

export function createNoteData(
  time: number,
  posIndex: number,
  hand: HANDS
): NoteData {
  let index = def_note_position(posIndex)[0];
  let type: 0|1;
  if(hand == HANDS.BOTH_SEPERATE){
    type = (index >= 2) ? 0 : 1;
  } else if(hand = HANDS.BOTH_MIXED) {
    type = (Math.random() > 0.5) ? 0 : 1;
  } else {
    type = (hand == HANDS.LEFT) ? 0 : 1;
  }

  return {
    "_time": time,
    "_lineIndex": def_note_position(posIndex)[0],
    "_lineLayer": def_note_position(posIndex)[1],
    "_type": type,
    "_cutDirection": 8
  }
}