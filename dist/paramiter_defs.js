"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.def_distribution = exports.def_hand = exports.def_duration = exports.def_walls = exports.def_note_position = exports.def_targets = exports.def_rate = void 0;
// Rate defines the number of beats between each note given a rate preset
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
// Defines a list of target indexes given a binary string of length 10
var def_targets = function (param) {
    var posList = [];
    for (var i = 0; i < param.length; i++)
        if (param[i] == '1')
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
// Defines a list of enabled wall indexes from a binary string of length 3
var def_walls = function (param) {
    var walls = [];
    if (param[0] == '1')
        walls.push(0);
    if (param[1] == '1')
        walls.push(1);
    if (param[2] == '1')
        walls.push(2);
    return walls;
};
exports.def_walls = def_walls;
// Defines the duration in seconds of the song
var def_duration = function (param) {
    switch (param) {
        case '1': return 60;
        case '2': return 120;
        case '3': return 180;
        default: return 60;
    }
};
exports.def_duration = def_duration;
// Defines the enabled hands
var def_hand = function (param) {
    switch (param) {
        case '10': return [0];
        case '01': return [1];
        case '11': return [0, 1];
        default: return [0, 1];
    }
};
exports.def_hand = def_hand;
var def_distribution = function (peram) { return parseInt(peram); };
exports.def_distribution = def_distribution;
