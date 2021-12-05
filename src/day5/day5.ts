import lodash from 'lodash';
import { formatFileName, openFileReader } from '../shared/file';

type Point = { x: number; y: number };
type Line = {
  startingPoint: Point;
  endingPoint: Point;
};

function isVerticalOrHorizontal(line: Line): boolean {
  return (
    line.startingPoint.x === line.endingPoint.x ||
    line.startingPoint.y === line.endingPoint.y
  );
}

function paintLine(grid: number[][], line: Line): void {
  // this currently only works for horizontal, vertical, and perfectly diagonal (45-deg) lines
  const dx = line.endingPoint.x - line.startingPoint.x;
  // eslint-disable-next-line no-nested-ternary
  const xstep = dx > 0 ? 1 : dx < 0 ? -1 : 0;
  const dy = line.endingPoint.y - line.startingPoint.y;
  // eslint-disable-next-line no-nested-ternary
  const ystep = dy > 0 ? 1 : dy < 0 ? -1 : 0;

  for (
    let { x, y } = line.startingPoint;
    x !== line.endingPoint.x + xstep || y !== line.endingPoint.y + ystep;

  ) {
    grid[x][y] += 1;
    x += xstep;
    y += ystep;
  }
}

export async function day5({ example }: { example: boolean }) {
  // part 1
  const rl = await openFileReader(formatFileName(5, example));
  const lines: Line[] = [];
  let maxX = 0;
  let maxY = 0;
  for await (const line of rl) {
    const pieces = line.split(' -> ');
    const [x1, y1] = pieces[0].split(',').map((x) => Number(x));
    const [x2, y2] = pieces[1].split(',').map((x) => Number(x));
    lines.push({
      startingPoint: { x: x1, y: y1 },
      endingPoint: { x: x2, y: y2 },
    });
    if (x1 > maxX) {
      maxX = x1;
    }
    if (x2 > maxX) {
      maxX = x2;
    }
    if (y1 > maxY) {
      maxY = y1;
    }
    if (y2 > maxY) {
      maxY = y2;
    }
  }
  const grid: number[][] = Array(maxX + 1).fill([]);
  for (let rowIdx = 0; rowIdx < grid.length; rowIdx++) {
    grid[rowIdx] = Array(maxY + 1).fill(0);
  }
  const onlyVerticalOrHorizontal = lines.filter(isVerticalOrHorizontal);
  onlyVerticalOrHorizontal.forEach((line) => paintLine(grid, line));
  const part1 = lodash.sum(grid.map((row) => row.filter((x) => x >= 2).length));

  // part2 requires adding in the diagonal lines too
  const otherLines = lines.filter((line) => !isVerticalOrHorizontal(line));
  otherLines.forEach((line) => paintLine(grid, line));
  const part2 = lodash.sum(grid.map((row) => row.filter((x) => x >= 2).length));
  return { part1, part2 };
}
