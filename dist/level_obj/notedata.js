"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteData = void 0;
var indexToPos = [
    // [INDEX, LAYER]
    [0, 2],
    [1, 2],
    [2, 2],
    [3, 2],
    [0, 1],
    [3, 1],
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0] // 9 RIGHT
];
var NoteData = /** @class */ (function () {
    function NoteData(time, posIndex, hand) {
        this._cutDirection = 8;
        this._time = time;
        this._lineIndex = indexToPos[posIndex][0];
        this._lineLayer = indexToPos[posIndex][1];
        this._type = hand;
    }
    NoteData.prototype.toJson = function () {
        return {
            "_time": this._time,
            "_lineIndex": this._lineIndex,
            "_lineLayer": this._lineLayer,
            "_type": this._type,
            "_cutDirection": this._cutDirection
        };
    };
    return NoteData;
}());
exports.NoteData = NoteData;
