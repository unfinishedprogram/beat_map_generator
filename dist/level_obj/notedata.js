"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var paramiters_1 = require("../paramiters");
function createNoteData(time, posIndex, hand) {
    return {
        "_time": time,
        "_lineIndex": paramiters_1.def_note_position(posIndex)[0],
        "_lineLayer": paramiters_1.def_note_position(posIndex)[1],
        "_type": hand,
        "_cutDirection": 8
    };
}
exports.createNoteData = createNoteData;
