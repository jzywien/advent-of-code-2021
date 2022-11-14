import { BaseProblem, Steps } from '../base-problem';
import { getDirname } from '../util/file';
import { average, sumitorial } from '../util/math';

interface InputLine {
    signalPatterns: string[];
    outputValues: string[];
}

export class Day8Problem extends BaseProblem<InputLine[]> {
   get directory(): string {
      return getDirname(import.meta.url);
   }

   transform(inputLines: string[]): InputLine[] {
      return inputLines.reduce((values: InputLine[], line) => {
        const [patterns, output] = line.split('|');
        return [...values, {
            signalPatterns: patterns.split(' ').map((pattern: string) => pattern.trim()),
            outputValues: output.split(' ').map((val: string) => val.trim())
        }];
        
    }, []);
   }

   step1(inputLines: InputLine[]): void {
      console.log('Day 8 Step 1');
      const uniqueLengthMap = new Map([[2, [1]], [3, [7]], [4, [4]],[7, [8]]]);
      const numUnique = inputLines.reduce((sum, line) => {
        return sum + line.outputValues.reduce((lineSum, val) => {
            console.log(`  ${val} -- ${lineSum}`);
            return lineSum + (uniqueLengthMap.has(val.length) ? 1 : 0);
        }, 0);
      }, 0)
      console.log(`  Num Unique: ${numUnique}`);
      
   }

   step2(inputLines: InputLine[]): void {
    console.log('Day 8 Step 2');
    throw new Error('not yet implemented');
 }

}


const problem = new Day8Problem('input.txt');
problem.run(Steps.Step1);
