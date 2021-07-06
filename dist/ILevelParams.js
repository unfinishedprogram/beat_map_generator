"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function peramToFileName(data) {
    return "hand" + data.hand + "-target" + data.targets + "-wall" + data.wall + "-duration" + data.duration + "-visdistance" + data.visDistance + "-distribution" + data.distribution + "-rhythm" + data.rhythm + "-song" + data.song;
}
exports.peramToFileName = peramToFileName;
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
