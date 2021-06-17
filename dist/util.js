"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zipDirectory = exports.test = exports.shuffleArray = void 0;
function shuffleArray(arr) {
    var _a;
    var currentIndex = arr.length;
    var randomIndex = 0;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        _a = [arr[randomIndex], arr[currentIndex]], arr[currentIndex] = _a[0], arr[randomIndex] = _a[1];
    }
    return arr;
}
exports.shuffleArray = shuffleArray;
function test(print, test, pass, fail) {
    console.log(print, test);
    if (test) {
        if (pass)
            pass();
    }
    else if (fail)
        fail();
}
exports.test = test;
var archiver = require('archiver');
var fs_1 = __importDefault(require("fs"));
function zipDirectory(source, out) {
    var archive = archiver('zip', { zlib: { level: 9 } });
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
