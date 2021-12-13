/* eslint-disable @typescript-eslint/no-non-null-assertion */
import lodash from 'lodash';
import { formatFileName, openFileReader } from '../shared/file';

type Visited = { [coordinate: number]: boolean };

// gets value in a grid, while respecting the grid boundaries
function getValue(grid: number[][], x: number, y: number): number | undefined {
  if (x < 0 || x >= grid.length || y < 0 || y >= grid[x].length) {
    return undefined;
  }
  return grid[x][y];
}

// check if current item is less than all its neighbors
function smallerThanNeighbors(grid: number[][], x: number, y: number): boolean {
  const values = [
    getValue(grid, x + 1, y),
    getValue(grid, x - 1, y),
    getValue(grid, x, y + 1),
    getValue(grid, x, y - 1),
  ].filter((a) => a !== undefined);
  // non-null assertion: every x,y has at least one neighbor, so values will never be empty array
  return grid[x][y] < lodash.min(values)!;
}

function fillArea(
  grid: number[][],
  visited: Visited,
  x: number,
  y: number
): number {
  if (x < 0 || x >= grid.length || y < 0 || y >= grid[x].length) {
    return 0;
  }
  if (grid[x][y] === 9) {
    return 0;
  }
  if (visited[x * grid[x].length + y]) {
    return 0;
  }
  visited[x * grid[x].length + y] = true;
  const filledCount =
    1 +
    lodash.sum([
      fillArea(grid, visited, x + 1, y),
      fillArea(grid, visited, x - 1, y),
      fillArea(grid, visited, x, y + 1),
      fillArea(grid, visited, x, y - 1),
    ]);
  return filledCount;
}

export async function day9({ example }: { example: boolean }) {
  const rl = await openFileReader(formatFileName(9, example));
  const lavaGrid: number[][] = [];
  for await (const line of rl) {
    const row = line.split('').map((x) => Number(x));
    lavaGrid.push(row);
  }
  // This is a naive algorithm, but not too bad.
  // We could improve it by skipping areas that we know wouldn't be low point
  // (e.g. by keeping track of the low point coordinates and skipping those)
  const lowPoints = [];
  for (let x = 0; x < lavaGrid.length; x++) {
    for (let y = 0; y < lavaGrid[x].length; y++) {
      if (smallerThanNeighbors(lavaGrid, x, y)) {
        lowPoints.push(lavaGrid[x][y]);
      }
    }
  }
  const part1 = lodash.sum(lowPoints.map((lowPoint) => lowPoint + 1));

  // finding basins
  // - iterate over all points that are not 9
  // - initiate a traversal from that point, going to all unvisited places we can reach
  // - return how many places visited. if > 0, then increase basin count
  const basinSizes = [];
  const visited: Visited = {};
  for (let x = 0; x < lavaGrid.length; x++) {
    for (let y = 0; y < lavaGrid[x].length; y++) {
      const newBasinSize = fillArea(lavaGrid, visited, x, y);
      if (newBasinSize > 0) {
        basinSizes.push(newBasinSize);
      }
    }
  }
  basinSizes.sort((a, b) => b - a);
  const part2 = basinSizes[0] * basinSizes[1] * basinSizes[2];
  return {
    part1,
    part2,
  };
}
