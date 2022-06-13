import { BeatMap } from "./beatmap";
import { ILevelParams } from "./beatmap";

const possible_songs = [
	"Dancing on Venus",
	"Lightning on Jupiter",
	"Sunset on Mars",
	"Surfing on the Moon"
];


export function getAllBeatmaps(filter:ILevelParams){
	let beatmaps:unknown[] = [];
	for(let song of possible_songs){
		filter.song = song;
		let newMap = new BeatMap(filter);
		beatmaps.push(newMap.getBeatmapJson());
	}
	return beatmaps;
}