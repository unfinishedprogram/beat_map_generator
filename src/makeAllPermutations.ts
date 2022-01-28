const genex = require('genex');
const fs = require('fs');
export function getAllPermutations():string[] {
  // This is a simplified subset, without distribution or view distance.
  // This still returns an array with over one million indecies
  const pattern = genex(/^hand[01]{2}-target[01]{12}-wall[01]{3}-duration[123]-rate[1234]-visdistance[1]-distribution[1]-rhythm[123]-song[1]$/);
  return pattern.generate();
}

let selection = [];
let targ_positions:boolean[][] = [];

for (let i = 0; i < 7; i++) selection.push(false);

// let pat:string[] = genex(/^[01]{7}$/).generate();
let pat:string[] = [
  '1000000',
  '0100000',
  '0010000',
  '0001000',
  '0000100',
  '0000010',
  '0000001',
]

function toString(boolArr:boolean[]):string {
  // console.log(bool)
  let str:string = '';
  boolArr.forEach((bool) =>{
    // console.log(bool)
    str += (bool ? '1' : '0')
  })
  return str;
}

for(let pattern of pat){
  let targs = [];
  for(let i = 0; i < pattern.length; i++){
    selection[i] = (pattern[i] === "1");
  }


  let t = {
    farLeft: selection[0],
    nearLeft: selection[1],
    nearRight: selection[2],
    farRight: selection[3],
    shoulderLevel: selection[4],
    waistLevel: selection[5],
    kneeLevel: selection[6]
  }

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

  targ_positions.push(...[targs]);
}


let strPos: string[] = [];
targ_positions.forEach((elm) => strPos.push(toString(elm)))
strPos = strPos.filter((item, index) => strPos.indexOf(item) === index)
console.log(strPos.forEach((e) => console.log(e)));


// let pattern = genex("^hand@(?:10|01|22|11)-target" +  + "-wall[01]{3}-duration[123]-rate[1234]-visdistance[123]-distribution[12]-rhythm[123]-song.*$")



let targ_pos =
`0000000000
0000001111
0000110000
0000111111
1111000000
1111001111
1111110000
1111111111
0001010001
0001011111
0001110001
0001111111
1111010001
1111011111
1111110001
0010000010
0010001111
0010110010
0010111111
1111000010
1111110010
0011010011
0011011111
0011110011
0011111111
1111010011
1111110011
0100000100
0100001111
0100110100
0100111111
1111000100
1111110100
0101010101
0101011111
0101110101
0101111111
1111010101
1111110101
0110000110
0110001111
0110110110
0110111111
1111000110
1111110110
0111010111
0111011111
0111110111
0111111111
1111010111
1111110111
1000101000
1000101111
1000111000
1000111111
1111101000
1111101111
1111111000
1001111001
1001111111
1111111001
1010101010
1010101111
1010111010
1010111111
1111101010
1111111010
1011111011
1011111111
1111111011
1100101100
1100101111
1100111100
1100111111
1111101100
1111111100
1101111101
1101111111
1111111101
1110101110
1110101111
1110111110
1110111111
1111101110
1111111110`

targ_pos = 
`
1000101000
0100000100
0010000010
0001010001
1111000000
0000110000
0000001111
1000000000
0100000000
0010000000
0001000000
0000100000
0000010000
0000001000
0000000100
0000000010
0000000001
`

let true_all:string[] = [];
targ_pos.split("\n").forEach((str) => {
  true_all = true_all.concat(genex("^hand(10|01|22|11)-target" + str + "-wall(000|001|010|100)-duration[1]-rate[234]-visdistance2-distribution[12]-rhythm[12]-song[12]$").generate())
})

true_all = genex("^hand(10|01|22|11)-target" + "1111111111" + "-wall[01]{3}-duration[1]-rate[234]-visdistance2-distribution[12]-rhythm[12]-song[12]$").generate();

console.log(true_all)


var stream = fs.createWriteStream("toGen.txt");
stream.once('open', () => {
  true_all.forEach(e => stream.write(e + "\n"));
  stream.end();
  console.log("done saving")
});