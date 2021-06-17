"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffleArray = void 0;
function shuffleArray(arr) {
    var _a;
    var currentIndex = arr.length;
    var randomIndex = 0;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        _a = [arr[randomIndex], arr[currentIndex]], arr[currentIndex] = _a[0], arr[randomIndex] = _a[1];
    }
    return arr;
}
exports.shuffleArray = shuffleArray;
