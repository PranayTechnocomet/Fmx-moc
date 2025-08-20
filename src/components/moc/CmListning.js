"use client"

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table"
import { EyeIcon, FileText, Search } from "lucide-react"
import React, { useEffect, useState } from "react"

import InputField from "../ui/form/Input"
import SingleSelect from "../ui/form/SingleSelect"
import Modal from "../ui/overlays/Modal"
import StatusPill from "../ui/StatusPill"
import StatusCard from "../ui/StatusCard"
import Button from "../ui/Button"
import { CM_LIST_STATUSES, RETURNED_STATUS } from "@/utils/constants"
import { useSelector } from "react-redux"
import Switch from "../ui/form/Switch"
import MultiSelect from "../ui/form/MultiSelect"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { RenderTableRow } from "../ui/table/RenderTableRow"
import { useGetCmListMutation } from "@/redux/api/MocApis"
import { useHierarchy } from "@/hooks/useHierarchy"

const columnHelper = createColumnHelper()

const getColumns = (apiResponse = [], showReturnAllColumn = false) => {
    return apiResponse.map((col) => {
        return columnHelper.accessor(col.key, {
            id: col.key, // unique identifier for column
            header: () => col.label || "", // show label from API
            cell: (info) => {
                // Handle NA or special cases
                if (col.key === "NA") {
                    return <span>-</span>
                }
                if (col.key === "status") {
                    return (
                        <span className="font-semibold">{info.getValue()}</span>
                    )
                }
                if (col.key === "action") {
                    return (
                        <Button
                            variant="secondary"
                            className="font-semibold rounded-lg flex items-center justify-center"
                        >
                            View
                        </Button>
                    )
                }
                return info.getValue()
            },
            size: "auto" // default size, adjust if needed
        })
    })
}

const CmListning = () => {
    const showReturnAllColumn = useSelector(
        (state) => state.getGatePass.showReturnAllColumn
    )
    const [showFiltersModal, setShowFiltersModal] = useState(false)
    const [getCmList] = useGetCmListMutation()
    const [columnList, setColumnList] = useState([])
    const [data, setData] = useState([])
    const [rowList, setRowList] = useState([])
    const [counts, setCounts] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [paginatedData, setPaginatedData] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [recordsPerPage, setRecordsPerPage] = useState(10)
    const [actionModalIndex, setActionModalIndex] = useState(null)
    const { selectedSite, clusters } = useHierarchy()
    const [sites, setSites] = useState([])
    const router = useRouter()

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })
    const initialFilter = {
        from_date: "",
        to_date: "",
        complex: "",
        site: "",
        building: "",
        day: "",
        status: "",
        search: "",
        column: ""
    }
    const [filters, setFilters] = useState(initialFilter)
    console.log("clusters", clusters)

    // const columns = getColumns(showReturnAllColumn)
    const columns = getColumns(columnList)
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination
        },
        defaultColumn: {
            size: 200, //starting column size
            minSize: 50, //enforced during column resizing
            maxSize: 500 //enforced during column resizing
        }
    })

    const closeModal = () => {
        setShowFiltersModal(false)
    }

    const handleFileChange = (event) => {
        setFilters({ ...filters })
    }

    const fetchList = async () => {
        const response = await getCmList(filters)
        console.log("response", response)
        setData(response.data)
        setColumnList(response.data?.mocColumnsList)
        setRowList(response.data?.data)
        setCounts(response.data?.counts)
        setTotalPages(Math.ceil(response.data?.data?.length / recordsPerPage))
        setPaginatedData(
            response.data?.data.slice(
                (currentPage - 1) * recordsPerPage,
                currentPage * recordsPerPage
            )
        )
    }
    useEffect(() => {
        fetchList()
    }, [selectedSite, filters.status])

    const handleApplyFilter = () => {
        fetchList()
    }

    const handleClusterChange = (selectedOptions) => {
        // If no options are selected, reset sites and return
        if (!selectedOptions || selectedOptions.length === 0) {
            setFilters({ ...filters, complex: [] })
            setSites([])
            return
        }

        // Update filters with the new selected values
        setFilters({ ...filters, complex: selectedOptions })

        // Extract selected cluster IDs
        const selectedClusterIds = selectedOptions.map((option) => option.value)

        // Filter clusters based on selected IDs
        const matchingClusters = clusters.filter((cluster) =>
            selectedClusterIds.includes(cluster.id)
        )

        // Update sites with the matching clusters
        setSites(matchingClusters)

        console.log("selectedOptions", selectedOptions)
        console.log("matchingClusters", matchingClusters)
    }

    const handleSiteChange = (value) => {
        setFilters({ ...filters, site: value })
    }

    const generatePageNumbers = () => {
        const pages = []
        if (totalPages <= 6) {
            for (let i = 1; i <= totalPages; i++) pages?.push(i)
        } else {
            if (currentPage <= 3) {
                pages?.push(1, 2, 3, "...", totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages?.push(
                    1,
                    "...",
                    totalPages - 2,
                    totalPages - 1,
                    totalPages
                )
            } else {
                pages?.push(
                    1,
                    "...",
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    "...",
                    totalPages
                )
            }
        }
        return pages
    }

    console.log("filters", filters)
    console.log("sites", sites)

    const handleViewDetails = (row) => {
        console.log("row", row)
        router.push(`/createChangeRequest/cm-listing/${row.mocId}`)
    }

    return (
        <>
            <div className="h-screen pb-20 overflow-y-auto rounded-lg">
                <div
                    className={
                        "flex w-full gap-x-3 bg-white p-4 rounded-lg h-20 place-items-center justify-between"
                    }
                >
                    <MultiSelect
                        selectStyle=" h-12 "
                        className="!w-2/12"
                        options={clusters.map((cluster) => ({
                            label: cluster.name,
                            value: cluster.id
                        }))}
                        value={filters.complex}
                        onChange={(value) => {
                            handleClusterChange(value)
                        }}
                        placeholder={"Complex"}
                    />

                    <MultiSelect
                        selectStyle=" h-12 "
                        className="!w-2/12"
                        options={sites.map((site) => ({
                            label: site.name,
                            value: site.id
                        }))}
                        value={filters.site}
                        onChange={(value) =>
                            setFilters({ ...filters, site: value })
                        }
                        placeholder={"Building"}
                    />

                    <InputField
                        type="date"
                        inputContainerStyle="h-12"
                        className=" !w-2/12"
                        value={filters.from_date}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                from_date: e.target.value
                            })
                        }
                        placeholder={"From Date*"}
                    />
                    <InputField
                        type="date"
                        className=" !w-2/12"
                        inputContainerStyle="h-12"
                        value={filters.to_date}
                        onChange={(e) =>
                            setFilters({ ...filters, to_date: e.target.value })
                        }
                        placeholder={"To Date*"}
                    />
                    {/* <SingleSelect
                        selectStyle=" h-12 "
                        className="!w-2/12"
                        options={[
                            { label: "Ascending", value: "Ascending" },
                            { label: "Descending", value: "Descending" }
                        ]}
                        value={filters.site}
                        onChange={(value) =>
                            setFilters({ ...filters, site: value })
                        }
                        placeholder={"Today"}
                    /> */}
                    <Button
                        variant="transparent"
                        className={`border-0`}
                        onClick={() => setFilters(initialFilter)}
                    >
                        Reset
                    </Button>
                    <Button
                        variant="secondary"
                        className={`text-nowrap`}
                        onClick={handleApplyFilter}
                    >
                        Apply Filter
                    </Button>
                </div>
                <div className="flex gap-x-3 my-2.5 ">
                    {Object.entries(counts).map(([key, number]) => {
                        const statusConfig = Object.values(
                            CM_LIST_STATUSES
                        ).find((s) => s.key === key)

                        if (!statusConfig) return null // skip if not defined in enum

                        return (
                            <StatusCard
                                key={statusConfig.key}
                                title={statusConfig.status}
                                number={number}
                                onClick={() => {
                                    setFilters({
                                        ...filters,
                                        status: statusConfig.key
                                    })
                                }}
                                strip_color={statusConfig.color}
                                title_color={statusConfig.text}
                                cardStyles="h-22 hover:scale-[1.05] transition-transform"
                            />
                        )
                    })}
                </div>
                <div
                    className={
                        "flex w-full gap-x-3 bg-white p-4 rounded-lg h-20 place-items-center justify-between"
                    }
                >
                    <InputField
                        type="search"
                        placeholder="Search"
                        icon={() => (
                            <Search
                                className="w-4"
                                color="gray"
                            />
                        )}
                        className="!w-4/12 rounded-lg"
                        value={filters.search}
                        inputContainerStyle="!px-3 py-1"
                        onChange={(e) =>
                            setFilters({ ...filters, search: e.target.value })
                        }
                    />

                    <SingleSelect
                        selectStyle=" h-12 "
                        className="!w-2/12"
                        options={[
                            { label: "Ascending", value: "Ascending" },
                            { label: "Descending", value: "Descending" }
                        ]}
                        value={filters.site}
                        onChange={(value) =>
                            setFilters({ ...filters, site: value })
                        }
                        placeholder={"Sort By"}
                    />
                    <SingleSelect
                        selectStyle=" h-12 "
                        className="!w-2/12"
                        options={[
                            { label: "Asset Type", value: "Asset Type" },
                            { label: "Asset Name", value: "Asset Name" },
                            { label: "Model", value: "Model" },
                            { label: "HSN Code", value: "HSN Code" },
                            { label: "Service Tag", value: "Service Tag" },
                            { label: "Description", value: "Description" },
                            { label: "Remarks", value: "Remarks" },
                            { label: "Value", value: "Value" },
                            { label: "Quantity", value: "Quantity" },
                            { label: "Attachment", value: "Attachment" },
                            { label: "Status", value: "Status" }
                        ]}
                        value={filters.column}
                        onChange={(value) =>
                            setFilters({ ...filters, column: value })
                        }
                        placeholder={"Columns"}
                    />
                    <Button variant="secondary">Export</Button>
                </div>
                <table className="min-w-full border border-slate-200">
                    {/* Table Head */}
                    <thead className="bg-slate-100">
                        <tr>
                            {columnList.map((col, idx) => (
                                <th
                                    key={idx}
                                    style={{ width: col.size }}
                                    className="p-3 text-left text-sm font-semibold text-slate-700"
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {paginatedData.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="border-b border-slate-100 bg-white hover:bg-gray-100 cursor-pointer"
                            >
                                {columnList.map((col, colIndex) => (
                                    <RenderTableRow
                                        key={`${rowIndex}-${colIndex}`} // ✅ unique key here
                                        row={row}
                                        col={col}
                                        rowIndex={rowIndex}
                                        colIndex={colIndex}
                                        currentPage={currentPage}
                                        recordsPerPage={recordsPerPage}
                                        actionModalIndex={actionModalIndex}
                                        setActionModalIndex={
                                            setActionModalIndex
                                        }
                                        handleViewDetails={handleViewDetails}
                                    />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex items-end justify-between p-4 rounded-br-lg rounded-bl-lg bg-white">
                    <div className="flex space-x-2">
                        {generatePageNumbers()?.map((page, idx) =>
                            page === "..." ? (
                                <span
                                    key={`ellipsis-${idx}`}
                                    className="px-3 py-2 text-gray-500"
                                >
                                    ...
                                </span>
                            ) : (
                                <Button
                                    key={`page-${page}-${idx}`}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-0 rounded ${
                                        currentPage === page
                                            ? "bg-primary-100 text-white"
                                            : "border"
                                    }`}
                                >
                                    {page}
                                </Button>
                            )
                        )}
                    </div>
                    <div>
                        <Button
                            variant=""
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className={`inline-flex min-w-fit items-center rounded-lg ms-2 ${
                                currentPage === 1 ? "" : "bg-[#F3F4FB] border-0"
                            }`}
                        >
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.13309 0.235012C8.81974 -0.0783373 8.31455 -0.0783373 8.0012 0.235012L2.68705 5.54916C2.43765 5.79856 2.43765 6.20144 2.68705 6.45084L8.0012 11.765C8.31455 12.0783 8.81974 12.0783 9.13309 11.765C9.44644 11.4516 9.44644 10.9464 9.13309 10.6331L4.5032 5.9968L9.13949 1.36051C9.44644 1.05356 9.44644 0.541966 9.13309 0.235012Z"
                                    fill={`${
                                        currentPage === 1
                                            ? "#B8BABC"
                                            : "#153AC7"
                                    }`}
                                />
                            </svg>
                            <span
                                className={`ml-2 ${
                                    currentPage === 1
                                        ? "text-gray-400"
                                        : "text-[#153AC7]"
                                }`}
                            >
                                Previous
                            </span>
                        </Button>
                        <Button
                            variant=""
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className={`inline-flex min-w-fit items-center rounded-lg ms-2 ${
                                currentPage === totalPages
                                    ? ""
                                    : "bg-[#F3F4FB] border-0"
                            }`}
                        >
                            <span
                                className={`mr-2 ${
                                    currentPage === totalPages
                                        ? "text-gray-400"
                                        : "text-[#153AC7]"
                                }`}
                            >
                                Next
                            </span>
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2.73582 11.765C3.04917 12.0783 3.55436 12.0783 3.86771 11.765L9.18186 6.45084C9.43126 6.20144 9.43126 5.79856 9.18186 5.54916L3.86771 0.235012C3.55436 -0.0783373 3.04917 -0.0783373 2.73582 0.235012C2.42247 0.548361 2.42247 1.05356 2.73582 1.36691L7.36571 6.0032L2.72942 10.6395C2.42247 10.9464 2.42247 11.458 2.73582 11.765Z"
                                    fill={`${
                                        currentPage === totalPages
                                            ? "#B8BABC"
                                            : "#153AC7"
                                    }`}
                                />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={showFiltersModal}
                onClose={closeModal}
            ></Modal>
        </>
    )
}

export default CmListning
