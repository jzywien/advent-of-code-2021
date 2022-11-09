import { readAllLines } from './util/file';

export enum Steps {
   Step1,
   Step2,
   All,
}

export abstract class BaseProblem<T> {
   private _file: string;
   private _transform: (line: string) => T;

   constructor(
      directory: string,
      fileName: string,
      transform: (line: string) => T = (line: string) => line as T
   ) {
      this._file = `${directory}/${fileName}`;
      this._transform = transform;
   }

   private async _init(): Promise<Array<T>> {
      const lines = await readAllLines(this._file);
      const transformed = lines.map(this._transform);
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

   abstract step1(lines: Array<T>): void;
   abstract step2(lines: Array<T>): void;
}
