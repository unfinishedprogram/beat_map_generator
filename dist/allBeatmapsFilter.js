"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var beatmap_1 = require("./beatmap");
var possible_songs = ["song1", "song2"];
function getAllBeatmaps(filter) {
    var beatmaps = [];
    for (var _i = 0, possible_songs_1 = possible_songs; _i < possible_songs_1.length; _i++) {
        var song = possible_songs_1[_i];
        filter.song = song;
        var newMap = new beatmap_1.BeatMap(filter);
        beatmaps.push(newMap.getBeatmapJson());
    }
    return beatmaps;
}
exports.getAllBeatmaps = getAllBeatmaps;
