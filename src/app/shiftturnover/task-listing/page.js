"use client"

import TaskTableView from "@/components/takeover/TaskTableView"
import StatusCard from "@/components/ui/StatusCard"

export default function Page() {
    return (
        <>
            <div className="flex gap-x-5 my-2.5">
                {[
                    {
                        status: "Total",
                        color: "bg-primary-100",
                        text: "text-primary-100"
                    },
                    {
                        status: "Open",
                        color: "bg-teal-500",
                        text: "text-teal-500"
                    },
                    {
                        status: "Closed",
                        color: "bg-red-600",
                        text: "text-red-600"
                    }
                ].map(({ color, text, status }) => (
                    <StatusCard
                        key={status}
                        title={status}
                        number={100}
                        onClick={() => {}}
                        strip_color={color}
                        title_color={text}
                        cardStyles="h-20"
                    />
                ))}
            </div>
            <div className="gap-y-6 h-screen overflow-y-hidden flex flex-col pt-2">
                <TaskTableView />
            </div>
        </>
    )
}
