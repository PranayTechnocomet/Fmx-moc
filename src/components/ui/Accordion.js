"use client"

import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

const Accordion = ({ title, children }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className="mt-4 ml-2">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full font-semibold mb-2"
            >
                <span className="text-primary-100">{title} </span>
                {open ? (
                    <ChevronUp
                        size={16}
                        color={"#157ac7"}
                    />
                ) : (
                    <ChevronDown
                        color={"#157ac7"}
                        size={16}
                    />
                )}
            </button>

            {open && children}
        </div>
    )
}

export default Accordion
