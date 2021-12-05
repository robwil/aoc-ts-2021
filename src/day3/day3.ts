import { formatFileName, openFileReader } from '../shared/file';

interface ColumnsTally {
  [column: number]: { zeroes: number; ones: number };
}

function computeBitsTally(grid: number[][]): ColumnsTally {
  return grid.reduce((tally, cur) => {
    for (let colIdx = 0; colIdx < cur.length; colIdx++) {
      if (tally[colIdx] === undefined) {
        tally[colIdx] = { ones: 0, zeroes: 0 };
      }
      if (cur[colIdx] === 0) {
        tally[colIdx].zeroes += 1;
      } else {
        tally[colIdx].ones += 1;
      }
    }
    return tally;
  }, {} as ColumnsTally);
}

export async function day3({ example }: { example: boolean }) {
  // part 1
  const rl = await openFileReader(formatFileName(3, example));
  const grid = [];
  for await (const line of rl) {
    const bits = line.split('').map((x) => Number(x));
    grid.push(bits);
  }
  let tally = computeBitsTally(grid);
  let gammaBinary = '';
  let epsilonBinary = '';
  for (let colIdx = 0; colIdx < grid[0].length; colIdx++) {
    if (tally[colIdx].zeroes > tally[colIdx].ones) {
      gammaBinary += '0';
      epsilonBinary += '1';
    } else {
      gammaBinary += '1';
      epsilonBinary += '0';
    }
  }
  const gamma = parseInt(gammaBinary, 2);
  const epsilon = parseInt(epsilonBinary, 2);
  const part1 = gamma * epsilon;
  // console.log({ part1, gamma, epsilon });

  // part2
  // we can use our existing tally from part1 to help with the filtering
  let oxygenRemainingGrid = grid;
  let co2RemainingGrid = grid;
  let oxygenBinary = '';
  let co2Binary = '';
  // Refactor note: computeBitsTally below only needs to do it for colIdx, not entire remaining grid
  for (let colIdx = 0; colIdx < grid[0].length; colIdx++) {
    if (oxygenRemainingGrid.length > 0) {
      tally = computeBitsTally(oxygenRemainingGrid);
      if (tally[colIdx].zeroes > tally[colIdx].ones) {
        // col has more zeroes, so Oxygen keeps those and CO2 discards them
        oxygenRemainingGrid = oxygenRemainingGrid.filter(
          (row) => row[colIdx] === 0
        );
      } else {
        // col has more ones, so Oxygen keeps those and CO2 discards them
        oxygenRemainingGrid = oxygenRemainingGrid.filter(
          (row) => row[colIdx] === 1
        );
      }
      if (oxygenRemainingGrid.length === 1) {
        oxygenBinary = oxygenRemainingGrid[0].join('');
        oxygenRemainingGrid = []; // so we don't trigger .length===1 check again
      }
    }
    if (co2RemainingGrid.length > 0) {
      tally = computeBitsTally(co2RemainingGrid);
      if (tally[colIdx].zeroes > tally[colIdx].ones) {
        // col has more zeroes, so Oxygen keeps those and CO2 discards them
        co2RemainingGrid = co2RemainingGrid.filter((row) => row[colIdx] === 1);
      } else {
        // col has more ones, so Oxygen keeps those and CO2 discards them
        co2RemainingGrid = co2RemainingGrid.filter((row) => row[colIdx] === 0);
      }
      if (co2RemainingGrid.length === 1) {
        co2Binary = co2RemainingGrid[0].join('');
        co2RemainingGrid = []; // so we don't trigger .length===1 check again
      }
    }
  }
  const oxygen = parseInt(oxygenBinary, 2);
  const co2 = parseInt(co2Binary, 2);
  const part2 = oxygen * co2;
  // console.log({ oxygen, co2, part2 });

  return { part1, part2 };
}
