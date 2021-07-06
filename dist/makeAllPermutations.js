"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var genex = require('genex');
function getAllPermutations() {
    // This is a simplified subset, without distribution or view distance.
    // This still returns an array with over one million indecies
    var pattern = genex(/^hand[01]{2}-target[01]{10}-wall[01]{3}-duration[123]-rate[1234]-visdistance[1]-distribution[1]-rhythm[123]-song[0]$/);
    return pattern.generate();
}
exports.getAllPermutations = getAllPermutations;
// const pattern = genex(/^hand[01]{2}-target[01]{10}-wall[01]{3}-duration[12]-rate[1234]-visdistance[1]-distribution[1]-rhythm[12]-song[0]$/);
// const pattern = genex(/^hand[01]{2}-target1111111111-wall[01]{3}-duration[123]-rate[1234]-visdistance[1]-distribution[1]-rhythm[12]-song1$/);
var pattern = genex(/^hand[11]{2}-target1111111111-wall111-duration[123]-rate[1234]-visdistance[1]-distribution[1]-rhythm[1]-song1$/);
var allPerms = pattern.generate();
for (var _i = 0, allPerms_1 = allPerms; _i < allPerms_1.length; _i++) {
    var peram = allPerms_1[_i];
    console.log(peram);
}
