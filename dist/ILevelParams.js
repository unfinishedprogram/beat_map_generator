"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileNameToParams = exports.peramToFileName = void 0;
// export function strParamsToLevelParams(params: IStrLevelParams):ILevelParams {
//   return {
//     hand: ["10", "01", "11"].indexOf(params.filters.hand) as 0 | 1 | 2,
//     targets: (() => {
//       let boolTargs = [];
//       for (let target of params.filters.targets) {
//         boolTargs.push(target == "1");
//       }
//       return boolTargs
//     })(),
//     wall: {
//       top: (params.filters.wall[0] == "1"),
//       left: (params.filters.wall[1] == "1"),
//       right: (params.filters.wall[2] == "1")
//     },
//     duration: [60, 120, 180][parseInt(params.filters.duration) - 1] as 60 | 120 | 180,
//     distribution: (params.filters.distribution == "1") ? "blocked" : "random",
//     rate: params.filters.rate,
//     rhythm: params.filters.rhythm,
//     song: params.filters.song,
//     visDistance: parseInt(params.filters.visDistance),
//   }
// }
function peramToFileName(data) {
    return "hand" + data.hand + "-target" + data.targets + "-wall" + data.wall + "-duration" + data.duration + "-visdistance" + data.visDistance + "-distribution" + data.distribution + "-rhythm" + data.rhythm + "-song" + data.song;
}
exports.peramToFileName = peramToFileName;
// hand10-target0001000000-wall000-duration1-rate2-visdistance2-distribution1-rhythm1-song1
function fileNameToParams(file_name) {
    var params = file_name.split("-");
    return {
        hand: params[0].slice(-2),
        targets: params[1].slice(-10),
        wall: params[2].slice(-3),
        duration: params[3].slice(-1),
        rate: params[4].slice(-1),
        visDistance: params[5].slice(-1),
        distribution: params[6].slice(-1),
        rhythm: params[7].slice(-1),
        song: params[8].slice(-1)
    };
}
exports.fileNameToParams = fileNameToParams;
