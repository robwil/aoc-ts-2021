import { day2 } from '../day2/day2';
import { day3 } from '../day3/day3';
import { day4 } from '../day4/day4';

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

describe('day3', () => {
  it('passes with the example input', async () => {
    const { part1, part2 } = await day3({ example: true });
    expect(part1).toEqual(198);
    expect(part2).toEqual(230);
  });
  it('passes with the real input', async () => {
    const { part1, part2 } = await day3({ example: false });
    expect(part1).toEqual(4174964);
    expect(part2).toEqual(4474944);
  });
});

describe('day4', () => {
  it('passes with the example input', async () => {
    const { part1, part2 } = await day4({ example: true });
    expect(part1).toEqual(4512);
    expect(part2).toEqual(1924);
  });
  it('passes with the real input', async () => {
    const { part1, part2 } = await day4({ example: false });
    expect(part1).toEqual(44736);
    expect(part2).toEqual(1827);
  });
});
