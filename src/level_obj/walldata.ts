export class WallData {
  _time: number;
  _lineIndex: 0 | 2;
  _duration: number;
  _type: 0 | 1;
  _width: 2 | 4;
  constructor(
    _time: number,
    position: 0 | 1 | 2, // Left, Top, Right
    _duration: number
  ) {
    this._time = _time;
    this._lineIndex = (position == 2) ? 2 : 0; // OR 2 TEST TODO
    this._duration = _duration;
    this._type = (position == 1) ? 1 : 0;
    this._width = (position == 1) ? 4 : 2;
  }

  toJson() {
    return {
      "_time": this._time,
      "_lineIndex": this._lineIndex,
      "_width": this._width,
      "_type": this._type,
      "_duration": this._duration
    }
  }  
}

// export function WallData(
//     _time: number,
//     position: 0 | 1 | 2, // Left, Top, Right
//     _duration: number
// ) {
//   return {
//     "_time": _time,
//     "_lineIndex": (position == 2) ? 2 : 0,
//     "_duration": _duration,
//     "_type": (position == 1) ? 1 : 0,
//     "_width": (position == 1) ? 4 : 2,
//   }
// }