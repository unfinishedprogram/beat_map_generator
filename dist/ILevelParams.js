"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileNameToParams = exports.peramToFileName = exports.strParamsToLevelParams = void 0;
function strParamsToLevelParams(params) {
    return {
        hand: ["10", "01", "11"].indexOf(params.filters.hand),
        targets: (function () {
            var boolTargs = [];
            for (var _i = 0, _a = params.filters.targets; _i < _a.length; _i++) {
                var target = _a[_i];
                boolTargs.push(target == "1");
            }
            return boolTargs;
        })(),
        wall: {
            top: (params.filters.wall[0] == "1"),
            left: (params.filters.wall[1] == "1"),
            right: (params.filters.wall[2] == "1")
        },
        duration: [60, 120, 180][parseInt(params.filters.duration) - 1],
        distribution: (params.filters.distribution == "1") ? "blocked" : "random",
        rate: [75, 100, 120, 150][parseInt(params.filters.rate)],
        rhythm: params.filters.rhythm,
        song: params.filters.song,
        visDistance: parseInt(params.filters.visDistance),
    };
}
exports.strParamsToLevelParams = strParamsToLevelParams;
function peramToFileName(data) {
    return "hand" + data.filters.hand + "-target" + data.filters.targets + "-wall" + data.filters.wall + "-duration" + data.filters.duration + "-visdistance" + data.filters.visDistance + "-distribution" + data.filters.distribution + "-rhythm" + data.filters.rhythm + "-song" + data.filters.song;
}
exports.peramToFileName = peramToFileName;
// hand10-target0001000000-wall000-duration1-rate2-visdistance2-distribution1-rhythm1-song1
function fileNameToParams(file_name) {
    var params = file_name.split("-");
    return {
        filters: {
            hand: params[0].slice(-2),
            targets: params[1].slice(-10),
            wall: params[2].slice(-3),
            duration: params[3].slice(-1),
            rate: params[4].slice(-1),
            visDistance: params[5].slice(-1),
            distribution: params[6].slice(-1),
            rhythm: params[7].slice(-1),
            song: params[8].slice(-1)
        }
    };
}
exports.fileNameToParams = fileNameToParams;
