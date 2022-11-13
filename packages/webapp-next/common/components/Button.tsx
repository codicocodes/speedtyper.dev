import React, { ButtonHTMLAttributes } from "react";

type ButtonColor = "primary" | "secondary" | "invisible";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: ButtonColor;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  text?: string;
  size?: "sm" | "md" | "lg";
}

const Button = ({
  color,
  disabled,
  onClick,
  leftIcon,
  rightIcon,
  text,
  title,
  size = "md",
}: ButtonProps) => {
  const colorStyles = getColorStyles(color);
  const disabledStyle = disabled
    ? "cursor-not-allowed opacity-80"
    : "cursor-pointer";

  const buttonSize = () => {
    switch (size) {
      case "lg":
        return "text-xl px-12 py-2";
      case "md":
        return "text-base py-2 px-4";
      case "sm":
        return "text-base py-1 px-2";
    }
  };

  return (
    <button
      type="button"
      title={title}
      style={{ transition: "all .15s ease" }}
      onClick={onClick}
      className={`flex items-center ${colorStyles} ${disabledStyle} ${buttonSize()}`}
      disabled={disabled}
      aria-expanded="true"
      aria-haspopup="true"
    >
      <>
        {leftIcon && leftIcon}
        {text && <p className="pl-1">{text}</p>}
        {rightIcon && rightIcon}
      </>
    </button>
  );
};

function getColorStyles(color: ButtonColor) {
  if (color === "invisible") {
    return "off-white border-none";
  }

  const sharedStyle =
    "flex items-center text-gray-900 border-gray-200 border rounded";

  const style =
    color === "primary" ? `bg-off-white` : `bg-purple-400 hover:bg-purple-300`;

  return `${sharedStyle} ${style}`;
}

export default Button;
