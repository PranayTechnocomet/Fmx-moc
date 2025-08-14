import React from "react"

const DefaultTab = ({ tabs, activeTab, setActiveTab }) => {
    return (
        <div className="flex gap-3 w-fit p-2 text-blue-800 font-semibold">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`px-3 py-1 ${activeTab === tab ? "border-b-[3px] border-b-blue-800" : "text-gray-500 border-b-[3px] border-transparent"
                        }`}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>)
}

export default DefaultTab
