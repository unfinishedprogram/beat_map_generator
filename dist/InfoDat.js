"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInfoDat = void 0;
function createInfoDat(name, sub_name, beats_per_minute) {
    return {
        "_version": "2.0.0",
        "_songName": name,
        "_songSubName": sub_name,
        "_songAuthorName": "",
        "_levelAuthorName": "",
        "_beatsPerMinute": beats_per_minute,
        "_songTimeOffset": 0,
        "_shuffle": 0,
        "_shufflePeriod": 0.5,
        "_previewStartTime": 12,
        "_previewDuration": 10,
        "_songFilename": "song.egg",
        "_coverImageFilename": "cover.jpg",
        "_environmentName": "DefaultEnvironment",
        "_customData": {
            "_editor": "beatmapper",
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
exports.createInfoDat = createInfoDat;
