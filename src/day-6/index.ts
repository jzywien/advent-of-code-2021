import { BaseProblem } from '../base-problem';
import { getDirname } from '../util/file';

export class Day6Problem extends BaseProblem<number[]> {
   get directory(): string {
      return getDirname(import.meta.url);
   }

   transform(inputLines: string[]): number[] {
      return inputLines.reduce((values: number[], line) => {
         return [...values, ...line.split(',').map((num) => parseInt(num))];
      }, []);
   }

   step1(fishies: number[]): void {
      console.log('Day 6 Step 1');

      const fishMap = this._fishListToMap(fishies);
      const numDays = 80;
      this._run(fishMap, numDays);

      console.log(`  Num Fish: ${this._countTotalFish(fishMap)}`);
   }

   step2(fishies: number[]): void {
      console.log('Day 6 Step 2');
      const fishMap = this._fishListToMap(fishies);
      const numDays = 256;
      this._run(fishMap, numDays);

      console.log(`  Num Fish: ${this._countTotalFish(fishMap)}`);
   }

   private _fishListToMap(fish: number[]) {
      const fishMap = new Map<number, number>();
      for (let i = 0; i <= 8; ++i) {
         const countOfNum = fish.filter((f) => f === i).length;
         fishMap.set(i, countOfNum);
      }
      return fishMap;
   }

   private _run(fishMap: Map<number, number>, numDays: number) {
      for (let i = 1; i <= numDays; ++i) {
         const numFishAt0 = fishMap.get(0) ?? 0;
         for (let j = 1; j <= 8; ++j) {
            const curr = fishMap.get(j) ?? 0;
            fishMap.set(j - 1, curr);
         }
         const numSixes = fishMap.get(6) ?? 0;
         fishMap.set(6, numSixes + numFishAt0);
         fishMap.set(8, numFishAt0);
      }
   }

   private _countTotalFish(fishMap: Map<number, number>) {
      return Array.from(fishMap.entries()).reduce((count, [_, numFish]) => {
         return count + numFish;
      }, 0);
   }

   private _printFish(fishMap: Map<number, number>) {
      console.log(
         `  NumFish: ${JSON.stringify(
            Array.from(fishMap.entries()).map(([key, val]) => ({ [key]: val }))
         )}`
      );
   }
}

const problem = new Day6Problem('input.txt');
problem.run();
