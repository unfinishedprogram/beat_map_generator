export function shuffleArray(arr: any[]) {
  let currentIndex = arr.length;
  let randomIndex = 0;
    
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
  }
  return arr;
}