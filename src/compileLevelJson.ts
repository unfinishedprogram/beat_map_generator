import { BeatMap } from "./beatmap";
import { NoteData, WallData } from "./paramiter_defs";

export type LevelData = {
  "_version": "2.0.0",
  "_events": [],
  "_notes": NoteData[],
  "_obstacles": WallData[],
}

export function compileLevelJSON(beatmap:BeatMap, notes?: NoteData[], obstacles?: WallData[], events?: any[]) {
  return {
    _version: "2.0.0",
    _notes: (notes) ? notes : [],
    _obstacles: (obstacles) ? obstacles : [],
    _events: (events) ? events : [],
  }
}