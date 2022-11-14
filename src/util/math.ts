export const sum = (nums: number[]) => nums.reduce((total, curr) => total + curr, 0);
export const sumitorial = (n: number): number => (n === 0 ? 0 : n + sumitorial(n - 1));
export const factorial = (n: number): number => (n === 0 ? 1 : n * factorial(n - 1));
export const average = (nums: number[]) => Math.round(sum(nums) / nums.length);
