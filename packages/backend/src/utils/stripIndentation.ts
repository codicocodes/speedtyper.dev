export default (text: string): string => {
  return text
    .split("\n")
    .map((subText) => subText.trimStart())
    .join("\n");
};
