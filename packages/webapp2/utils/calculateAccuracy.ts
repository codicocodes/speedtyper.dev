export default (typedCharsCount: number, mistakeCount: number) =>
  Math.floor(((typedCharsCount - mistakeCount) / typedCharsCount) * 100);
