"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createWallData(_time, position, // Left, Top, Right
_duration) {
    return {
        "_time": _time,
        "_lineIndex": (position == 2) ? 2 : 0,
        "_duration": _duration,
        "_type": (position == 1) ? 1 : 0,
        "_width": (position == 1) ? 4 : 2,
    };
}
exports.createWallData = createWallData;
