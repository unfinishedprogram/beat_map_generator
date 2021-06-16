"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLevelDat = void 0;
function createLevelDat(notes, obstacles, events) {
    return {
        _version: "2.0.0",
        _notes: (notes) ? notes : [],
        _obstacles: (obstacles) ? obstacles : [],
        _events: (events) ? events : [],
    };
}
exports.createLevelDat = createLevelDat;
