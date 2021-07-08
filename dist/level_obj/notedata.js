"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var paramiter_defs_1 = require("../paramiter_defs");
function createNoteData(time, posIndex, hand) {
    return {
        "_time": time,
        "_lineIndex": paramiter_defs_1.def_note_position(posIndex)[0],
        "_lineLayer": paramiter_defs_1.def_note_position(posIndex)[1],
        "_type": hand,
        "_cutDirection": 8
    };
}
exports.createNoteData = createNoteData;
