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

   private async _init(): Promise<T> {
      const file = `${this.directory}/${this._fileName}`;
      const lines = await readAllLines(file);
      return this.transform(lines);
   }

   public async run(steps: Steps = Steps.All) {
      const input = await this._init();
      switch (steps) {
         case Steps.Step1:
            await this.step1(input);
            break;
         case Steps.Step2:
            await this.step2(input);
            break;
         case Steps.All:
            await this.step1(input);
            await this.step2(input);
            break;
      }
   }

   abstract get directory(): string;
   abstract transform(lines: string[]): T;
   abstract step1(input: T): void;
   abstract step2(input: T): void;
}
