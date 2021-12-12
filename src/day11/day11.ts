import { formatFileName, openFileReader } from '../shared/file';

// increaseEnergy increases energy of the given x,y by 1 if it is a valid x,y
function increaseEnergy(octopusGrid: number[][], x: number, y: number) {
  if (x < 0 || x >= octopusGrid.length || y < 0 || y >= octopusGrid.length) {
    return;
  }
  octopusGrid[x][y] += 1;
}

// increase energy of all adjacent octopus, even diagonal ones
function applyEnergy(octopusGrid: number[][], x: number, y: number) {
  increaseEnergy(octopusGrid, x + 1, y);
  increaseEnergy(octopusGrid, x - 1, y);
  increaseEnergy(octopusGrid, x, y + 1);
  increaseEnergy(octopusGrid, x + 1, y + 1);
  increaseEnergy(octopusGrid, x - 1, y + 1);
  increaseEnergy(octopusGrid, x, y - 1);
  increaseEnergy(octopusGrid, x + 1, y - 1);
  increaseEnergy(octopusGrid, x - 1, y - 1);
}

export async function day11({ example }: { example: boolean }) {
  const rl = await openFileReader(formatFileName(11, example));
  const octopusGrid: number[][] = [];
  for await (const line of rl) {
    const row = line.split('').map((x) => Number(x));
    octopusGrid.push(row);
  }
  let flashes = 0;
  let flashesThisStep = 0;
  let part1 = 0;
  let part2 = 0;
  for (let step = 0; ; step++) {
    if (step === 100) {
      part1 = flashes;
    }
    // increase energy by 1 for every octopus at beginning of the "step"
    for (let x = 0; x < octopusGrid.length; x++) {
      for (let y = 0; y < octopusGrid[x].length; y++) {
        octopusGrid[x][y] += 1;
      }
    }
    // for as long as we get new flashes, propagate energy out to adjacent octopuses
    const flashedThisStep: { [number: number]: boolean } = {};
    let newFlashes = 0;
    do {
      flashesThisStep += newFlashes;
      newFlashes = 0;
      for (let x = 0; x < octopusGrid.length; x++) {
        for (let y = 0; y < octopusGrid[x].length; y++) {
          if (octopusGrid[x][y] > 9 && !flashedThisStep[x * 10 + y]) {
            newFlashes += 1;
            flashedThisStep[x * 10 + y] = true;
            applyEnergy(octopusGrid, x, y);
          }
        }
      }
    } while (newFlashes > 0);
    // clear any octopus which flashed this time
    for (let x = 0; x < octopusGrid.length; x++) {
      for (let y = 0; y < octopusGrid[x].length; y++) {
        if (octopusGrid[x][y] > 9) {
          octopusGrid[x][y] = 0;
        }
      }
    }
    flashes += flashesThisStep;
    if (flashesThisStep === 100) {
      part2 = step + 1;
      break;
    }
    flashesThisStep = 0;
  }
  return { part1, part2 };
}
