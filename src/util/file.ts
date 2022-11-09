import { createReadStream } from "fs";
import { readFile } from "fs/promises";
import { createInterface, Interface } from "readline";
import { fileURLToPath } from "url";
import { dirname } from "path";

export const readLineStream = (filename: string): Interface => {
  const fileStream = createReadStream(filename);

  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  return rl;
};

export const readAllLines = async (filename: string): Promise<string[]> => {
  const fileContent = await readFile(filename);
  return fileContent.toString().split("\n");
};

export const getDirname = (filename: string): string => {
  const __filename = fileURLToPath(filename);
  return dirname(__filename);
};
