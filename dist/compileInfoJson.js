"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function CompileInfoJSON(beatmap) {
    return {
        "_version": "2.0.0",
        "_songName": "song" + beatmap.song,
        "_songSubName": "",
        "_songAuthorName": "",
        "_levelAuthorName": "",
        "_beatsPerMinute": 100,
        "songDuration": beatmap.duration,
        "_songTimeOffset": 0,
        "_shuffle": 0,
        "_shufflePeriod": 0.5,
        "_previewStartTime": 12,
        "_previewDuration": 10,
        "_songFilename": "song.egg",
        "_coverImageFilename": "cover.jpg",
        "_environmentName": "DefaultEnvironment",
        "_songFileLoc": "/song/?song=" + beatmap.file_path,
        "_coverFileLoc": "/cover/?song=" + beatmap.file_path,
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
        ]
    };
}
exports.CompileInfoJSON = CompileInfoJSON;
