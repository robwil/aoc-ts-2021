import lodash from 'lodash';
import { formatFileName, openFileReader } from '../shared/file';

export async function day7({ example }: { example: boolean }) {
  // part 1
  const rl = await openFileReader(formatFileName(7, example));
  let initialPositions: number[] = [];
  for await (const line of rl) {
    initialPositions = line.split(',').map((x) => Number(x));
  }
  const minVal = lodash.min(initialPositions) || 0;
  const maxVal = lodash.max(initialPositions) || Number.MAX_VALUE;

  // naive O(n^2) algo.
  // Probably a better way to do this, but input size is small so who cares.
  let minFuelCost = Number.MAX_VALUE;
  let minSummationFuelCost = Number.MAX_VALUE;
  for (
    let possibleAlignmentPos = minVal;
    possibleAlignmentPos < maxVal;
    possibleAlignmentPos++
  ) {
    // part1 uses simple difference to calculate fuel cost
    const fuelCost = lodash.sum(
      initialPositions.map((x) => Math.abs(x - possibleAlignmentPos))
    );
    if (fuelCost < minFuelCost) {
      minFuelCost = fuelCost;
    }
    // part 2 uses summation formula
    const summationFuelCost = lodash.sum(
      initialPositions.map((x) => {
        const n = Math.abs(x - possibleAlignmentPos);
        return (n * (n + 1)) / 2;
      })
    );
    if (summationFuelCost < minSummationFuelCost) {
      minSummationFuelCost = summationFuelCost;
    }
  }
  return { part1: minFuelCost, part2: minSummationFuelCost };
}
