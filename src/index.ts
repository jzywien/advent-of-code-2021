import { Steps } from './base-problem';
import { Day1Problem } from './day-1';
import { Day2Problem } from './day-2';
import { Day3Problem } from './day-3';
import { Day4Problem } from './day-4';

const problems = [
   //new Day1Problem('input.txt'),
   //new Day2Problem('input.txt'),
   //new Day3Problem('input.txt'),
   new Day4Problem('input.txt'),
];

const main = async () => {
   for (let problem of problems) {
      try {
         await problem.run();
      } catch (err) {
         console.error(err);
      }
   }
};

main();
