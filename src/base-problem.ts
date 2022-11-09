import { readAllLines } from './util/file';

export enum Steps {
   Step1,
   Step2,
   All,
}

export abstract class BaseProblem<T> {
   private _fileName: string;

   constructor(fileName: string) {
      this._fileName = fileName;
   }

   private async _init(): Promise<Array<T>> {
      const file = `${this.directory}/${this._fileName}`;
      const lines = await readAllLines(file);
      const transformed = lines.map(this.transform);
      return transformed;
   }

   public async run(steps: Steps = Steps.All) {
      const lines = await this._init();
      switch (steps) {
         case Steps.Step1:
            await this.step1(lines);
            break;
         case Steps.Step2:
            await this.step2(lines);
            break;
         case Steps.All:
            await this.step1(lines);
            await this.step2(lines);
            break;
      }
   }

   abstract get directory(): string;
   abstract transform(line: string): T;
   abstract step1(lines: Array<T>): void;
   abstract step2(lines: Array<T>): void;
}
