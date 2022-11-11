import { BaseProblem } from '../base-problem';
import { getDirname } from '../util/file';

enum Direction {
   Forward = 'forward',
   Down = 'down',
   Up = 'up',
}

interface Command {
   direction: Direction;
   units: number;
}

export class Day2Problem extends BaseProblem<Command[]> {
   get directory() {
      return getDirname(import.meta.url);
   }

   transform(lines: string[]): Command[] {
      return lines.map((line) => {
         const [direction, units] = line.split(' ');
         return {
            direction: direction as Direction,
            units: Number(units),
         };
      });
   }

   async step1(commands: Command[]) {
      console.log('Day 2 Step 1:');
      const finalPosition = commands.reduce(
         (position, command) => {
            const { direction, units } = command;
            let { horizontal, depth } = position;
            switch (direction) {
               case Direction.Forward:
                  horizontal += units;
                  break;
               case Direction.Down:
                  depth += units;
                  break;
               case Direction.Up:
                  depth -= units;
                  break;
               default:
                  throw new Error('unknown direction');
            }

            return { horizontal, depth };
         },
         { horizontal: 0, depth: 0 }
      );
      console.log(`  Final Position: ${JSON.stringify(finalPosition)}`);
      console.log(`  Answer: ${finalPosition.horizontal * finalPosition.depth}`);
   }

   async step2(commands: Command[]) {
      console.log('Day 2 Step 2:');

      const finalPosition = commands.reduce(
         (position, command) => {
            const { direction, units } = command;
            let { horizontal, depth, aim } = position;
            switch (direction) {
               case Direction.Forward:
                  horizontal += units;
                  depth += aim * units;
                  break;
               case Direction.Down:
                  aim += units;
                  break;
               case Direction.Up:
                  aim -= units;
                  break;
               default:
                  throw new Error('unknown direction');
            }

            return { horizontal, depth, aim };
         },
         { horizontal: 0, depth: 0, aim: 0 }
      );
      console.log(`  Final Position: ${JSON.stringify(finalPosition)}`);
      console.log(`  Answer: ${finalPosition.horizontal * finalPosition.depth}`);
   }
}

const problem = new Day2Problem('sample.txt');
problem.run();
