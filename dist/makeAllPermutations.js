"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var genex = require('genex');
var fs = require('fs');
function getAllPermutations() {
    // This is a simplified subset, without distribution or view distance.
    // This still returns an array with over one million indecies
    var pattern = genex(/^hand[01]{2}-target[01]{12}-wall[01]{3}-duration[123]-rate[1234]-visdistance[1]-distribution[1]-rhythm[123]-song[1]$/);
    return pattern.generate();
}
exports.getAllPermutations = getAllPermutations;
var selection = [];
var targ_positions = [];
for (var i = 0; i < 7; i++)
    selection.push(false);
// let pat:string[] = genex(/^[01]{7}$/).generate();
var pat = [
    '1000000',
    '0100000',
    '0010000',
    '0001000',
    '0000100',
    '0000010',
    '0000001',
];
function toString(boolArr) {
    // console.log(bool)
    var str = '';
    boolArr.forEach(function (bool) {
        // console.log(bool)
        str += (bool ? '1' : '0');
    });
    return str;
}
for (var _i = 0, pat_1 = pat; _i < pat_1.length; _i++) {
    var pattern = pat_1[_i];
    var targs = [];
    for (var i = 0; i < pattern.length; i++) {
        selection[i] = (pattern[i] === "1");
    }
    var t = {
        farLeft: selection[0],
        nearLeft: selection[1],
        nearRight: selection[2],
        farRight: selection[3],
        shoulderLevel: selection[4],
        waistLevel: selection[5],
        kneeLevel: selection[6]
    };
    targs.push(t.farLeft || t.shoulderLevel);
    targs.push(t.nearLeft || t.shoulderLevel);
    targs.push(t.nearRight || t.shoulderLevel);
    targs.push(t.farRight || t.shoulderLevel);
    targs.push(t.farLeft || t.waistLevel);
    targs.push(t.farRight || t.waistLevel);
    targs.push(t.farLeft || t.kneeLevel);
    targs.push(t.nearLeft || t.kneeLevel);
    targs.push(t.nearRight || t.kneeLevel);
    targs.push(t.farRight || t.kneeLevel);
    targ_positions.push.apply(targ_positions, [targs]);
}
var strPos = [];
targ_positions.forEach(function (elm) { return strPos.push(toString(elm)); });
strPos = strPos.filter(function (item, index) { return strPos.indexOf(item) === index; });
console.log(strPos.forEach(function (e) { return console.log(e); }));
// let pattern = genex("^hand@(?:10|01|22|11)-target" +  + "-wall[01]{3}-duration[123]-rate[1234]-visdistance[123]-distribution[12]-rhythm[123]-song.*$")
var targ_pos = "0000000000\n0000001111\n0000110000\n0000111111\n1111000000\n1111001111\n1111110000\n1111111111\n0001010001\n0001011111\n0001110001\n0001111111\n1111010001\n1111011111\n1111110001\n0010000010\n0010001111\n0010110010\n0010111111\n1111000010\n1111110010\n0011010011\n0011011111\n0011110011\n0011111111\n1111010011\n1111110011\n0100000100\n0100001111\n0100110100\n0100111111\n1111000100\n1111110100\n0101010101\n0101011111\n0101110101\n0101111111\n1111010101\n1111110101\n0110000110\n0110001111\n0110110110\n0110111111\n1111000110\n1111110110\n0111010111\n0111011111\n0111110111\n0111111111\n1111010111\n1111110111\n1000101000\n1000101111\n1000111000\n1000111111\n1111101000\n1111101111\n1111111000\n1001111001\n1001111111\n1111111001\n1010101010\n1010101111\n1010111010\n1010111111\n1111101010\n1111111010\n1011111011\n1011111111\n1111111011\n1100101100\n1100101111\n1100111100\n1100111111\n1111101100\n1111111100\n1101111101\n1101111111\n1111111101\n1110101110\n1110101111\n1110111110\n1110111111\n1111101110\n1111111110";
targ_pos =
    "\n1000101000\n0100000100\n0010000010\n0001010001\n1111000000\n0000110000\n0000001111\n1000000000\n0100000000\n0010000000\n0001000000\n0000100000\n0000010000\n0000001000\n0000000100\n0000000010\n0000000001\n";
var true_all = [];
targ_pos.split("\n").forEach(function (str) {
    true_all = true_all.concat(genex("^hand(10|01|22|11)-target" + str + "-wall(000|001|010|100)-duration[1]-rate[234]-visdistance2-distribution[12]-rhythm[12]-song[12]$").generate());
});
true_all = genex("^hand(10|01|22|11)-target" + "1111111111" + "-wall[01]{3}-duration[1]-rate[234]-visdistance2-distribution[12]-rhythm[12]-song[12]$").generate();
console.log(true_all);
var stream = fs.createWriteStream("toGen.txt");
stream.once('open', function () {
    true_all.forEach(function (e) { return stream.write(e + "\n"); });
    stream.end();
    console.log("done saving");
});
