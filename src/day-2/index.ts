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

class Day2Problem extends BaseProblem<Command> {
   async step1(commands: Command[]) {
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
      console.log(`Step 1 Final Position: ${JSON.stringify(finalPosition)}`);
      console.log(`Step 1 Answer: ${finalPosition.horizontal * finalPosition.depth}`);
   }

   async step2(commands: Command[]) {
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
      console.log(`Step 2 Final Position: ${JSON.stringify(finalPosition)}`);
      console.log(`Step 2 Answer: ${finalPosition.horizontal * finalPosition.depth}`);
   }
}

const inputTransform = (line: string): Command => {
   const [direction, units] = line.split(' ');
   return {
      direction: direction as Direction,
      units: Number(units),
   };
};
const filename = 'input.txt';
const problem = new Day2Problem(getDirname(import.meta.url), filename, inputTransform);

problem.run();
