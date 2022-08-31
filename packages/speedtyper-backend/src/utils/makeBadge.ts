import { makeBadge } from "badge-maker";

export default (message: string) => {
  return makeBadge({
    label: `<SpeedTyper />`,
    message,
    labelColor: "#18181b",
    color: "#9f7aea",
    // (Optional) One of: 'plastic', 'flat', 'flat-square', 'for-the-badge' or 'social'
    // style: "flat", // todo let users decide with ?style=
  });
};
