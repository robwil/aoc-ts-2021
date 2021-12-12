/* eslint-disable no-case-declarations */
import { formatFileName, openFileReader } from '../shared/file';

type ClosingChar = ')' | ']' | '}' | '>';

const errorValuesMap: { [key in ClosingChar]: number } = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const completionValuesMap: { [key in ClosingChar]: number } = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

interface ParsedLine {
  errorValue: number;
  completionValue: number;
}

function parseLine(line: string): ParsedLine {
  const chars = line.split('');
  const stack: ClosingChar[] = [];
  for (const char of chars) {
    switch (char) {
      case '{':
        stack.push('}');
        break;
      case '[':
        stack.push(']');
        break;
      case '(':
        stack.push(')');
        break;
      case '<':
        stack.push('>');
        break;
      case '}':
      case ']':
      case ')':
      case '>':
        const expected = stack.pop();
        if (char !== expected) {
          return { errorValue: errorValuesMap[char], completionValue: 0 };
        }
        break;
      default:
        throw new Error(`unexpected character ${char}`);
    }
  }
  let completionValue = 0;
  stack.reverse();
  for (const char of stack) {
    completionValue *= 5;
    completionValue += completionValuesMap[char];
  }
  return { errorValue: 0, completionValue };
}

export async function day10({ example }: { example: boolean }) {
  const rl = await openFileReader(formatFileName(10, example));
  let errorTotal = 0;
  const completionValues = [];
  for await (const line of rl) {
    const { errorValue, completionValue } = parseLine(line);
    errorTotal += errorValue;
    if (errorValue === 0) {
      completionValues.push(completionValue);
    }
  }
  completionValues.sort((a, b) => a - b);
  return {
    part1: errorTotal,
    part2: completionValues[Math.floor(completionValues.length / 2)],
  };
}
