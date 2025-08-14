import AnalyticsTableView from "@/components/takeover/AnalyticsTableView"
import Button from "@/components/ui/Button"
import Container from "@/components/ui/Container"
import InputField from "@/components/ui/form/Input"
import SingleSelect from "@/components/ui/form/SingleSelect"
import { DownloadIcon } from "lucide-react"
import React, { useState } from "react"

const Analytics = ({ register, formState, control }) => {
    const [filter, setFilter] = useState({
        query: "",
        from_date: "",
        till_date: "",
        service_type: "",
        group_name: "",
        daily_task: ""
    })

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilter((prevFilter) => ({
            ...prevFilter,
            [name]: value
        }))
    }
    return (
        <Container
            className={
                "p-4 bg-white space-y-4 flex flex-col min-h-fit h-max overflow-auto"
            }
        >
            <div className="flex gap-4">
                <InputField
                    onChange={handleFilterChange}
                    value={filter.query}
                    name="query"
                    placeholder="Search"
                    className="w-full"
                />
                <InputField
                    onChange={handleFilterChange}
                    value={filter.from_date}
                    name="from_date"
                    type="date"
                    placeholder="From Date"
                    className="w-full"
                />
                <InputField
                    onChange={handleFilterChange}
                    value={filter.till_date}
                    name="till_date"
                    type="date"
                    placeholder="Till Date"
                    className="w-full"
                />
                <SingleSelect
                    onChange={handleFilterChange}
                    value={filter.service_type}
                    name="service_type"
                    placeholder="Service Type"
                    options={[]}
                />
                <SingleSelect
                    onChange={handleFilterChange}
                    value={filter.group_name}
                    name="group_name"
                    placeholder="Group Name"
                    options={[]}
                />
                <SingleSelect
                    onChange={handleFilterChange}
                    value={filter.daily_task}
                    name="daily_task"
                    placeholder="Daily Task"
                    options={[]}
                />
                <Button
                    variant="secondary"
                    className={"flex items-center font-semibold text-sm"}
                >
                    <DownloadIcon className="w-4 h-auto mr-1" />
                    Export
                </Button>
            </div>
            <AnalyticsTableView />

            <textarea
                id="analytics_remark"
                {...register("analytics_remark")}
                className="w-full h-24 border py-2 px-4"
                placeholder="Enter Remarks / Special Instructions"
            />
        </Container>
    )
}

export default Analytics
