"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeatMap = void 0;
var compileInfoJson_1 = require("./compileInfoJson");
var compileLevelJson_1 = require("./compileLevelJson");
var ILevelParams_1 = require("./ILevelParams");
var notedata_1 = require("./level_obj/notedata");
var peramiter_defs_1 = require("./peramiter_defs");
var util_1 = require("./util");
var bar_size_mapping = [8, 6, 4, 2, 1];
var BeatMap = /** @class */ (function () {
    function BeatMap(fileName) {
        // Parsing the fileName string into a nice usable JSON object
        this.params = ILevelParams_1.strParamsToLevelParams(ILevelParams_1.fileNameToParams(fileName));
        this.notes = [];
        this.obstacles = [];
        this.file_name = fileName;
        // Calculating the total number of beats in the song
        // Initalizing paramaters
        this.rate = peramiter_defs_1.def_rate(this.params.rate);
        this.enabled_targets = peramiter_defs_1.def_targets(this.params.targets);
        this.len_in_beats = Math.floor(100 * (this.params.duration / 60));
        this.len_in_bars = Math.floor(this.len_in_beats / this.rate);
        this.current_len_in_bars = 0;
        this.current_len_in_beats = 0;
        this.shuffled_note_positions_list = this.getShuffledList(this.len_in_bars, this.enabled_targets);
        this.shuffled_hand_list = this.getShuffledList(this.len_in_bars, [[0], [1], [0, 1]][this.params.hand]);
        this.notes = this.generateNotes();
    }
    BeatMap.prototype.getShuffledList = function (length, arr) {
        var newArr = [];
        while (newArr.length < length) {
            newArr = newArr.concat(util_1.shuffleArray(arr));
        }
        return newArr;
    };
    BeatMap.prototype.generateNotes = function () {
        var notes = [];
        // Starting at 1, so we dont spawn an impossible note on the zeroth bar
        for (var i = 1; i < this.len_in_bars; i++) {
            var randomVariationOffset = (this.params.rhythm == "2") ? (Math.random() * this.rate) - this.rate / 2 : 0;
            notes.push(new notedata_1.NoteData(this.rate * i + randomVariationOffset, this.shuffled_note_positions_list[i], this.shuffled_hand_list[i]));
        }
        return notes;
    };
    BeatMap.prototype.getBeatmapJson = function () {
        return {
            level: compileLevelJson_1.compileLevelJSON(this.notes.map(function (note) { return note.toJson(); })),
            info: compileInfoJson_1.CompileInfoJSON("song" + this.params.song, this.file_name, 100)
        };
    };
    return BeatMap;
}());
exports.BeatMap = BeatMap;
