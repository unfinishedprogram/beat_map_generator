"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeatMap = void 0;
var ILevelParams_1 = require("./ILevelParams");
var InfoDat_1 = require("./InfoDat");
var levelDat_1 = require("./levelDat");
var notedata_1 = require("./level_obj/notedata");
var bar_size_mapping = [8, 6, 4, 2, 1];
var BeatMap = /** @class */ (function () {
    function BeatMap(fileName) {
        // Parsing the fileName string into a nice usable JSON object
        this.params = ILevelParams_1.strParamsToLevelParams(ILevelParams_1.fileNameToParams(fileName));
        this.notes = [];
        this.obstacles = [];
        this.file_name = fileName;
        // Calculating the total number of beats in the song
        this.bar_size = bar_size_mapping[this.params.rate];
        this.len_in_beats = Math.floor(this.params.rate * (this.params.duration / 60));
        this.len_in_bars = Math.floor(this.len_in_beats / this.bar_size);
        this.current_len_in_bars = 0;
        this.current_len_in_beats = 0;
        this.possible_note_pos_list = this.getPossibleNotePositions(this.params.targets);
        this.shuffled_note_positions_list = this.getShuffledList(this.len_in_bars, this.possible_note_pos_list);
        this.shuffled_hand_list = this.getShuffledList(this.len_in_bars, [[0], [1], [0, 1]][this.params.hand]);
        this.notes = this.generateNotes();
    }
    BeatMap.prototype.getPossibleNotePositions = function (targets) {
        var posList = [];
        for (var i = 0; i < targets.length; i++)
            if (targets[i])
                posList.push(i);
        return posList;
    };
    BeatMap.prototype.getShuffledList = function (length, arr) {
        var newArr = [];
        while (newArr.length < length) {
            newArr = newArr.concat(this.shuffle(arr));
        }
        return newArr;
    };
    BeatMap.prototype.shuffle = function (arr) {
        var _a;
        var currentIndex = arr.length;
        var randomIndex = 0;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            _a = [arr[randomIndex], arr[currentIndex]], arr[currentIndex] = _a[0], arr[randomIndex] = _a[1];
        }
        return arr;
    };
    BeatMap.prototype.generateNotes = function () {
        var notes = [];
        // Starting at 1, so we dont spawn an impossible note on the zeroth bar
        for (var i = 1; i < this.len_in_bars; i++) {
            notes.push(new notedata_1.NoteData(this.bar_size * i, this.shuffled_note_positions_list[i], this.shuffled_hand_list[i]));
        }
        return notes;
    };
    BeatMap.prototype.makeLevelJson = function () {
        return {
            levelDat: levelDat_1.createLevelDat(this.notes.map(function (note) { return note.toJson(); })),
            infoDat: InfoDat_1.createInfoDat("song" + this.params.song, this.file_name, this.params.rate)
        };
    };
    return BeatMap;
}());
exports.BeatMap = BeatMap;
