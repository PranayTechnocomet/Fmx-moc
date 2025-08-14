// "use client"

// import { Eye, EyeOff } from "lucide-react"
// import React, { useEffect, useRef, useState } from "react"

// const InputField = ({
//     icon: Icon,
//     error,
//     type = "text",
//     className = "",
//     inputStyle,
//     inputContainerStyle = "",
//     rightIcon,
//     ref,
//     ...props
// }) => {
//     const [showPassword, setShowPassword] = useState(false)
//     const [isFocused, setIsFocused] = useState(false)
//     const inputRef = useRef(null)

//     const togglePasswordVisibility = () => setShowPassword(!showPassword)

//     const inputType = (type) => {
//         switch (type) {
//             case "password":
//                 return showPassword ? "text" : "password"
//             case "date":
//                 return isFocused ? "date" : "text"
//             case "time":
//                 return isFocused ? "time" : "text"
//             default:
//                 return type
//         }
//     }

//     useEffect(() => {
//         const handleFocus = () => setIsFocused(true)
//         const handleBlur = () => setIsFocused(false)
//         const handleGlobalClick = (e) => {
//             if (inputRef.current && !inputRef.current.contains(e.target)) {
//                 setIsFocused(false)
//             }
//         }

//         const input = inputRef.current
//         input.addEventListener("focus", handleFocus)
//         input.addEventListener("blur", handleBlur)
//         document.addEventListener("mousedown", handleGlobalClick)

//         return () => {
//             input.removeEventListener("focus", handleFocus)
//             input.removeEventListener("blur", handleBlur)
//             document.removeEventListener("mousedown", handleGlobalClick)
//         }
//     }, [])

//     return (
//         <div
//             className={"" + (className ? className : "")}
//             onClick={() => {
//                 inputRef.current.focus()
//                 // open the date picker when the user clicks on the input field
//                 if (type === "date") {
//                     inputRef.current.showPicker()
//                 } else if (type === "time") {
//                     inputRef.current.showPicker()
//                 }
//             }}
//         >
//             <div className="relative">
//                 <div
//                     className={`
//                             flex items-center border rounded-md bg-white ${
//                                 Icon ? "pl-2" : ""
//                             }
//                             ${
//                                 error
//                                     ? "border-red-500"
//                                     : isFocused
//                                     ? "border-blue-800"
//                                     : ""
//                             }
//                             ${
//                                 props.disabled
//                                     ? " border-slate-300 !bg-gray-100"
//                                     : ""
//                             }
//                             ${inputContainerStyle}
//                         `}
//                 >
//                     {Icon && <Icon className="w-5 h-5 text-gray-400" />}
//                     <input
//                         ref={(node) => {
//                             inputRef.current = node
//                             if (typeof ref === "function") {
//                                 ref(node)
//                             } else if (ref) {
//                                 ref.current = node
//                             }
//                         }}
//                         type={inputType(type)}
//                         className={`
//                                 w-full py-2 rounded-md focus:outline-none 
//                                 disabled:bg-gray-100 ml-2
//                                 ${type === "password" ? "pr-1" : ""}
//                                 ${Icon ? "pl-2" : "pl-1"}
//                                 ${inputStyle ? inputStyle : ""}
//                             `}
//                         // onFocus={() => {
//                         //     if (type === "date") {
//                         //         inputRef.current.type = "date"
//                         //     }
//                         // }}
//                         // onBlur={() => {
//                         //     if (type === "date") {
//                         //         inputRef.current.type = "date"
//                         //     }
//                         // }}
//                         {...props}
//                     />
//                     {type === "password" && (
//                         <button
//                             type="button"
//                             onClick={togglePasswordVisibility}
//                             className="absolute inset-y-0 right-0 flex items-center pr-3"
//                         >
//                             {showPassword ? (
//                                 <EyeOff className="w-5 h-5 text-gray-400" />
//                             ) : (
//                                 <Eye className="w-5 h-5 text-gray-400" />
//                             )}
//                         </button>
//                     )}
//                     {rightIcon && (
//                         <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//                             {rightIcon}
//                         </div>
//                     )}
//                 </div>
//             </div>
//             {error && (
//                 <p className="text-red-500 text-sm pl-2 mt-0.5">{error}</p>
//             )}
//         </div>
//     )
// }

// InputField.displayName = "InputField"

// export default InputField




'use client'

import { Eye, EyeOff } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

const InputField = ({
    icon: Icon,
    error,
    type = 'text',
    className = '',
    inputStyle,
    inputContainerStyle = '',
    rightIcon,
    rightDropdownOptions = [],
    rightDropdownValue,
    onRightDropdownChange,
    label,
    required,
    ref,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef(null)

    const togglePasswordVisibility = () => setShowPassword(!showPassword)

    const inputType = (type) => {
        switch (type) {
            case 'password':
                return showPassword ? 'text' : 'password'
            case 'date':
                return isFocused ? 'date' : 'text'
            case 'time':
                return isFocused ? 'time' : 'text'
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
        input.addEventListener('focus', handleFocus)
        input.addEventListener('blur', handleBlur)
        document.addEventListener('mousedown', handleGlobalClick)

        return () => {
            input.removeEventListener('focus', handleFocus)
            input.removeEventListener('blur', handleBlur)
            document.removeEventListener('mousedown', handleGlobalClick)
        }
    }, [])

    return (
        <div className={className}>
            {label && (
                <label className="text-sm text-gray-700 font-medium mb-1 block">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div
                className={`relative flex items-center border rounded-md bg-white 
                ${Icon ? 'pl-2' : ''}
                ${error ? 'border-red-500' : isFocused ? 'border-blue-800' : 'border-gray-300'}
                ${props.disabled ? 'border-slate-300 bg-gray-100' : ''}
                ${inputContainerStyle}`}
                onClick={() => {
                    inputRef.current?.focus()
                    if (type === 'date' || type === 'time') {
                        inputRef.current.showPicker()
                    }
                }}
            >
                {Icon && <Icon className="w-5 h-5 text-gray-400 ml-2" />}
                <input
                    ref={(node) => {
                        inputRef.current = node
                        if (typeof ref === 'function') {
                            ref(node)
                        } else if (ref) {
                            ref.current = node
                        }
                    }}
                    type={inputType(type)}
                    className={`
                        w-full py-2 pr-[4.5rem] rounded-md focus:outline-none 
                        disabled:bg-gray-100 ml-2 placeholder:text-gray-400
                        ${Icon ? 'pl-2' : 'pl-1'} 
                        ${inputStyle || ''}
                    `}
                    {...props}
                />

                {/* Password toggle */}
                {type === 'password' && (
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

                {/* Dropdown on the right side inside input */}
                {rightDropdownOptions.length > 0 && (
                    <select
                        className="absolute right-1 top-1/2 -translate-y-1/2 bg-gray-100 text-sm px-2 py-1 rounded-md border border-gray-300 focus:outline-none"
                        value={rightDropdownValue}
                        onChange={onRightDropdownChange}
                    >
                        {rightDropdownOptions.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                )}

                {/* Optional right icon */}
                {rightIcon && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {rightIcon}
                    </div>
                )}
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm pl-2 mt-0.5">{error}</p>}
        </div>
    )
}

InputField.displayName = 'InputField'
export default InputField
