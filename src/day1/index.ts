import { openFileReader } from "../shared/file";
import lodash from 'lodash';

async function main(): Promise<void> {
    // part 1
    let rl = await openFileReader('src/day1/input.txt');
    let increasedCount = 0;
    let previous: number|undefined;
    for await (const line of rl) {
        const current = Number(line);
        if (previous === undefined) {
            previous = current;
        } else if (previous < current) {
            increasedCount++;
        }
        previous = current;
    }
    console.log({part1: increasedCount});

    // part 2
    rl = await openFileReader('src/day1/input.txt');
    let window1: number[] = [];
    let window2: number[] = [];
    let window3: number[] = [];
    let i = 0;
    increasedCount = 0;
    for await (const line of rl) {
        const current = Number(line);
        if (i === 0) {
            window1.push(current);
        } else if (i == 1) {
            window1.push(current);
            window2.push(current);
        } else {
            // i == 2 is a kind of weird case where we aren't ready to compare sums
            // but we also want to do same thing as general case

            window1.push(current);
            window2.push(current);
            window3.push(current);
            
            // by i == 3 iteration, our windows are ready for comparison:
            // window1 0 1 2 3
            // window2 1 2 3
            // window3 2 3
            
            if (window2.length === 3) {
                window1.pop(); // window1 will have 4 by now, but we only want to sum first 3
                const window1sum = lodash.sum(window1);
                const window2sum = lodash.sum(window2);
                if (window1sum < window2sum) {
                    increasedCount++;
                }
                // shift all windows to the left:
                // window1 1 2 3
                // window2 2 3
                // window3 3
                window1 = window2;
                window2 = window3;
                window3 = [current];
            }
            
        }
        i++;
    }
    console.log({part2: increasedCount});
  }
  
main().catch(console.error);
  