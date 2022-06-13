import { BeatMap, CompiledBeatmap, ILevelParams } from "../beatmap";
import { WallData } from "../paramiter_defs";
import { allTargets, allWalls, everything } from "./data";

function test(filters:ILevelParams) {
	const map = new BeatMap(filters).getBeatmapJson()
	validate(map);
}

function validate(map:CompiledBeatmap) {
	const elements = [...map._obstacles, ...map._notes].sort((a, b) => a._time - b._time);
	elements.forEach((element, i) => {
		if(i < elements.length-1){
			if(elements[i+1]._time - element._time < 1){

				if((element as WallData)._duration) {
					console.log("PROBLEM");	
					// console.log("duration:", (element as WallData)._duration)
				}

				// console.log(elements[i+1]._time - element._time);
			}			
		}
	})
}


for(let i = 0; i < 1000; i++) {
	test(allTargets)
	test(allWalls)
	test(everything)
}
