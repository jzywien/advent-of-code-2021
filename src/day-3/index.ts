import { BaseProblem, Steps } from '../base-problem';
import { getDirname } from '../util/file';
import { transpose } from '../util/array';
import { bitArrayToInt, flipBit } from '../util/binary';

class Day3Problem extends BaseProblem<number[]> {
   mostCommonBit(bitArray: number[]): number {
      const sizeHalf = bitArray.length / 2;
      const isMostCommon0 =
         bitArray.filter((bit) => bit === 0).length > sizeHalf;
      return isMostCommon0 ? 0 : 1;
   }

   async step1(bitArrays: number[][]) {
      const transposed = transpose(bitArrays);
      const gammaRateBitArray = transposed.reduce((accum, curr) => {
         const bit = this.mostCommonBit(curr);
         return [...accum, bit];
      }, []);
      const epsilonRateBitArray = gammaRateBitArray.map(flipBit);
      const gammaRate = bitArrayToInt(gammaRateBitArray);
      const epsilonRate = bitArrayToInt(epsilonRateBitArray);
      const powerConsumption = gammaRate * epsilonRate;

      console.log('Day 3 step 1: ', gammaRate, epsilonRate, powerConsumption);
   }

   mostCommonBitAtPosition(bitArrays: number[][], bitPosition: number): number {
      const bitsAtPosition = bitArrays.map((bitArray) => bitArray[bitPosition]);
      return this.mostCommonBit(bitsAtPosition);
   }

   leastCommonBitAtPosition(
      bitArrays: number[][],
      bitPosition: number
   ): number {
      const mostCommon = this.mostCommonBitAtPosition(bitArrays, bitPosition);
      return !mostCommon ? 1 : 0;
   }

   findRatingValue(
      strategy: (bitArrays: number[][], index: number) => number,
      bitArrays: number[][],
      index = 0
   ): number {
      if (index > bitArrays[0].length) {
         throw new Error('index exceeds boundaries');
      }
      if (bitArrays.length === 1) {
         return bitArrayToInt(bitArrays[0]);
      }
      const mostCommon = strategy(bitArrays, index);
      const filteredBitArrays = bitArrays.filter(
         (bitArray) => bitArray[index] === mostCommon
      );
      return this.findRatingValue(strategy, filteredBitArrays, ++index);
   }

   async step2(bitArrays: number[][]) {
      console.log('Day 3 step 2');
      const oxygenGeneratorRating = this.findRatingValue(
         this.mostCommonBitAtPosition.bind(this),
         bitArrays
      );
      const CO2ScrubberRating = this.findRatingValue(
         this.leastCommonBitAtPosition.bind(this),
         bitArrays
      );
      const lifeSupportRating = oxygenGeneratorRating * CO2ScrubberRating;
      console.log(lifeSupportRating);
   }
}

const inputTransform = (line: string): number[] => {
   return line.split('').map((bit) => Number(bit));
};
const filename = 'input.txt';
const problem = new Day3Problem(
   getDirname(import.meta.url),
   filename,
   inputTransform
);

problem.run(Steps.Step2);
