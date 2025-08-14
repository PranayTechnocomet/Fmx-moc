
'use client'

import React from 'react'

const DropdownInput = ({
    id,
    className = '',
    type = 'text',
    value,
    onChange,
    placeholder,
    options = ['Hrs', 'Min'],
    dropdownValue = 'Hrs',
    onDropdownChange,
    disabled = false,
    error,
    mendatory,
    inputContainerStyle = "",
    isFocused = false,
    inputStyle,
    ...props

}) => {
    return (
        <div className={`${className}
        ${
            error
                ? "border-red-500"
                : isFocused
                ? "border-blue-800"
                : ""
        }
        ${
            props.disabled
                ? " border-slate-300 !bg-gray-100"
                : ""
        }
        ${inputContainerStyle}
         flex mb-6`}>
            <label
                htmlFor={id}
                className="block text-base font-medium text-gray-950 w-2/5"
            >
                {placeholder} {mendatory && <span className="text-red-500">*</span>}
            </label>

            <div className="relative flex items-center border rounded-md bg-white flex-col w-3/5">
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`w-full p-2 rounded  disabled:bg-gray-100 disabled:text-gray-950 disabled:border-slate-300 focus:outline-none
                        ${inputStyle ? inputStyle : ""}
                        `}
                />

                <select
                    value={dropdownValue}
                    onChange={onDropdownChange}
                    className="absolute top-0 right-0 bg-gray-100 focus:outline-none h-full px-2 rounded-md text-sm w-16 "
                >
                    {options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}

export default DropdownInput

