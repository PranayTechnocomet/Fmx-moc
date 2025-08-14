import { useRef, useState } from "react"

import Popover from "../overlays/Popover"

const TagColors = [
    "bg-red-200 text-red-800 capitalize",
    "bg-yellow-200 text-yellow-800 capitalize",
    "bg-green-200 text-green-800 capitalize",
    "bg-blue-200 text-blue-800 capitalize",
    "bg-blue-200 text-blue-800 capitalize",
    "bg-purple-200 text-purple-800 capitalize",
    "bg-pink-200 text-pink-800 capitalize",
    "bg-gray-200 text-gray-800 capitalize",
    "bg-teal-200 text-teal-800 capitalize",
    "bg-orange-200 text-orange-800 capitalize",
    "bg-cyan-200 text-cyan-800 capitalize",
    "bg-lime-200 text-lime-800 capitalize",
    "bg-amber-200 text-amber-800 capitalize",
    "bg-violet-200 text-violet-800 capitalize",
    "bg-fuchsia-200 text-fuchsia-800 capitalize",
    "bg-rose-200 text-rose-800 capitalize",
    "bg-sky-200 text-sky-800 capitalize",
    "bg-emerald-200 text-emerald-800 capitalize",
    "bg-zinc-200 text-zinc-800 capitalize",
    "bg-stone-200 text-stone-800 capitalize",
    "bg-neutral-200 text-neutral-800 capitalize",
    "bg-light-200 text-light-800 capitalize"
]

const TagInput = ({ list, selected, setTags }) => {
    const [inputValue, setInputValue] = useState("")
    const inputRef = useRef(null)

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const addTag = (tag) => {
        if (!selected.includes(tag)) {
            setTags([...selected, tag])
        }
        setInputValue("")
    }

    const removeTag = (tagToRemove) => {
        setTags(selected.filter((tag) => tag !== tagToRemove))
    }

    const handleInputKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim()) {
            e.preventDefault()
            addTag(inputValue.trim())
        } else if (
            e.key === "Backspace" &&
            !inputValue &&
            selected.length > 0
        ) {
            removeTag(selected[selected.length - 1])
        }
    }

    const availableList = list.filter((item) => !selected.includes(item))

    return (
        <Popover
            trigger={
                <div className="flex flex-wrap items-center w-full p-1 border rounded-md focus-within:ring-1 focus-within:ring-primary-100">
                    {selected.map((tag, index) => (
                        <span
                            key={tag}
                            className={
                                "flex items-center px-2 py-1 m-1 text-sm rounded-full " +
                                //randomize color
                                TagColors[index]
                            }
                        >
                            {tag}
                            <button
                                onClick={() => removeTag(tag)}
                                className="ml-1 text-blue-600 hover:text-blue-800"
                            >
                                &times;
                            </button>
                        </span>
                    ))}
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        placeholder={selected.length === 0 ? "Add tags..." : ""}
                        className="flex-grow p-1 text-sm bg-transparent outline-none"
                    />
                </div>
            }
            handlePopoverClose={availableList.length === 0}
        >
            {
                <div className="overflow-y-auto max-h-60">
                    {availableList.map((item, index) => (
                        <span
                            key={item}
                            onClick={() => addTag(item)}
                            className={
                                "flex items-center w-fit px-4 py-2 m-1 text-sm rounded-full " +
                                //randomize color
                                TagColors[
                                    (index + selected.length) % TagColors.length
                                ]
                            }
                        >
                            {item}
                        </span>
                    ))}
                </div>
            }
        </Popover>
    )
}

export default TagInput
