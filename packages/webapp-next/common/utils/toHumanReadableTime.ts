const MINUTES_IN_SECONDS = 60;

const HOURS_IN_SECONDS = MINUTES_IN_SECONDS * 60;

const DAYS_IN_SECONDS = HOURS_IN_SECONDS * 24;

export const toHumanReadableTime = (secs: number) => {
  const days = Math.floor(secs / DAYS_IN_SECONDS);
  const hours = Math.floor((secs - days * DAYS_IN_SECONDS) / HOURS_IN_SECONDS);

  const minutes =
    Math.floor(
      (secs - days * DAYS_IN_SECONDS - hours * HOURS_IN_SECONDS) / 60
    ) % MINUTES_IN_SECONDS;

  const seconds =
    secs -
    days * DAYS_IN_SECONDS -
    hours * HOURS_IN_SECONDS -
    minutes * MINUTES_IN_SECONDS;

  let result = "";
  result = days ? result.concat(`${days} days `) : result;
  result = hours ? result.concat(`${hours}h `) : result;
  if (!days) result = minutes ? result.concat(`${minutes}m `) : result;
  if (!hours) result = result.concat(`${seconds}s`);
  return result.trim();
};
