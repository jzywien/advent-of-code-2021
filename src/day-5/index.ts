import { BaseProblem } from '../base-problem';
import { getDirname } from '../util/file';
import { Line, Point } from '../util/geometry';

export class Day5Problem extends BaseProblem<Line[]> {
   get directory(): string {
      return getDirname(import.meta.url);
   }

   transform(inputLines: string[]): Line[] {
      const lines = inputLines.reduce((allLines: Line[], inputLine) => {
         const [p1, p2] = inputLine.split(' -> ').map((pair) => Point.fromPair(pair));
         const line = new Line(p1, p2);
         return [...allLines, line];
      }, []);
      return lines;
   }

   private _buildPointMap(points: Point[]) {
      const pointMap = new Map<number, Map<number, number>>();
      for (let point of points) {
         const x = pointMap.get(point.x);
         if (!x) {
            pointMap.set(point.x, new Map<number, number>([[point.y, 1]]));
         } else {
            const y = x.get(point.y);
            x.set(point.y, (y ?? 0) + 1);
         }
      }
      return pointMap;
   }

   private _findOverlappingLines(pointMap: Map<number, Map<number, number>>) {
      return Array.from(pointMap.entries()).reduce((count, [x, map]) => {
         const mapEntries = Array.from(map.entries());
         return count + mapEntries.filter(([_, val]) => val > 1).length;
      }, 0);
   }

   step1(lines: Line[]): void {
      console.log('Day 5 Step 1');

      const points = lines.reduce((allPoints: Point[], line: Line) => {
         return [...allPoints, ...line.bresenhamPoints()];
      }, []);

      const pointMap = this._buildPointMap(points);
      const overlappingPoints = this._findOverlappingLines(pointMap);

      console.log(`  ${overlappingPoints}`);
   }

   step2(lines: Line[]): void {
      console.log('Day 5 Step 2');

      const points = lines.reduce((allPoints: Point[], line: Line) => {
         return [...allPoints, ...line.bresenhamPoints(false)];
      }, []);

      const pointMap = this._buildPointMap(points);
      const overlappingPoints = this._findOverlappingLines(pointMap);

      console.log(`  ${overlappingPoints}`);
   }
}

const problem = new Day5Problem('sample.txt');
problem.run();
