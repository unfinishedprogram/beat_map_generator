"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var testname = "hand11-target0001010010-wall000-duration1-rate1-visdistance2-distribution1-rhythm1-song1";
var beatmap_1 = require("./beatmap");
var fs_1 = __importDefault(require("fs"));
var archiver = require('archiver');
var process_1 = require("process");
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
var args = process.argv.slice(2);
if (args.length != 3) {
    console.log("3 arguments required,", args.length, "arguments given");
    console.log("[beat_map_string] [directory containing cover and song] [outdir]");
    console.log("Example parameters ");
    console.log('"hand11-target0001010010-wall000-duration1-rate1-visdistance2-distribution1-rhythm1-song1" ~/files/map_template ~/files/output_maps');
    process_1.exit();
}
var regex = new RegExp("^hand[01]{2}-target[01]{10}-wall[01]{3}-duration[123]-rate[1234]-visdistance[123]-distribution[12]-rhythm[123]-song.*$");
// Input validation
var song_string = args[0];
var template_dir = args[1];
var out_dir = args[2];
if (regex.test(song_string))
    console.log("song string is valid:", true);
else {
    console.log("song string is valid:", false);
    console.log("exiting...");
    process_1.exit();
}
if (fs_1.default.existsSync(template_dir))
    console.log("template dir exists:", true);
else {
    console.log("template dir exists:", false);
    console.log("exiting...");
    process_1.exit();
}
if (fs_1.default.existsSync(out_dir))
    console.log("output dir exists:", true);
else {
    console.log("output dir exists:", false);
    console.log("exiting...");
    process_1.exit();
}
console.log("---------------------");
console.log("Creating beatmap object...");
var map = new beatmap_1.BeatMap(song_string);
var level_data = map.makeLevelJson();
console.log("Creating direcotry structure...");
var song_dir = out_dir + "/" + song_string;
if (!fs_1.default.existsSync(song_dir))
    fs_1.default.mkdirSync(song_dir);
console.log("Copying template files...");
fs_1.default.copyFileSync(template_dir + "/cover.jpg", song_dir + "/cover.jpg");
fs_1.default.copyFileSync(template_dir + "/song.egg", song_dir + "/song.egg");
console.log("Writing .dat files...");
fs_1.default.writeFileSync(song_dir + "/Info.dat", JSON.stringify(level_data.infoDat, null, 4));
fs_1.default.writeFileSync(song_dir + "/Easy.dat", JSON.stringify(level_data.levelDat, null, 4));
console.log("Compressing to archive...");
zipDirectory(song_dir, song_dir + ".zip");
console.log("---------------------");
console.log("Done!");
console.log("---------------------");
