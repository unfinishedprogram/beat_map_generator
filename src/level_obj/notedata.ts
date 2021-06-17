import { def_note_position } from "../peramiter_defs";

export class NoteData {
  _time: number;
  _lineIndex: number;
  _lineLayer: number;
  _type: 0 | 1;
  _cutDirection = 8;
  constructor (
    time: number,
    posIndex: number,
    hand: 0 | 1
  ) {
    this._time = time;
    this._lineIndex = def_note_position(posIndex)[0];
    this._lineLayer = def_note_position(posIndex)[1];
    this._type = hand;
  }
  toJson() {
    return {
      "_time": this._time,
      "_lineIndex": this._lineIndex,
      "_lineLayer": this._lineLayer,
      "_type": this._type,
      "_cutDirection": this._cutDirection
    }
  }  
}