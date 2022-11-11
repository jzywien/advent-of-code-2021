import { BaseProblem } from '../base-problem';
import { getDirname } from '../util/file';
import { sum } from '../util/math';

export class Day1Problem extends BaseProblem<number[]> {
   get directory() {
      return getDirname(import.meta.url);
   }

   transform = (lines: string[]): number[] => lines.map((line) => Number(line));

   async step1(lines: number[]): Promise<void> {
      console.log('Day 1 Step 1:');

      let prev: number | null = null;
      let numIncreases = 0;
      for (const line of lines) {
         if (prev !== null && line > prev) {
            ++numIncreases;
         }
         prev = line;
      }
      console.log(`  Num Increases: ${numIncreases}`);
   }

   async step2(lines: number[]): Promise<void> {
      console.log('Day 1 Step 2:');
      let prev: number | null = null;
      let numIncreases = 0;
      for (let i = 0; i < lines.length; ++i) {
         const window = lines.slice(i, i + 3);
         const total = sum(window);
         if (prev !== null && total > prev) {
            ++numIncreases;
         }
         prev = total;
      }
      console.log(`  Num Increases: ${numIncreases}`);
   }
}

const problem = new Day1Problem('sample.txt');
problem.run();
