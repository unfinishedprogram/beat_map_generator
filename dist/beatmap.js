"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var compileInfoJson_1 = require("./compileInfoJson");
var compileLevelJson_1 = require("./compileLevelJson");
var notedata_1 = require("./level_obj/notedata");
var walldata_1 = require("./level_obj/walldata");
var paramiter_defs_1 = require("./paramiter_defs");
var util_1 = require("./util");
var RATIO = 0.8;
var BeatMap = /** @class */ (function () {
    function BeatMap(level_perams) {
        this.notes = [];
        this.walls = [];
        this.file_path = level_perams.song;
        this.song = level_perams.song;
        this.rate = paramiter_defs_1.def_rate(level_perams.rate);
        this.enabled_targets = [];
        for (var i = 0; i < 12; i++) {
            if (level_perams[("target" + i)])
                this.enabled_targets.push(i);
        }
        this.enabled_walls = paramiter_defs_1.def_walls(level_perams.wallTop, level_perams.wallLeft, level_perams.wallRight);
        this.enabled_hands = paramiter_defs_1.def_hand(level_perams.hand);
        this.duration = level_perams.duration;
        this.distribution = level_perams.distribution;
        this.rhythm = level_perams.rhythm;
        this.len_in_beats = Math.floor(100 * (this.duration / 60));
        this.len_in_bars = Math.floor(this.len_in_beats / this.rate);
        this.shuffled_note_positions = [];
        this.shuffled_wall_positions = [];
        this.current_len_in_bars = 1; // Set a starting point for buffer
        var map = this.generateMap();
        this.notes = map.notes;
        this.walls = map.obstacles;
    }
    BeatMap.prototype.generateMap = function () {
        var notes = [];
        var obstacles = [];
        var ratio = RATIO;
        if (this.enabled_walls.length && this.enabled_targets.length)
            ratio = RATIO;
        if (!this.enabled_targets.length)
            ratio = 0;
        if (!this.enabled_walls.length)
            ratio = 1;
        // Generative Loop
        while (this.current_len_in_bars < this.len_in_bars) {
            if (Math.random() < ratio) {
                var note_pos = this.getNextNotePosition();
                var note_type = paramiter_defs_1.def_note_type(this.enabled_hands, note_pos);
                for (var i = 0; i < (this.distribution == 2 ? 4 : 1); i++)
                    this.addNote(notes, note_pos, note_type);
            }
            else {
                this.addWall(obstacles, this.getNextWallPosition());
            }
        }
        return {
            notes: notes,
            obstacles: obstacles,
        };
    };
    BeatMap.prototype.addNote = function (notes, position, hand) {
        notes.push(notedata_1.createNoteData(this.current_len_in_bars * this.rate + this.getRhythmOffset(), position, hand));
        this.current_len_in_bars++;
    };
    BeatMap.prototype.addWall = function (walls, position) {
        walls.push(walldata_1.createWallData(this.current_len_in_bars * this.rate + this.getRhythmOffset(), position, 1));
        this.current_len_in_bars++;
    };
    BeatMap.prototype.getNextNotePosition = function () {
        if (!this.shuffled_note_positions.length) {
            this.shuffled_note_positions = util_1.shuffleArray(this.enabled_targets);
        }
        return this.shuffled_note_positions.pop();
    };
    BeatMap.prototype.getNextWallPosition = function () {
        if (!this.shuffled_note_positions.length) {
            this.shuffled_note_positions = util_1.shuffleArray(this.enabled_walls);
        }
        return this.shuffled_note_positions.pop();
    };
    BeatMap.prototype.getRhythmOffset = function () {
        return (this.rhythm == 3) ? (Math.random() * this.rate) - this.rate / 2 : 0;
    };
    BeatMap.prototype.getBeatmapJson = function () {
        var compiled = __assign(__assign(__assign({}, compileLevelJson_1.compileLevelJSON(this, this.notes, this.walls)), compileInfoJson_1.CompileInfoJSON(this)), { id: this.file_path, songName: this.song });
        return compiled;
        return {
            level: compileLevelJson_1.compileLevelJSON(this, this.notes, this.walls),
            info: compileInfoJson_1.CompileInfoJSON(this),
            id: this.file_path,
            songName: this.song,
        };
    };
    return BeatMap;
}());
exports.BeatMap = BeatMap;
