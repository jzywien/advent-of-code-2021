import { getDirname, readAllLines } from "../util/file";
const __dirname = getDirname(import.meta.url);

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

const sum = (nums: number[]) => nums.reduce((total, curr) => total + curr, 0);
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

const main = async () => {
  const lines = (await readAllLines(`${__dirname}/input.txt`)).map((line) =>
    Number(line)
  );
  step1(lines);
  step2(lines);
};

main();
