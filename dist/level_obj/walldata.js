"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WallData = void 0;
var WallData = /** @class */ (function () {
    function WallData(_time, position, // Left, Top, Right
    _duration) {
        this._time = _time;
        this._lineIndex = (position == 2) ? 2 : 0; // OR 2 TEST TODO
        this._duration = _duration;
        this._type = (position == 1) ? 1 : 0;
        this._width = (position == 1) ? 4 : 2;
    }
    WallData.prototype.toJson = function () {
        return {
            "_time": this._time,
            "_lineIndex": this._lineIndex,
            "_width": this._width,
            "_type": this._type,
            "_duration": this._duration
        };
    };
    return WallData;
}());
exports.WallData = WallData;
