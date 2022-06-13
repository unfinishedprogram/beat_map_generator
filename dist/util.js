"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
function shuffleArray(array) {
    var _a;
    var currentIndex = array.length;
    var randomIndex = 0;
    var arr = __spreadArrays(array);
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        _a = [arr[randomIndex], arr[currentIndex]], arr[currentIndex] = _a[0], arr[randomIndex] = _a[1];
    }
    return arr;
}
exports.shuffleArray = shuffleArray;
var archiver = require('archiver');
var fs_1 = __importDefault(require("fs"));
function zipDirectory(source, out) {
    var archive = archiver('zip', { zlib: { level: 1 } });
    "~";
    var stream = fs_1.default.createWriteStream(out);
    return new Promise(function (resolve, reject) {
        archive
            .directory(source, false)
            .on('error', function (err) { return reject(err); })
            .pipe(stream);
        stream.on('close', function () { return resolve(undefined); });
        archive.finalize();
    });
}
exports.zipDirectory = zipDirectory;
