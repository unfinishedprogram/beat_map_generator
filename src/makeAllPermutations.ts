const genex = require('genex');
export function getAllPermutations():string[] {
  // This is a simplified subset, without distribution or view distance.
  // This still returns an array with over one million indecies
  const pattern = genex(/^hand[01]{2}-target[01]{10}-wall[01]{3}-duration[123]-rate[1234]-visdistance[1]-distribution[1]-rhythm[123]-song[0]$/);
  return pattern.generate();
}
