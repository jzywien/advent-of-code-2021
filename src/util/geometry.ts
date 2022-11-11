export class Point {
   x: number;
   y: number;

   constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
   }

   compare(point: Point) {
      if (this.x < point.x) return -1;
      if (this.y < point.y) return -1;
      if (this.x === point.x) return 0;
      return 1;
   }

   /**
    * create a Point from a comma separated pair of numbers
    * @param pair string in form of 1,2
    * @returns new point class
    */
   static fromPair(pair: string) {
      const [x, y] = pair.split(',').map((num) => parseInt(num));
      return new Point(x, y);
   }
}

export class Line {
   p1: Point;
   p2: Point;

   constructor(p1: Point, p2: Point) {
      this.p1 = p1;
      this.p2 = p2;
   }

   bresenhamPoints(onlyStraight = true): Point[] {
      let { x: x0, y: y0 } = this.p1;
      let { x: x1, y: y1 } = this.p2;

      const isStraightLine = x0 === x1 || y0 === y1;
      if (onlyStraight && !isStraightLine) return [];

      const dx = Math.abs(x1 - x0);
      const sx = x0 < x1 ? 1 : -1;
      const dy = -1 * Math.abs(y1 - y0);
      const sy = y0 < y1 ? 1 : -1;
      let error = dx + dy;
      const points = [];

      while (true) {
         points.push(new Point(x0, y0));
         if (x0 === x1 && y0 === y1) break;
         const error2 = 2 * error;
         if (error2 >= dy) {
            if (x0 === x1) break;
            error = error + dy;
            x0 += sx;
         }
         if (error2 <= dx) {
            if (y0 === y1) break;
            error = error + dx;
            y0 += sy;
         }
      }

      return points;
   }
}
