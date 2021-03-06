import { BeatMap } from "./beatmap";
import { NoteData } from "./paramiters";
import { WallData } from "./paramiters";

export type LevelData = {
  "_version": "2.0.0",
  "_events": [],
  "_notes": NoteData[],
  "_obstacles": WallData[],
}

export function compileLevelJSON(beatmap:BeatMap, notes?: any[], obstacles?: any[], events?: any[]) {
  return {
    _version: "2.0.0",
    _notes: (notes) ? notes : [],
    _obstacles: (obstacles) ? obstacles : [],
    _events: (events) ? events : [],
  }
}