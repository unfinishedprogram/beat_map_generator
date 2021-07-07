

export function shuffleArray(array: any[]) {
  let currentIndex = array.length;
  let randomIndex = 0;
  let arr = [...array];
    
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

const archiver = require('archiver');
import fs from "fs";

export function zipDirectory(source: string, out: string) {
  const archive = archiver('zip', { zlib: { level: 1 }});`~`
  const stream = fs.createWriteStream(out);
  
  return new Promise((resolve, reject) => {
    archive
      .directory(source, false)
      .on('error', (err: any) => reject(err))
      .pipe(stream);
    stream.on('close', () => resolve(undefined));
    archive.finalize();
  });
}