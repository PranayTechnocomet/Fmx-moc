import React, { useEffect, useRef, useState } from "react"

export default function SingleDropdown({
    options =[],
    onChange,
    value,
    placeholder = "Select an option",
    selectStyle = "",
    optionStyle = "",
    className = "",
    disabled = false,
    ...props
}) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const isPrimitive = (val) => {
        if (val === null) {
            return
        }

        if (typeof val == "object" || typeof val == "function") {
            return false
        } else {
            return true
        }
    }
    const normalizedOptions = options.map((opt,index) =>
        isPrimitive(opt) ? { value: opt, label: opt,key:index } : opt
    )

    const renderValue = () => {
        const selectedOption = normalizedOptions.find(
            (opt) => opt.value === value
        )
        return selectedOption ? selectedOption.label : placeholder
    }   

    return (
        <div
            className={`relative w-full ${className}`}
            ref={dropdownRef}
        >
            <div
                className={`w-full rounded-md bg-white cursor-pointer p-2 border border-gray-300  flex items-center justify-between ${selectStyle} ${
                    !value ? "text-gray-400" : "text-gray-700"
                } ${disabled ? "!bg-gray-100" : ""}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <span>{renderValue()}</span>
                <svg
                    className={`w-5 h-5 text-gray-950 transition-transform ${
                        isOpen ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>
            {isOpen && (
                
                
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {normalizedOptions.map((option, index) => (
                        <div
                            key={`${option.value}-${index}`}
                            className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${optionStyle}`}
                            onClick={() => {
                                onChange(option.value)
                                setIsOpen(false)
                            }}
                        >
                            <span
                                className={`text-gray-700 ${
                                    value === option.value
                                        ? "font-semibold"
                                        : ""
                                }`}
                            >
                                {option.label}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
