"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.def_note_position = exports.def_targets = exports.def_rate = void 0;
// Rate defines the number of beats between each note
var def_rate = function (param) {
    switch (param) {
        case '1': return 6;
        case '2': return 4;
        case '3': return 2;
        case '4': return 1;
        default: return 8;
    }
};
exports.def_rate = def_rate;
// Defines a list of target indexes given a binary string
var def_targets = function (param) {
    var posList = [];
    for (var i = 0; i < param.length; i++)
        if (param[i])
            posList.push(i);
    return posList;
};
exports.def_targets = def_targets;
// Defines the notes in game position given there binary index
var def_note_position = function (param) {
    switch (param) {
        case 0: return [0, 2];
        case 1: return [1, 2];
        case 2: return [2, 2];
        case 3: return [3, 2];
        case 4: return [0, 1];
        case 5: return [3, 1];
        case 6: return [0, 0];
        case 7: return [1, 0];
        case 8: return [2, 0];
        case 9: return [3, 0];
        default: return [0, 0];
    }
};
exports.def_note_position = def_note_position;
