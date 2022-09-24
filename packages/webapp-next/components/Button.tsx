import React, { FC } from "react";
// TODO: types
type props = {
    color: "primary" | "secondary",
    disabled?: boolean,
    onClick?: any,
    leftIcon?: React.ReactElement,
    rightIcon?: React.ReactElement,
    text: string,
    title: string,
    size?: "lg",
}

const Button:FC<props> = ({color, disabled, onClick, leftIcon, rightIcon, text, title, size}) => {
    if (color === "primary") {
        return (
            <button
            type="button"
            title={title}
            style={{ transition: "all .15s ease" }}
            onClick={onClick}
            className={`flex hover:bg-gray-100 bg-off-white shadow rounded items-center ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${ size == "lg" ? "text-xl px-12 py-2 mt-4 mx-12 mb-6" : "text-base px-2 lg:px-4 py-1 mx-2 lg:mx-2"} border-gray-200 border text-gray-900`}
            >
            <>
                {leftIcon && leftIcon}
                <p className="pl-1">{text}</p>
                {rightIcon && rightIcon}
            </>
            </button>
        )
    }

    return (
        <button
        type="button"
        className={`flex my-4 items-center ${disabled ? "cursor-not-allowed" : "hover:bg-purple-300 cursor-pointer"} bg-purple-400 py-2 px-4 ml-4 rounded shadow-2xl border-gray-200 border`}
        onClick={onClick}
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