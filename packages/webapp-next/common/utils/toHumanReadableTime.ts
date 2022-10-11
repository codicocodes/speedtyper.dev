export const toHumanReadableTime = (secs: number) => {
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs - hours * 3600) / 60) % 60;
  const seconds = secs - hours * 3600 - minutes * 60;
  let result = "";
  result = hours ? result.concat(`${hours}h `) : result;
  result = minutes ? result.concat(`${minutes}m `) : result;
  result = result.concat(`${seconds}s`);
  return result;
};
