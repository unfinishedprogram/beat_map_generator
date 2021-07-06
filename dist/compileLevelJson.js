"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function compileLevelJSON(beatmap, notes, obstacles, events) {
    return {
        _version: "2.0.0",
        _notes: (notes) ? notes : [],
        _obstacles: (obstacles) ? obstacles : [],
        _events: (events) ? events : [],
    };
}
exports.compileLevelJSON = compileLevelJSON;
