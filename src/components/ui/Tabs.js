import React from "react"

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
    return (
        <div className="flex gap-3 bg-gray-200 rounded-full w-fit p-2 text-black">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`px-3 py-1 ${
                        activeTab === tab ? "bg-white rounded-3xl" : ""
                    }`}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    )
}

export default Tabs
