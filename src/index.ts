import { Day1Problem } from './day-1/index';
import { Day2Problem } from './day-2/index';
import { Day3Problem } from './day-3/index';

const problems = [
   //    new Day1Problem('input.txt'),
   // new Day2Problem('input.txt'),
   new Day3Problem('input.txt'),
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
