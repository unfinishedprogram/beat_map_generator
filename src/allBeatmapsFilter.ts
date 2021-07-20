import { BeatMap } from "./beatmap";
import { ILevelPerams } from "./beatmap";

const possible_songs = ["1", "2"];

export function getAllBeatmaps(filter:ILevelPerams){
	let beatmaps:unknown[] = [];
	for(let song of possible_songs){
		filter.song = song;
		let newMap = new BeatMap(filter);
		beatmaps.push(newMap.getBeatmapJson());
	}
	return beatmaps;
}