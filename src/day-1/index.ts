import { BaseProblem } from '../base-problem';
import { getDirname } from '../util/file';
import { sum } from '../util/math';

class Day1Problem extends BaseProblem<number> {
   async step1(lines: number[]): Promise<void> {
      let prev: number | null = null;
      let numIncreases = 0;
      for (const line of lines) {
         if (prev !== null && line > prev) {
            ++numIncreases;
         }
         prev = line;
      }
      console.log(`Step 1: ${numIncreases}`);
   }

   async step2(lines: number[]): Promise<void> {
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
      console.log(`Step 2: ${numIncreases}`);
   }
}

const inputTransform = (line: string): number => Number(line);
const filename = 'input.txt';
const problem = new Day1Problem(getDirname(import.meta.url), filename, inputTransform);

problem.run();
