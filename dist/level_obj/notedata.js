"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var paramiter_defs_1 = require("../paramiter_defs");
function createNoteData(time, posIndex, hand) {
    var index = paramiter_defs_1.def_note_position(posIndex)[0];
    var type;
    if (hand == 3 /* BOTH_SEPERATE */) {
        type = (index >= 2) ? 0 : 1;
    }
    else if (hand = 2 /* BOTH_MIXED */) {
        type = (Math.random() > 0.5) ? 0 : 1;
    }
    else {
        type = (hand == 0 /* LEFT */) ? 0 : 1;
    }
    return {
        "_time": time,
        "_lineIndex": paramiter_defs_1.def_note_position(posIndex)[0],
        "_lineLayer": paramiter_defs_1.def_note_position(posIndex)[1],
        "_type": type,
        "_cutDirection": 8
    };
}
exports.createNoteData = createNoteData;
