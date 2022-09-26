import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color: "primary" | "secondary",
    leftIcon?: React.ReactElement,
    rightIcon?: React.ReactElement,
    text: string,
    size?: "md" | "lg",
}

const Button = ({ color, disabled, onClick, leftIcon, rightIcon, text, title, size = "md" }: ButtonProps) => {
    const sharedStyle = "flex items-center text-gray-900 border-gray-200 border rounded"

    const style = color === "primary"
        ?
        `bg-off-white`
        :
        `bg-purple-400`

    const disabledStyle = disabled
        ?
        "cursor-not-allowed opacity-80"
        :
        "cursor-pointer"

    const buttonSize = size == "lg" ?
        "text-xl px-12 py-2"
        :
        "text-base py-1.5 px-2"

    return (
        <button
            type="button"
            title={title}
            style={{ transition: "all .15s ease" }}
            onClick={onClick}
            className={`${sharedStyle} ${style} ${disabledStyle} ${buttonSize}`}
            disabled={disabled}
            aria-expanded="true"
            aria-haspopup="true"
        >
            <>
                {leftIcon && leftIcon}
                <p className="pl-1">{text}</p>
                {rightIcon && rightIcon}
            </>
        </button>
    )
}

export default Button;