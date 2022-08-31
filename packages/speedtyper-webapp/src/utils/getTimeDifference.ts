import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

export default (time: string) => {
  if (differenceInDays(new Date(), new Date(time))) {
    return `${differenceInDays(new Date(), new Date(time))} hours`;
  }
  if (differenceInHours(new Date(), new Date(time))) {
    return `${differenceInHours(new Date(), new Date(time))} hours`;
  }

  if (differenceInMinutes(new Date(), new Date(time))) {
    return `${differenceInMinutes(new Date(), new Date(time))} minutes`;
  }

  if (differenceInSeconds(new Date(), new Date(time))) {
    return `${differenceInSeconds(new Date(), new Date(time))} seconds`;
  }
};
