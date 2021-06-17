"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeatMap = void 0;
var compileInfoJson_1 = require("./compileInfoJson");
var compileLevelJson_1 = require("./compileLevelJson");
var ILevelParams_1 = require("./ILevelParams");
var notedata_1 = require("./level_obj/notedata");
var walldata_1 = require("./level_obj/walldata");
var peramiter_defs_1 = require("./peramiter_defs");
var util_1 = require("./util");
var bar_size_mapping = [8, 6, 4, 2, 1];
var BeatMap = /** @class */ (function () {
    function BeatMap(fileName) {
        // Parsing the fileName string into a nice usable JSON object
        this.params = ILevelParams_1.fileNameToParams(fileName);
        console.log(this.params);
        this.notes = [];
        this.walls = [];
        this.file_name = fileName;
        // Initalizing paramaters
        this.rate = peramiter_defs_1.def_rate(this.params.rate);
        this.enabled_targets = peramiter_defs_1.def_targets(this.params.targets);
        this.enabled_walls = peramiter_defs_1.def_walls(this.params.wall);
        this.enabled_hands = peramiter_defs_1.def_hand(this.params.hand);
        this.duration = peramiter_defs_1.def_duration(this.params.duration);
        this.len_in_beats = Math.floor(100 * (this.duration / 60));
        this.len_in_bars = Math.floor(this.len_in_beats / this.rate);
        this.shuffled_note_positions_list = this.getShuffledList(this.len_in_bars, this.enabled_targets);
        this.shuffled_wall_positions_list = this.getShuffledList(this.len_in_bars, this.enabled_walls);
        this.shuffled_hand_list = this.getShuffledList(this.len_in_bars, this.enabled_hands);
        var dat = this.generateMap();
        this.notes = dat.notes;
        this.walls = dat.obstacles;
    }
    BeatMap.prototype.getShuffledList = function (length, arr) {
        var newArr = [];
        if (arr.length < 1)
            return newArr;
        while (newArr.length < length) {
            newArr = newArr.concat(util_1.shuffleArray(arr));
        }
        return newArr;
    };
    BeatMap.prototype.generateMap = function () {
        var notes = [];
        var obstacles = [];
        var ratio = 0.5;
        if (this.enabled_walls.length != 0 && this.enabled_targets.length != 0)
            ratio = 0.5;
        if (this.enabled_targets.length == 0)
            ratio = 1;
        if (this.enabled_walls.length == 0)
            ratio = 0;
        for (var i = 1; i < this.len_in_bars; i++) {
            var randomVariationOffset = (this.params.rhythm == "2") ? (Math.random() * this.rate) - this.rate / 2 : 0;
            if (Math.random() >= ratio) {
                // WALLS
                obstacles.push(new walldata_1.WallData(this.rate * i + randomVariationOffset, this.shuffled_wall_positions_list[i], this.rate / 2));
            }
            else {
                notes.push(new notedata_1.NoteData(this.rate * i + randomVariationOffset, this.shuffled_note_positions_list[i], this.shuffled_hand_list[i]));
            }
        }
        return {
            notes: notes,
            obstacles: obstacles,
        };
    };
    BeatMap.prototype.getBeatmapJson = function () {
        return {
            level: compileLevelJson_1.compileLevelJSON(this.notes.map(function (note) { return note.toJson(); }), this.walls.map(function (wall) { return wall.toJson(); })),
            info: compileInfoJson_1.CompileInfoJSON("song" + this.params.song, this.file_name, 100)
        };
    };
    return BeatMap;
}());
exports.BeatMap = BeatMap;
