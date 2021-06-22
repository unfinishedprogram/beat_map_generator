"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPermutations = void 0;
var genex = require('genex');
function getAllPermutations() {
    // This is a simplified subset, without distribution or view distance.
    // This still returns an array with over one million indecies
    var pattern = genex(/^hand[01]{2}-target[01]{10}-wall[01]{3}-duration[123]-rate[1234]-visdistance[1]-distribution[1]-rhythm[123]-song[0]$/);
    return pattern.generate();
}
exports.getAllPermutations = getAllPermutations;
