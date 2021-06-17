"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteData = void 0;
var peramiter_defs_1 = require("../peramiter_defs");
var NoteData = /** @class */ (function () {
    function NoteData(time, posIndex, hand) {
        this._cutDirection = 8;
        this._time = time;
        this._lineIndex = peramiter_defs_1.def_note_position(posIndex)[0];
        this._lineLayer = peramiter_defs_1.def_note_position(posIndex)[1];
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
