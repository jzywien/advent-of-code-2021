export type Matrix<T> = T[][];

export const transpose = <T>(matrix: Matrix<T>) =>
   matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
