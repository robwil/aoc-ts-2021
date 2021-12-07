import { day1 } from '../day1/day1';
import { day2 } from '../day2/day2';
import { day3 } from '../day3/day3';
import { day4 } from '../day4/day4';
import { day5 } from '../day5/day5';
import { day6 } from '../day6/day6';
import { day7 } from '../day7/day7';

describe('day1', () => {
  it('passes with the example input', async () => {
    const { part1, part2 } = await day1({ example: true });
    expect(part1).toEqual(7);
    expect(part2).toEqual(5);
  });
  it('passes with the real input', async () => {
    const { part1, part2 } = await day1({ example: false });
    expect(part1).toEqual(1154);
    expect(part2).toEqual(1127);
  });
});

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

describe('day5', () => {
  it('passes with the example input', async () => {
    const { part1, part2 } = await day5({ example: true });
    expect(part1).toEqual(5);
    expect(part2).toEqual(12);
  });
  it('passes with the real input', async () => {
    const { part1, part2 } = await day5({ example: false });
    expect(part1).toEqual(6113);
    expect(part2).toEqual(20373);
  });
});

describe('day6', () => {
  it('passes with the example input', async () => {
    const { part1, part2 } = await day6({ example: true });
    expect(part1).toEqual(5934);
    expect(part2).toEqual(26984457539);
  });
  it('passes with the real input', async () => {
    const { part1, part2 } = await day6({ example: false });
    expect(part1).toEqual(387413);
    expect(part2).toEqual(1738377086345);
  });
});

describe('day7', () => {
  it('passes with the example input', async () => {
    const { part1, part2 } = await day7({ example: true });
    expect(part1).toEqual(37);
    expect(part2).toEqual(168);
  });
  it('passes with the real input', async () => {
    const { part1, part2 } = await day7({ example: false });
    expect(part1).toEqual(323647);
    expect(part2).toEqual(87640209);
  });
});
