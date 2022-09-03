import { useState } from "react";

const getInitialSmoothCaret = (): boolean => {
  if (typeof document !== "undefined" && window) {
    return localStorage?.getItem("smoothCaret") === "true" ?? false;
  }
  return false;
};

export default (): [boolean, () => void] => {
  const [smoothCaret, setSmoothCaret] = useState(getInitialSmoothCaret());

  const toggleSmoothCaret = () => {
    if (typeof document !== "undefined" && window) {
      localStorage?.setItem("smoothCaret", (!smoothCaret).toString());
      setSmoothCaret(!smoothCaret);
    }
  };

  return [smoothCaret, toggleSmoothCaret];
};

// whats craps?
// nobody knows
// making pizza? you better be making pizza... :D
// crepes are ok too but its not spelled craps
// crepes are kind of a desert pizza.
