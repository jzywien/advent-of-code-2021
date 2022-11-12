import { BaseProblem, Steps } from '../base-problem';
import { getDirname } from '../util/file';
import { average, sumitorial } from '../util/math';

export class Day7Problem extends BaseProblem<number[]> {
   get directory(): string {
      return getDirname(import.meta.url);
   }

   transform(inputLines: string[]): number[] {
      return inputLines.reduce((values: number[], line) => {
         return [...values, ...line.split(',').map((num) => parseInt(num))];
      }, []);
   }

   step1(crabs: number[]): void {
      console.log('Day 7 Step 1');
      let minFuel = 100_000_000_000;
      const [min, max] = this._getSearchBounds(crabs);

      for (let i = min; i <= max; ++i) {
         const fuel = this._calculateFuelUsed(crabs, i);
         if (fuel < minFuel) {
            minFuel = fuel;
         }
      }

      console.log(`  Min Fuel: ${minFuel}`);
   }

   private _calculateFuelUsed(crabs: number[], index: number, hasStepCost = false) {
      return crabs.reduce((fuel, crab) => {
         if (!hasStepCost) {
            return fuel + Math.abs(crab - index);
         }
         const numSteps = Math.abs(crab - index);
         return fuel + sumitorial(numSteps);
      }, 0);
   }

   // The optimal solution should be near the average position of the crabs
   // don't search every number, but +- a tolerance from the average
   private _getSearchBounds(crabs: number[]) {
      const avgCrabPos = average(crabs);
      const tolerance = 2;
      const min = Math.max(avgCrabPos - tolerance, 0);
      const max = Math.min(avgCrabPos + tolerance, crabs.length);
      return [min, max];
   }

   step2(crabs: number[]): void {
      console.log('Day 7 Step 2');
      let minFuel = 100_000_000_000;
      const [min, max] = this._getSearchBounds(crabs);

      for (let i = min; i <= max; ++i) {
         const fuel = this._calculateFuelUsed(crabs, i, true);
         if (fuel < minFuel) {
            minFuel = fuel;
         }
      }

      console.log(`  Min Fuel: ${minFuel}`);
   }
}

const problem = new Day7Problem('input.txt');
problem.run();
