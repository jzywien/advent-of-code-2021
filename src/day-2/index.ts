import { getDirname, readAllLines } from "../util/file";
const __dirname = getDirname(import.meta.url);

enum Direction {
  Forward = "forward",
  Down = "down",
  Up = "up",
}

interface Command {
  direction: Direction;
  units: number;
}

const step1 = (commands: Command[]) => {
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
          throw new Error("unknown direction");
      }

      return { horizontal, depth };
    },
    { horizontal: 0, depth: 0 }
  );
  console.log(`Step 1 Final Position: ${JSON.stringify(finalPosition)}`);
  console.log(
    `Step 1 Answer: ${finalPosition.horizontal * finalPosition.depth}`
  );
};

const step2 = (commands: Command[]) => {
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
          throw new Error("unknown direction");
      }

      return { horizontal, depth, aim };
    },
    { horizontal: 0, depth: 0, aim: 0 }
  );
  console.log(`Step 2 Final Position: ${JSON.stringify(finalPosition)}`);
  console.log(
    `Step 2 Answer: ${finalPosition.horizontal * finalPosition.depth}`
  );
};

const main = async () => {
  const lines: Command[] = (await readAllLines(`${__dirname}/input.txt`)).map(
    (line) => {
      const [direction, units] = line.split(" ");
      return {
        direction: direction as Direction,
        units: Number(units),
      };
    }
  );

  step1(lines);
  step2(lines);
};

main();
