import { def_note_position, NoteData } from "../paramiter_defs";

export function createNoteData(
  time: number,
  posIndex: number,
  hand: 0 | 1
): NoteData {
  return {
    "_time": time,
    "_lineIndex": def_note_position(posIndex)[0],
    "_lineLayer": def_note_position(posIndex)[1],
    "_type": hand,
    "_cutDirection": 8
  }
}