import { BaseProblem } from '../base-problem';
import { getDirname } from '../util/file';
import { BingoGame } from './bingo-game';

export class Day4Problem extends BaseProblem<BingoGame> {
   get directory(): string {
      return getDirname(import.meta.url);
   }

   transform(lines: string[]): BingoGame {
      return BingoGame.fromInputLines(lines);
   }

   step1(game: BingoGame): void {
      console.log('Day 4 Step 1');

      for (let num of game.draw) {
         game.drawNumber(num);
         const winners = game.findWinners();
         if (winners.length === 0) continue;
         const [{ board: winner }] = winners;
         const score = game.calculateScore(winner!, num);
         console.log(`  First Winning Score: ${score}`);
         break;
      }
   }

   step2(game: BingoGame): void {
      console.log('Day 4 Step 2');

      const allWinners = new Set<number>();
      let lastWinnerScore: number = 0;
      for (let num of game.draw) {
         game.drawNumber(num);
         const winners = game.findWinners(allWinners);

         if (winners.length === 0) continue;

         for (let { board: winner, index } of winners) {
            lastWinnerScore = game.calculateScore(winner!, num);
            allWinners.add(index!);
            if (allWinners.size === game.numBoards()) {
               break;
            }
         }
      }
      console.log(`  Last Winning Score: ${lastWinnerScore}`);
   }
}

const problem = new Day4Problem('sample.txt');
problem.run();
