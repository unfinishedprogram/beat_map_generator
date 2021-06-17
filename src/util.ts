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

export function test(
  print: string,
  test: boolean,
  pass?: Function,
  fail?: Function) {
  console.log(print, test)
  if (test) {
    if (pass) pass();
  } else if (fail) fail();
}