import lodash from 'lodash';
import { formatFileName, openFileReader } from '../shared/file';

type GenerationsMap = { [generation: number]: number };

function progressGeneration(currentGenerations: GenerationsMap) {
  // the problem explains reproduction happening first,
  // but we actually do it at end to make a more elegant update for non-reproducing generations
  const reproducingThisGeneration = currentGenerations[0];
  lodash.range(0, 8).forEach((x) => {
    currentGenerations[x] = currentGenerations[x + 1];
  });
  currentGenerations[8] = reproducingThisGeneration;
  currentGenerations[6] += reproducingThisGeneration;
}

export async function day6({ example }: { example: boolean }) {
  // part 1
  const rl = await openFileReader(formatFileName(6, example));
  const initialGenerations: GenerationsMap = {};
  lodash.range(0, 9).forEach((x) => {
    initialGenerations[x] = 0;
  });
  for await (const line of rl) {
    // only expect one line this time
    const fishGenerations = line.split(',').map((x) => Number(x));
    fishGenerations.forEach((fishGeneration) => {
      initialGenerations[fishGeneration] += 1;
    });
  }
  const currentGenerations = lodash.cloneDeep(initialGenerations);
  for (let i = 0; i < 80; i++) {
    progressGeneration(currentGenerations);
  }
  const part1 = lodash.sum(lodash.values(currentGenerations));
  // part 2 is 256 total iterations
  for (let i = 0; i < 256 - 80; i++) {
    progressGeneration(currentGenerations);
  }
  const part2 = lodash.sum(lodash.values(currentGenerations));
  return { part1, part2 };
}
