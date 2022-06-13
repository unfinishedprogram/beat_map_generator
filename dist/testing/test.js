"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var beatmap_1 = require("../beatmap");
var data_1 = require("./data");
function test(filters) {
    var map = new beatmap_1.BeatMap(filters).getBeatmapJson();
    validate(map);
}
function validate(map) {
    var elements = __spreadArrays(map._obstacles, map._notes).sort(function (a, b) { return a._time - b._time; });
    elements.forEach(function (element, i) {
        if (i < elements.length - 1) {
            if (elements[i + 1]._time - element._time < 1) {
                if (element._duration) {
                    console.log("PROBLEM");
                    // console.log("duration:", (element as WallData)._duration)
                }
                // console.log(elements[i+1]._time - element._time);
            }
        }
    });
}
for (var i = 0; i < 1000; i++) {
    test(data_1.allTargets);
    test(data_1.allWalls);
    test(data_1.everything);
}
