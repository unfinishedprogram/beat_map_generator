"use strict";
var genex = require('genex');
var pattern = genex(/^hand[01]{2}-target[01]{10}-wall[01]{3}-duration[123]-rate[1234]-visdistance[1]-distribution[1]-rhythm[123]-song[0]$/);
console.log(pattern.count());
console.log(pattern.generate());
