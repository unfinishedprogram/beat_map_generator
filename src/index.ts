import { exit } from "process";
import { test, zipDirectory} from "./util";
import { BeatMap } from "./beatmap"
import fs from "fs";

const args = process.argv.slice(2)

// Input validation
if (!(args.length >= 3)) {
  console.log("3 arguments required,", args.length, "arguments given")
  console.log("[beat_map_string] [directory containing cover and song] [outdir]")
  console.log("Example parameters ")
  console.log('"hand11-target0001010010-wall000-duration1-rate1-visdistance2-distribution1-rhythm1-song1" ~/files/map_template ~/files/output_maps')
  exit()
}

// Disable logging if flag is true 
// TODO Fix this
// if (args[4] == "true")
console.log = () => { };

let regex = new RegExp("^hand[01]{2}-target[01]{10}-wall[01]{3}-duration[123]-rate[1234]-visdistance[123]-distribution[12]-rhythm[123]-song.*$")

let song_string = args[0]
let template_dir = args[1]
let out_dir = args[2]

console.log("---------------------")
test("song string is valid:", regex.test(song_string),undefined, () => exit());
test("template dir exists:", fs.existsSync(template_dir),undefined, () => exit());
test("output dir exists:", fs.existsSync(out_dir),undefined, () => exit());
console.log("---------------------")

console.log("Creating beatmap object...");

let map = new BeatMap(song_string);
let level_data = map.getBeatmapJson()

console.log("Creating direcotry structure...");
let song_dir = out_dir + "/" + song_string;

if (!fs.existsSync(song_dir))
  fs.mkdirSync(song_dir);

console.log("Copying template files...")

// fs.copyFileSync(template_dir + "/cover.jpg", song_dir + "/cover.jpg")
// fs.copyFileSync(template_dir + "/song.egg", song_dir + "/song.egg")

console.log("Writing .dat files...")

fs.writeFileSync(song_dir + "/Info.dat", JSON.stringify(level_data.info, null, 4))
fs.writeFileSync(song_dir + "/Easy.dat", JSON.stringify(level_data.level, null, 4))

console.log("Compressing to archive...")

zipDirectory(song_dir, song_dir + ".zip")

console.log("---------------------")
console.log("Done!")
console.log("---------------------")