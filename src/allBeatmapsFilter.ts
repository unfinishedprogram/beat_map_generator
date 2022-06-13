import { BeatMap } from "./beatmap";
import { ILevelParams } from "./beatmap";

const possible_songs = [
	"Dancing on Venus",
	"Flying on Jupiter",
	"Dreaming on Mars",
	"Surfing on the Moon",
	"Jumping on Jupiter",
	"Playing on Pluto",
	"Floating on Neptune",
];


export function getAllBeatmaps(filter:ILevelParams){
	return possible_songs.map(song => {
		filter.song = song;
		return new BeatMap(filter).getBeatmapJson();
	})
}