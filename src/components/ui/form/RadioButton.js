import React from "react"

const RadioButton = ({
    options = [], // Set an empty array as default value
    name,
    value,
    onChange,
    error,
    className = ""
}) => {
    return (
        <div className={className}>
            <div className="relative">
                <div
                    className={`flex items-center rounded-md bg-white px-2
            ${error ? "border-red-500" : "border-gray-300"}
          `}
                >
                    {options.map((option, index) => (
                        <div
                            key={`${option.value || option}-${index}`}
                            className="flex items-center mr-4"
                        >
                            <input
                                type="radio"
                                name={name} // Group radio buttons by name
                                value={option.value ? option.value : option}
                                checked={value === (option.value ? option.value : option)} // Match the checked state to the passed value
                                onChange={() => onChange(option.value ? option.value : option)} // Trigger onChange with the new value
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label
                                htmlFor={option.value ? option.value : option}
                                className="ml-2 block text-sm text-gray-900"
                            >
                                {option.label ? option.label : option}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            {error && (
                <p className="text-red-500 text-sm pl-2 mt-0.5">{error}</p>
            )}
        </div>
    )
}

export default RadioButton
