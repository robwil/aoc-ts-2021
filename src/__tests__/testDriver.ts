import { day1 } from '../day1/day1';
import { day2 } from '../day2/day2';
import { day3 } from '../day3/day3';
import { day4 } from '../day4/day4';
import { day5 } from '../day5/day5';
import { day6 } from '../day6/day6';
import { day7 } from '../day7/day7';
import { day9 } from '../day9/day9';
import { day10 } from '../day10/day10';
import { day11 } from '../day11/day11';
import { day12 } from '../day12/day12';

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

describe('day9', () => {
  it('passes with the example input', async () => {
    const { part1, part2 } = await day9({ example: true });
    expect(part1).toEqual(15);
    expect(part2).toEqual(1134);
  });
  it('passes with the real input', async () => {
    const { part1, part2 } = await day9({ example: false });
    expect(part1).toEqual(570);
    expect(part2).toEqual(899392);
  });
});

describe('day10', () => {
  it('passes with the example input', async () => {
    const { part1, part2 } = await day10({ example: true });
    expect(part1).toEqual(26397);
    expect(part2).toEqual(288957);
  });
  it('passes with the real input', async () => {
    const { part1, part2 } = await day10({ example: false });
    expect(part1).toEqual(343863);
    expect(part2).toEqual(2924734236);
  });
});

describe('day11', () => {
  it('passes with the example input', async () => {
    const { part1, part2 } = await day11({ example: true });
    expect(part1).toEqual(1656);
    expect(part2).toEqual(195);
  });
  it('passes with the real input', async () => {
    const { part1, part2 } = await day11({ example: false });
    expect(part1).toEqual(1700);
    expect(part2).toEqual(273);
  });
});

describe('day12', () => {
  it('passes with the example input', async () => {
    const { part1, part2 } = await day12({ example: true });
    expect(part1).toEqual(10);
    expect(part2).toEqual(36);
  });
  it('passes with the real input', async () => {
    const { part1, part2 } = await day12({ example: false });
    expect(part1).toEqual(5228);
    expect(part2).toEqual(131228);
  });
});
