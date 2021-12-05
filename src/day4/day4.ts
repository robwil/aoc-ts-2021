import lodash from 'lodash';
import { formatFileName, openFileReader } from '../shared/file';

type WinningPlace = 'row' | 'column';

interface BoardPosition {
  boardNumber: number;
  winningPlace: WinningPlace;
  idx: number;
  chosenSoFar: number;
}

interface NumberBingoMap {
  [number: number]: BoardPosition[];
}

interface BoardTracking {
  [boardNumber: number]: {
    pickedNumbers: number[];
    unpickedNumbers: { [number: number]: boolean };
    columns: BoardPosition[];
    rows: BoardPosition[];
    boardWon: boolean;
  };
}

function processBingoBoard(
  boardNumber: number,
  bingoBoard: readonly string[],
  numberBingoMap: NumberBingoMap,
  boardTracking: BoardTracking
) {
  if (bingoBoard.length === 0) {
    // first newline when parsing happens before we have a board, so just do nothing with this
    return;
  }
  if (bingoBoard.length !== 5) {
    throw new Error('expected Bingo board of 5 rows');
  }
  boardTracking[boardNumber] = {
    pickedNumbers: [],
    unpickedNumbers: {},
    columns: lodash.range(0, 5).map((idx) => ({
      boardNumber,
      winningPlace: 'column',
      idx,
      chosenSoFar: 0,
    })),
    rows: lodash.range(0, 5).map((idx) => ({
      boardNumber,
      winningPlace: 'row',
      idx,
      chosenSoFar: 0,
    })),
    boardWon: false,
  };
  for (let rowIdx = 0; rowIdx < bingoBoard.length; rowIdx++) {
    const row = bingoBoard[rowIdx];
    const columns = row
      .split(' ')
      .filter((x) => x.length > 0)
      .map((x) => Number(x));
    for (let colIdx = 0; colIdx < columns.length; colIdx++) {
      const number = columns[colIdx];
      if (numberBingoMap[number] === undefined) {
        numberBingoMap[number] = [];
      }
      numberBingoMap[number].push(boardTracking[boardNumber].columns[colIdx]);
      numberBingoMap[number].push(boardTracking[boardNumber].rows[rowIdx]);
      boardTracking[boardNumber].unpickedNumbers[number] = true;
    }
  }
}

export async function day4({ example }: { example: boolean }) {
  // part 1
  const rl = await openFileReader(formatFileName(4, example));
  // idea: pre-parse each board so that when we pull a number,
  // we can mark which board's rows & cols it affected in O(1) time
  let chosenNumbers: number[] = [];
  let bingoBoard: string[] = [];
  let boardNumber = 0;
  const numberBingoMap: NumberBingoMap = {};
  const boardTracking: BoardTracking = {};
  for await (const line of rl) {
    // handle first line of numbers
    if (chosenNumbers.length === 0) {
      chosenNumbers = line.split(',').map((x) => Number(x));
      continue;
    }
    // newlines between boards
    if (line.trim().length === 0) {
      processBingoBoard(boardNumber, bingoBoard, numberBingoMap, boardTracking);
      bingoBoard = [];
      boardNumber += 1;
      continue;
    }
    bingoBoard.push(line);
  }
  processBingoBoard(boardNumber, bingoBoard, numberBingoMap, boardTracking);

  let part1 = 0;
  let part2 = 0;
  for (const number of chosenNumbers) {
    const hits = numberBingoMap[number] || [];
    for (const hit of hits) {
      const { boardNumber: currentBoardNumber } = hit;
      delete boardTracking[currentBoardNumber].unpickedNumbers[number];
      boardTracking[currentBoardNumber].pickedNumbers.push(number);
      hit.chosenSoFar += 1;
      if (
        hit.chosenSoFar === 5 &&
        !boardTracking[currentBoardNumber].boardWon
      ) {
        const winningBoard = currentBoardNumber;
        boardTracking[winningBoard].boardWon = true;
        const unpickedSum = lodash.sum(
          Object.keys(boardTracking[winningBoard].unpickedNumbers).map((x) =>
            Number(x)
          )
        );
        if (part1 === 0) {
          // record first winning board for part1
          part1 = unpickedSum * number;
          //   console.log({ winningBoard, unpickedSum, number, part1 });
        }
        // record all other winning boards to part2
        // the last one to be written here will be the answer
        part2 = unpickedSum * number;
      }
    }
  }
  //   console.log({ part2 });
  return { part1, part2 };
}
