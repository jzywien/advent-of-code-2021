export const transpose = <T>(matrix: T[][]) =>
   matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
