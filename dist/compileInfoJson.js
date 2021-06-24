"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompileInfoJSON = void 0;
function CompileInfoJSON(beatmap) {
    return {
        "_version": "2.0.0",
        "_songName": "song" + beatmap.params.song,
        "_songSubName": beatmap.file_name,
        "_songAuthorName": "",
        "_levelAuthorName": "",
        "_beatsPerMinute": 100,
        "_songTimeOffset": 0,
        "_shuffle": 0,
        "_shufflePeriod": 0.5,
        "_previewStartTime": 12,
        "_previewDuration": 10,
        "_songFilename": "song.egg",
        "_coverImageFilename": "cover.jpg",
        "_environmentName": "DefaultEnvironment",
        "_customData": {
            "_editor": "generated",
            "_editorSettings": {
                "modSettings": {
                    "customColors": {
                        "isEnabled": false,
                        "colorLeft": "#f21212",
                        "colorLeftOverdrive": 0,
                        "colorRight": "#006cff",
                        "colorRightOverdrive": 0,
                        "envColorLeft": "#f21212",
                        "envColorLeftOverdrive": 0,
                        "envColorRight": "#006cff",
                        "envColorRightOverdrive": 0,
                        "obstacleColor": "#f21212",
                        "obstacleColorOverdrive": 0
                    },
                    "mappingExtensions": {
                        "isEnabled": false,
                        "numRows": 3,
                        "numCols": 4,
                        "colWidth": 1,
                        "rowHeight": 1
                    }
                }
            }
        },
        "_difficultyBeatmapSets": [
            {
                "_beatmapCharacteristicName": "Standard",
                "_difficultyBeatmaps": [
                    {
                        "_difficulty": "Easy",
                        "_difficultyRank": 1,
                        "_beatmapFilename": "Easy.dat",
                        "_noteJumpMovementSpeed": 10,
                        "_noteJumpStartBeatOffset": 0,
                        "_customData": {
                            "_editorOffset": 0,
                            "_requirements": []
                        }
                    }
                ]
            }
        ],
        "distribution": parseInt(beatmap.params.distribution),
        "duration": parseInt(beatmap.params.duration),
        "hand": function () {
            switch (beatmap.params.hand) {
                case '10': return "left";
                case '01': return "right";
                case '11': return "both";
            }
        },
        "rate": parseInt(beatmap.params.rate),
        "id": beatmap.file_name,
        "rhythm": beatmap.params.rhythm,
        "songDuration": beatmap.duration,
        "target0": beatmap.params.targets[0] == "1",
        "target1": beatmap.params.targets[1] == "1",
        "target2": beatmap.params.targets[2] == "1",
        "target3": beatmap.params.targets[3] == "1",
        "target4": beatmap.params.targets[4] == "1",
        "target5": beatmap.params.targets[5] == "1",
        "target6": beatmap.params.targets[6] == "1",
        "target7": beatmap.params.targets[7] == "1",
        "target8": beatmap.params.targets[8] == "1",
        "target9": beatmap.params.targets[9] == "1",
        "visDistance": parseInt(beatmap.params.visDistance),
        "wallLeft": (beatmap.enabled_walls[0] == 1),
        "wallRight": (beatmap.enabled_walls[1] == 1),
        "wallTop": (beatmap.enabled_walls[2] == 1),
    };
}
exports.CompileInfoJSON = CompileInfoJSON;
