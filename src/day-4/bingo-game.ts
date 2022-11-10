import test, { describe } from 'node:test';
import { Matrix } from '../util/matrix';

export type GameBoard = Matrix<number>;

const dimension = 5;
const MARKED = -1;
export class BingoGame {
   private _draw: number[];
   private _boards: GameBoard[] = [];

   constructor(draw: number[]) {
      this._draw = draw;
   }

   static fromInputLines(lines: string[]): BingoGame {
      const draw = lines[0].split(',').map((line) => parseInt(line));
      const game = new BingoGame(draw);
      for (let g = 2; g < lines.length; g = g + dimension + 1) {
         const gameBoard = lines.slice(g, g + dimension).map((row) =>
            row
               .trim()
               .split(/\s+/g)
               .map((val) => parseInt(val))
         );
         game.addBoard(gameBoard);
      }
      return game;
   }

   addBoard(board: GameBoard) {
      this._boards.push(board);
   }

   removeBoard(index: number): GameBoard {
      return this._boards.splice(index, 1)[0];
   }

   numBoards() {
      return this._boards.length;
   }

   get draw() {
      return this._draw;
   }

   drawNumber(val: number) {
      this._boards.forEach((board) => this.markBoard(board, val));
   }

   markBoard(board: GameBoard, draw: number) {
      for (let i = 0; i < dimension; ++i) {
         for (let j = 0; j < dimension; ++j) {
            if (board[i][j] === draw) {
               board[i][j] = MARKED;
               // returning early assumes
               // that there are no duplicates
               return;
            }
         }
      }
   }

   findWinners(ignore: Set<number> = new Set()): { index?: number; board?: GameBoard }[] {
      const winners = [];
      for (const [index, board] of this._boards.entries()) {
         if (ignore.has(index)) continue;
         const isWinner = this._isWinner(board);
         if (isWinner) {
            winners.push({
               index,
               board,
            });
         }
      }
      return winners;
   }

   printBoards(boards: GameBoard[] = this._boards) {
      for (let i = 0; i < dimension; ++i) {
         for (let board of boards) {
            const row = board[i];
            for (let col of row) {
               process.stdout.write(
                  (col === MARKED ? 'x' : String(col)).padStart(3, ' ')
               );
            }
            process.stdout.write('  ');
         }
         process.stdout.write('\n');
      }
      console.log();
   }

   calculateScore(board: GameBoard, lastDraw: number) {
      let sum = 0;
      for (let i = 0; i < dimension; ++i) {
         for (let j = 0; j < dimension; ++j) {
            sum += board[i][j] === MARKED ? 0 : board[i][j];
         }
      }
      return sum * lastDraw;
   }

   private _isWinner(board: GameBoard) {
      for (let i = 0; i < dimension; ++i) {
         const rowWinner = !this._getRow(board, i).some((val) => val !== MARKED);
         const colWinner = !this._getCol(board, i).some((val) => val !== MARKED);
         if (rowWinner || colWinner) return true;
      }
      return false;
   }

   private _getRow(board: GameBoard, row: number) {
      return board[row];
   }

   private _getCol(board: GameBoard, col: number) {
      return board.map((row) => row[col]);
   }
}
