"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var beatmap_1 = require("./beatmap");
var possible_songs = [
    "Dancing on Venus",
    "Flying on Jupiter",
    "Dreaming on Mars",
    "Surfing on the Moon",
    "Jumping on Jupiter",
    "Playing on Pluto",
    "Floating on Neptune",
];
function getAllBeatmaps(filter) {
    return possible_songs.map(function (song) {
        filter.song = song;
        return new beatmap_1.BeatMap(filter).getBeatmapJson();
    });
}
exports.getAllBeatmaps = getAllBeatmaps;
