import { ChevronDownIcon } from "lucide-react"
import React, { useMemo, useRef, useState } from "react"

export default function SearchInput({
    items,
    placeholder = "Search...",
    onSelect,
    selectedItems,
    ...props
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const inputRef = useRef(null)

    const filteredItems = useMemo(() => {
        const unselectedItems = items.filter(
            (item) =>
                !selectedItems.some(
                    (selectedItem) => selectedItem.value === item.value
                )
        )

        if (!searchTerm) {
            return unselectedItems
        }

        return unselectedItems.filter((item) =>
            item.value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [items, selectedItems, searchTerm])

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value)
        setIsOpen(true)
    }

    const handleItemClick = (item) => {
        onSelect(item)
        setSearchTerm("")
        setIsOpen(false)
    }

    return (
        <div className="relative w-full">
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-primary-100 focus:outline-none"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={() => setIsOpen(true)}
                    {...props}
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle dropdown"
                >
                    <ChevronDownIcon className="w-5 h-5" />
                </button>
            </div>
            {isOpen && (
                <div className="absolute z-10 w-full py-1 mt-1 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-60">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item, index) => (
                            <div
                                key={index}
                                className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleItemClick(item)}
                            >
                                {item.label}
                            </div>
                        ))
                    ) : (
                        <span className="block px-4 py-2 text-gray-500 italic">
                            No results found
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}
