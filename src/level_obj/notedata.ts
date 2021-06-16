const indexToPos = [
  // [INDEX, LAYER]
  [0, 2], // 0 LEFT
  [1, 2], // 1 LEFT
  [2, 2], // 2 RIGHT
  [3, 2], // 3 RIGHT
  [0, 1], // 4 LEFT
  [3, 1], // 5 RIGHT
  [0, 0], // 6 LEFT
  [1, 0], // 7 LEFT
  [2, 0], // 8 RIGHT
  [3, 0]  // 9 RIGHT
 ]

export class NoteData {
  _time: number;
  _lineIndex: 0 | 1 | 2 | 3;
  _lineLayer: 0 | 1 | 2;
  _type: 0 | 1;
  _cutDirection = 8;
  
  constructor (
    time: number,
    posIndex: number,
    hand: 0 | 1
  ) {
    this._time = time;
    this._lineIndex = indexToPos[posIndex][0] as 0 | 1 | 2 | 3;
    this._lineLayer = indexToPos[posIndex][1] as 0 | 1 | 2;
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