import { BaseProblem } from '../base-problem';
import { getDirname } from '../util/file';
import { transpose } from '../util/matrix';
import { bitArrayToInt, flipBit } from '../util/binary';

type BitArray = number[];

export class Day3Problem extends BaseProblem<BitArray[]> {
   get directory() {
      return getDirname(import.meta.url);
   }

   transform = (lines: string[]): BitArray[] => {
      return lines.map((line) => line.split('').map((bit) => Number(bit)));
   };

   async step1(bitArrays: BitArray[]) {
      console.log('Day 3 Step 1:');

      const transposed = transpose(bitArrays);
      const gammaRateBitArray = transposed.reduce((accum, curr) => {
         const bit = this.mostCommonBit(curr);
         return [...accum, bit];
      }, []);
      const epsilonRateBitArray = gammaRateBitArray.map(flipBit);
      const gammaRate = bitArrayToInt(gammaRateBitArray);
      const epsilonRate = bitArrayToInt(epsilonRateBitArray);
      const powerConsumption = gammaRate * epsilonRate;

      console.log(
         `  {gammaRate: ${gammaRate}, epsilonRate: ${epsilonRate}, powerConsumption: ${powerConsumption}}`
      );
   }

   async step2(bitArrays: BitArray[]) {
      console.log('Day 3 Step 2:');

      const oxygenGeneratorRating = this.findRatingValue(
         this.mostCommonBitAtPosition.bind(this),
         bitArrays
      );
      const CO2ScrubberRating = this.findRatingValue(
         this.leastCommonBitAtPosition.bind(this),
         bitArrays
      );
      const lifeSupportRating = oxygenGeneratorRating * CO2ScrubberRating;
      console.log(
         `  {oxygenGeneratorRating: ${oxygenGeneratorRating}, CO2ScrubberRating: ${CO2ScrubberRating}, lifeSupportRating: ${lifeSupportRating}}`
      );
   }

   private mostCommonBit(bitArray: BitArray): number {
      const sizeHalf = bitArray.length / 2;
      const isMostCommon0 = bitArray.filter((bit) => bit === 0).length > sizeHalf;
      return isMostCommon0 ? 0 : 1;
   }

   private mostCommonBitAtPosition(bitArrays: BitArray[], bitPosition: number): number {
      const bitsAtPosition = bitArrays.map((bitArray) => bitArray[bitPosition]);
      return this.mostCommonBit(bitsAtPosition);
   }

   private leastCommonBitAtPosition(bitArrays: BitArray[], bitPosition: number): number {
      const mostCommon = this.mostCommonBitAtPosition(bitArrays, bitPosition);
      return flipBit(mostCommon);
   }

   private findRatingValue(
      strategy: (bitArrays: BitArray[], index: number) => number,
      bitArrays: BitArray[],
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
}

const problem = new Day3Problem('sample.txt');
problem.run();
