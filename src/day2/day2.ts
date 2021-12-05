import { formatFileName, openFileReader } from '../shared/file';

type Command = 'forward' | 'down' | 'up';

export async function day2({ example }: { example: boolean }) {
  // part 1
  const rl = await openFileReader(formatFileName(2, example));
  const commands = [];
  for await (const line of rl) {
    const pieces = line.split(' ');
    const cmd = pieces[0] as Command;
    const num = Number(pieces[1]);
    commands.push({ cmd, num });
  }
  let result = commands.reduce(
    (prev, cur) => {
      switch (cur.cmd) {
        case 'forward':
          prev.x += cur.num;
          break;
        case 'down':
          prev.y += cur.num;
          break;
        case 'up':
          prev.y -= cur.num;
          break;
        default:
          throw new Error(`unexpected command: ${cur.cmd}`);
      }
      return prev;
    },
    { x: 0, y: 0 }
  );
  const part1 = result.x * result.y;
  // console.log({ result, part1 });

  // part 2
  result = commands.reduce(
    (prev, cur) => {
      switch (cur.cmd) {
        case 'forward':
          prev.x += cur.num;
          prev.y += prev.aim * cur.num;
          break;
        case 'down':
          prev.aim += cur.num;
          break;
        case 'up':
          prev.aim -= cur.num;
          break;
        default:
          throw new Error(`unexpected command: ${cur.cmd}`);
      }
      return prev;
    },
    { x: 0, y: 0, aim: 0 }
  );
  const part2 = result.x * result.y;
  // console.log({ result, part2 });
  return { part1, part2 };
}
