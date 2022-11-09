import { getDirname, readAllLines } from "../util/file";
import { sum } from "../util/math";

const step1 = (lines: number[]) => {
  let prev: number | null = null;
  let numIncreases = 0;
  for (const line of lines) {
    if (prev !== null && line > prev) {
      ++numIncreases;
    }
    prev = line;
  }
  console.log(`Step 1: ${numIncreases}`);
};

const step2 = (lines: number[]) => {
  let prev: number | null = null;
  let numIncreases = 0;
  for (let i = 0; i < lines.length; ++i) {
    const window = lines.slice(i, i + 3);
    const total = sum(window);
    if (prev !== null && total > prev) {
      ++numIncreases;
    }
    prev = total;
  }
  console.log(`Step 2: ${numIncreases}`);
};

const inputTransform = (line: string): number => Number(line);

const main = async () => {
  const filename = `${getDirname(import.meta.url)}/input.txt`;
  const lines = await readAllLines(filename);
  const transformed = lines.map(inputTransform);
  step1(transformed);
  step2(transformed);
};

main();
