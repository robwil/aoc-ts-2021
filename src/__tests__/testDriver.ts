import { day2 } from '../day2/day2';

describe('day2', () => {
  it('passes with the example input', async () => {
    const { part1, part2 } = await day2({ example: true });
    expect(part1).toEqual(150);
    expect(part2).toEqual(900);
  });
  it('passes with the real input', async () => {
    const { part1, part2 } = await day2({ example: false });
    expect(part1).toEqual(2150351);
    expect(part2).toEqual(1842742223);
  });
});
