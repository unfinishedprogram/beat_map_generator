"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var compileInfoJson_1 = require("./compileInfoJson");
var compileLevelJson_1 = require("./compileLevelJson");
var ILevelParams_1 = require("./ILevelParams");
var notedata_1 = require("./level_obj/notedata");
var walldata_1 = require("./level_obj/walldata");
var paramiter_defs_1 = require("./paramiter_defs");
var util_1 = require("./util");
var BAR_SIZE = 4;
var RATIO = 0.5;
var BeatMap = /** @class */ (function () {
    function BeatMap(fileName) {
        // Parsing the fileName string into a nice usable JSON object
        this.params = ILevelParams_1.fileNameToParams(fileName);
        console.log(this.params);
        this.notes = [];
        this.walls = [];
        this.file_name = fileName;
        // Initalizing from paramaters
        this.rate = paramiter_defs_1.def_rate(this.params.rate);
        this.enabled_targets = paramiter_defs_1.def_targets(this.params.targets);
        this.enabled_walls = paramiter_defs_1.def_walls(this.params.wall);
        this.enabled_hands = paramiter_defs_1.def_hand(this.params.hand);
        this.duration = paramiter_defs_1.def_duration(this.params.duration);
        this.distribution = paramiter_defs_1.def_distribution(this.params.distribution);
        this.len_in_beats = Math.floor(this.rate * (this.duration / 60));
        this.len_in_bars = Math.floor(this.len_in_beats / BAR_SIZE);
        this.shuffled_note_positions = [];
        this.shuffled_wall_positions = [];
        this.current_len_in_bars = 0;
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
                this.addNote(notes, this.getNextNotePosition(), this.enabled_hands);
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
        notes.push(notedata_1.createNoteData(this.current_len_in_bars * BAR_SIZE + this.getRhythmOffset(), position, hand));
        this.current_len_in_bars++;
    };
    BeatMap.prototype.addWall = function (walls, position) {
        walls.push(walldata_1.createWallData(this.current_len_in_bars * BAR_SIZE + this.getRhythmOffset(), position, 1));
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
        return (this.params.rhythm == "2") ? (Math.random() * BAR_SIZE) - BAR_SIZE / 2 : 0;
    };
    BeatMap.prototype.getBeatmapJson = function () {
        return {
            level: compileLevelJson_1.compileLevelJSON(this, this.notes, this.walls),
            info: compileInfoJson_1.CompileInfoJSON(this)
        };
    };
    return BeatMap;
}());
exports.BeatMap = BeatMap;
