import { BeatMap } from "./beatmap";
import { NoteData } from "./paramiter_defs";
import { WallData } from "./paramiter_defs";

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
    
    // "distribution": parseInt(beatmap.params.distribution),
    // "duration": parseInt(beatmap.params.duration),
    // "hand": () => {
    //   switch (beatmap.params.hand) {
    //     case '10': return "left";
    //     case '01': return "right";
    //     case '11': return "both";
    //   }
    // }
    // "rate": parseInt(beatmap.params.rate),
    // "id": beatmap.file_name,
    // "rhythm": beatmap.params.rhythm,
    // "songDuration": beatmap.duration,
    // "target0": beatmap.params.targets[0] == "1",
    // "target1": beatmap.params.targets[1] == "1",
    // "target2": beatmap.params.targets[2] == "1",
    // "target3": beatmap.params.targets[3] == "1",
    // "target4": beatmap.params.targets[4] == "1",
    // "target5": beatmap.params.targets[5] == "1",
    // "target6": beatmap.params.targets[6] == "1",
    // "target7": beatmap.params.targets[7] == "1",
    // "target8": beatmap.params.targets[8] == "1",
    // "target9": beatmap.params.targets[9] == "1",
    // "visDistance": parseInt(beatmap.params.visDistance),
    // "wallLeft": (beatmap.enabled_walls[0] == 1),
    // "wallRight":(beatmap.enabled_walls[1] == 1),
    // "wallTop":(beatmap.enabled_walls[2] == 1),
  }
}