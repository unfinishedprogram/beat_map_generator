import { def_note_position, HANDS, NoteData } from "../paramiter_defs";

export function createNoteData(
  time: number,
  posIndex: number,
  hand: 1|0
): NoteData {
  return {
    "_time": time,
    "_lineIndex": def_note_position(posIndex)[0],
    "_lineLayer": def_note_position(posIndex)[1],
    "_type": hand,
    "_cutDirection": 8
  }
}