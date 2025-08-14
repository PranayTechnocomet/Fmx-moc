// Button.js
import React from "react"

const Button = ({
    children,
    onClick,
    type = "button",
    variant = "primary-100",
    size = "md",
    disabled = false,
    className
}) => {
    const classes = {
        primary:
            "bg-primary-100 hover:bg-primary-100 text-white border-primary-100",
        secondary: "bg-punc-bg text-primary-100 border-transparent font-bold",
        tertiary: "bg-white text-primary-100 border",
        success: "bg-[#14CDA2] text-white rounded-lg",
        danger: "bg-red-50 text-red-600 rounded-lg",
        custom: ""
    }

    const sizes = {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2 text-md",
        lg: "px-6 py-3 text-lg"
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${classes[variant]} ${sizes[size]
                } rounded border font-medium transition duration-300 inline-flex gap-2 ease-in-out w-fit ${className ? className : ""
                }`}
        >
            {children}
        </button>
    )
}

export default Button
