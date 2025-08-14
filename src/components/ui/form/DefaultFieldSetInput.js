"use client"

import { Eye, EyeOff } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"

const DefaultFieldSetInput = ({
    icon: Icon,
    iconPosition = "right", // Default to left
    error,
    type = "text",
    className,
    inputStyle,
    inputContainerStyle = "",
    rightIcon,
    ref,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef(null)

    const togglePasswordVisibility = () => setShowPassword(!showPassword)

    const inputType = (type) => {
        switch (type) {
            case "password":
                return showPassword ? "text" : "password"
            case "date":
                return isFocused ? "date" : "text"
            case "time":
                return isFocused ? "time" : "text"
            default:
                return type
        }
    }

    useEffect(() => {
        const handleFocus = () => setIsFocused(true)
        const handleBlur = () => setIsFocused(false)
        const handleGlobalClick = (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setIsFocused(false)
            }
        }

        const input = inputRef.current
        input.addEventListener("focus", handleFocus)
        input.addEventListener("blur", handleBlur)
        document.addEventListener("mousedown", handleGlobalClick)

        return () => {
            input.removeEventListener("focus", handleFocus)
            input.removeEventListener("blur", handleBlur)
            document.removeEventListener("mousedown", handleGlobalClick)
        }
    }, [])

    return (
        <div
            className={"" + (className ? className : "")}
            onClick={() => {
                inputRef.current.focus()
                if (type === "date" || type === "time") {
                    inputRef.current.showPicker()
                }
            }}
        >
            <div className="relative">
                <div
                    className={`
                            flex items-center border-0  rounded-md bg-white
                            ${iconPosition === "left" && Icon ? "pl-2" : ""}
                            ${iconPosition === "right" && Icon ? "pr-2" : ""}
                            ${error ? "border-red-500" : isFocused ? "border-blue-800" : ""}
                            ${props.disabled ? "border-slate-300 !bg-gray-100" : ""}
                            ${inputContainerStyle}
                        `}
                >
                    {Icon && iconPosition === "left" && (
                        <Icon className="w-5 h-5 text-gray-400" />
                    )}
                    <input
                        ref={(node) => {
                            inputRef.current = node
                            if (typeof ref === "function") {
                                ref(node)
                            } else if (ref) {
                                ref.current = node
                            }
                        }}
                        type={inputType(type)}
                        className={`
                                w-full border-0 py-2 rounded-md focus:outline-none 
                                disabled:bg-gray-100 ml-2
                                ${type === "password" ? "pr-1" : ""}
                                ${Icon && iconPosition === "left" ? "pl-2" : "pl-1"}
                                ${Icon && iconPosition === "right" ? "pr-8" : ""}
                                ${inputStyle ? inputStyle : ""}
                            `}
                        {...props}
                    />
                    {Icon && iconPosition === "right" && (
                        <Icon className="absolute right-2 w-5 h-5 text-gray-400" />
                    )}
                    {type === "password" && (
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5 text-gray-400" />
                            ) : (
                                <Eye className="w-5 h-5 text-gray-400" />
                            )}
                        </button>
                    )}
                    {rightIcon && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            {rightIcon}
                        </div>
                    )}
                </div>
            </div>
            {error && <p className="text-red-500 text-sm pl-2 mt-0.5">{error}</p>}
        </div>
    )
}

DefaultFieldSetInput.displayName = "DefaultFieldSetInput"

export default DefaultFieldSetInput
