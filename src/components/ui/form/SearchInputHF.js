"use client"

import { ChevronDown, ChevronUp } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"

export default function SearchInputHF({
    items,
    selectedItems,
    onSelect,
    placeholder = "Search..."
}) {
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredItems, setFilteredItems] = useState(items)
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

    useEffect(() => {
        const filtered = items
            .filter(
                (item) =>
                    !selectedItems.some(
                        (selectedItem) => selectedItem.value === item.value
                    )
            )
            .filter((item) =>
                item.label.toLowerCase().includes(searchTerm.toLowerCase())
            )
        setFilteredItems(filtered)
    }, [searchTerm, items, selectedItems])

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value)
        setIsOpen(true)
    }

    const handleSelectItem = (item) => {
        onSelect(item)
        setSearchTerm("")
        setIsOpen(false)
    }

    return (
        <div
            className="relative w-full"
            ref={dropdownRef}
        >
            <div className="relative">
                <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={handleInputChange}
                    onClick={() => setIsOpen(true)}
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <ChevronUp className="w-5 h-5" />
                    ) : (
                        <ChevronDown className="w-5 h-5" />
                    )}
                </button>
            </div>
            {isOpen && (
                <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <li
                                key={item.value}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSelectItem(item)}
                            >
                                {item.label}
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-2 text-gray-500">
                            No results found
                        </li>
                    )}
                </ul>
            )}
        </div>
    )
}
