// source https://gist.github.com/jweyrich/f39c496b83f73d2c5b0587f4d841651b
interface TimeUnit {
  [key: string]: number;
}

const TIME_UNITS: TimeUnit = {
  year: 3.154e10,
  month: 2.628e9,
  week: 6.048e8,
  day: 8.64e7,
  hour: 3.6e6,
  minute: 60000,
  second: 1000,
};

export function humanizeAbsolute(when: Date | number) {
  const diff =
    new Date().getTime() - (typeof when === "number" ? when : when.getTime());
  for (const unit in TIME_UNITS) {
    const quotient = Math.floor(diff / TIME_UNITS[unit]);
    if (quotient > 0) {
      return `${quotient} ${unit}${quotient > 1 ? "s" : ""}`;
    }
  }
  return "just now";
}

export function humanizeRelative(pastMilliseconds: number) {
  return humanizeAbsolute(new Date().getTime() - pastMilliseconds);
}

export function humanizeTimePlayed(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  seconds = seconds - hours * 3600 - minutes * 60;
  if (!!hours) {
    if (!!minutes) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else {
      return `${hours}h ${seconds}s`;
    }
  }
  if (!!minutes) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}
