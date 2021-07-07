"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Rate defines the number of beats between each note given a rate preset
exports.def_rate = function (param) {
    switch (param) {
        case '1': return 90;
        case '2': return 100;
        case '3': return 110;
        case '4': return 120;
        default: return 100;
    }
};
// Defines a list of target indexes given a binary string of length 10
exports.def_targets = function (param) {
    var posList = [];
    for (var i = 0; i < param.length; i++)
        if (param[i] == '1')
            posList.push(i);
    return posList;
};
// Defines the notes in game position given there binary index
exports.def_note_position = function (param) {
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
// Defines a list of enabled wall indexes from a binary string of length 3
exports.def_walls = function (param) {
    var walls = [];
    if (param[0] == '1')
        walls.push(0); // Left
    if (param[2] == '1')
        walls.push(1); // Top
    if (param[1] == '1')
        walls.push(2); // Right
    return walls;
};
// Defines the duration in seconds of the song
exports.def_duration = function (param) {
    switch (param) {
        case '1': return 60;
        case '2': return 120;
        case '3': return 180;
        default: return 60;
    }
};
exports.def_hand = function (param) {
    switch (param) {
        case '10': return 0 /* LEFT */;
        case '01': return 1 /* RIGHT */;
        case '20': return 0 /* LEFT */;
        case '02': return 1 /* RIGHT */;
        case '11': return 2 /* BOTH_MIXED */;
        case '22': return 3 /* BOTH_SEPERATE */;
        default: return 2 /* BOTH_MIXED */;
    }
};
exports.def_distribution = function (peram) { return parseInt(peram); };
