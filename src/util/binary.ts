export const flipBit = (bit: number) => (!bit ? 1 : 0);
export const bitArrayToInt = (bitArray: number[]) => parseInt(bitArray.join(''), 2);

export const onesComplement = (num: number): number => {
   const numBits = Math.floor(Math.log2(num)) + 1;
   return Math.pow((1 << numBits) - 1, numBits);
};

export const countSetBits = (num: number): number => {
   let count = 0;
   while (num) {
      num &= num - 1;
      count++;
   }
   return count;
};
