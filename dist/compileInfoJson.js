"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function CompileInfoJSON(beatmap) {
    return {
        "_version": "2.0.0",
        "_songName": "Song " + beatmap.params.song,
        "_songSubName": beatmap.file_name,
        "_songAuthorName": beatmap.file_name,
        "_levelAuthorName": beatmap.file_name,
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
        ]
    };
}
exports.CompileInfoJSON = CompileInfoJSON;
