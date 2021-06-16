import { NoteData } from "./level_obj/notedata";
import { ObstacleData } from "./level_obj/obstacledata";

export type LevelData = {
  "_version": "2.0.0",
  "_events": [],
  "_notes": NoteData[],
  "_obstacles": ObstacleData[],
}

export function createLevelDat(notes?: any[], obstacles?: any[], events?: any[]) {
  return {
    _version: "2.0.0",
    _notes: (notes) ? notes : [],
    _obstacles: (obstacles) ? obstacles : [],
    _events: (events) ? events : [],
  }
}
