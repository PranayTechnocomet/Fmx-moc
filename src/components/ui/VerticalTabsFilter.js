import { useState } from "react"

// Sample data for tabs and checkboxes
function VerticalTabsFilter({ values, onApply, onReset, onCancel }) {
    const [selectedItems, setSelectedItems] = useState({})

    const [activeTab, setActiveTab] = useState(values[0].label || "")

    console.log(selectedItems)

    const handleCheckboxChange = (tabId, item) => {
        setSelectedItems((prev) => {
            const updatedItems = { ...prev }
            if (!updatedItems[tabId]) {
                updatedItems[tabId] = []
            }
            if (updatedItems[tabId].includes(item)) {
                updatedItems[tabId] = updatedItems[tabId].filter(
                    (i) => i !== item
                )
            } else {
                updatedItems[tabId] = [...updatedItems[tabId], item]
            }
            return updatedItems
        })
    }

    const handleReset = () => {
        setSelectedItems({})
        onReset()
    }

    const handleApply = () => onApply(selectedItems)

    return (
        <div className="w-96 mx-auto rounded-lg">
            <div className="flex justify-end mb-4">
                <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={onCancel}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            <div className="flex border rounded-lg">
                <div className="w-1/3 min-w-fit bg-gray-100 rounded-l-lg">
                    {values.map(({ label }) => (
                        <button
                            key={label}
                            onClick={() => setActiveTab(label)}
                            className={`w-full text-left px-4 py-2 focus:outline-none rounded-lg capitalize ${
                                activeTab === label
                                    ? "bg-white text-primary-75 font-semibold"
                                    : "text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                <div className="w-2/3 bg-white p-4 rounded-r-lg border-l">
                    {values.map(
                        (value) =>
                            activeTab === value.label && (
                                <div key={value.label}>
                                    <h3 className="text-lg font-semibold mb-3 capitalize">
                                        {value.label}
                                    </h3>
                                    <div className="h-[300px] overflow-y-auto pr-4">
                                        {value.options.map((item) => (
                                            <div
                                                key={item.displayId}
                                                className="flex items-center space-x-2 mb-2"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id={`${value.label}-${item.displayText}`}
                                                    checked={
                                                        selectedItems[
                                                            value.label
                                                        ]?.includes(
                                                            item.displayId
                                                        ) &&
                                                        values[
                                                            value.label
                                                        ]?.selected?.includes(
                                                            item.displayId
                                                        )
                                                    }
                                                    onChange={() =>
                                                        handleCheckboxChange(
                                                            value.label,
                                                            item.displayId
                                                        )
                                                    }
                                                    className="rounded border-gray-300 text-[#153AC7] focus:ring-[#153AC7]"
                                                />
                                                <label
                                                    htmlFor={`${value.label}-${item.displayText}`}
                                                    className="text-sm font-medium text-gray-700"
                                                >
                                                    {item.displayText}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                    )}
                </div>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
                <button
                    onClick={handleReset}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#153AC7]"
                >
                    Reset Filter
                </button>
                <button
                    onClick={handleApply}
                    className="px-4 py-2 bg-primary-75 text-white rounded-md hover:bg-[#1232A0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#153AC7]"
                >
                    Apply Filter
                </button>
            </div>
        </div>
    )
}

export default VerticalTabsFilter
