"use client"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import CardWithInitials from "@/components/ui/CardWithInitials"
import StatusPill from "@/components/ui/StatusPill"
import {
    useApproveTakeoverMutation,
    useGetTurnoverDetailsMutation
} from "@/redux/api/hotoApi"
import {
    PRIMITIVE_INPUTS,
    SHIFT_TURNOVER_STATUSES,
    SHIFT_TURNOVER_STATUSES_COLORS
} from "@/utils/constants"
import { Check, Redo2, X } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function Page() {
    const { id } = useParams()
    const [getTurnoverDetails, { data: turnoverDetails, isLoading }] =
        useGetTurnoverDetailsMutation()

    const [approveTakeover] = useApproveTakeoverMutation()

    const [tabIndex, setTabIndex] = useState(0)

    useEffect(() => {
        if (id) {
            getTurnoverDetails({
                hotoId: id
            }).unwrap()
        }
    }, [id])

    const approveTakeoverHandler = () => {
        approveTakeover({
            hotoId: id
        })
            .unwrap()
            .then(() => {
                toast.success("Takeover Successful!")
            })
            .catch((err) => {
                console.log(err)
                toast.error("Takeover Failed!")
            })
            .finally(() => {
                getTurnoverDetails({
                    hotoId: id
                }).unwrap()
                setTabIndex(0)
            })
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!turnoverDetails || !turnoverDetails.data) {
        return <div>No data available</div>
    }
    const componentMap = {
        // three types static , CUSTOM_USER_BLOCK, TAB_FORM_BLOCK
        CUSTOM_USER_BLOCK: ({ title, value }) => {
            return (
                <div className="flex gap-4 items-start text-base text-slate-600 flex-col p-4 border rounded-lg w-[49%] last:ml-4">
                    <div>
                        <span className="font-bold text-black">{title} :</span>
                    </div>
                    <div className="flex w-full flex-col gap-3">
                        {value.map((e) => (
                            <div
                                className="w-full"
                                key={e.userId}
                            >
                                <CardWithInitials label={e?.userName}>
                                    <div className="flex flex-col justify-between items-start">
                                        <div className="text-lg font-semibold">
                                            {e?.userName}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {e?.userDepartment}
                                        </div>
                                    </div>
                                </CardWithInitials>
                            </div>
                        ))}
                    </div>
                </div>
            )
        },
        TAB_FORM_BLOCK: ({ value }) => {
            const [topicsTabIndex, setTopicsTabIndex] = useState(0)
            return (
                <>
                    <div className="w-full inline-flex gap-x-3">
                        {value.map((e, index) => (
                            <Button
                                variant={"custom"}
                                className={`rounded-lg items-center ${
                                    topicsTabIndex === index
                                        ? "border-none bg-primary-100 text-white"
                                        : "text-slate-500 border border-slate-300"
                                }`}
                                key={e.displayTabId}
                                onClick={() => setTopicsTabIndex(index)}
                            >
                                {e.displayTabLable}
                            </Button>
                        ))}
                    </div>
                    <div className="flex flex-col w-full py-1 overflow-auto h-[60vh]">
                        {value[topicsTabIndex].blockComponents.map(
                            (e, index) => (
                                <div
                                    key={index}
                                    className="border w-full py-4 px-6 rounded-lg flex flex-col min-h-96 gap-6 flex-wrap"
                                >
                                    {e.map((comp) => (
                                        <div
                                            key={comp.displayFiledName}
                                            className="flex w-1/2 gap-2"
                                        >
                                            <div className="flex w-1/3 font-semibold">
                                                {comp.displayLable}:
                                            </div>
                                            <div className="flex w-2/3">
                                                {comp.displayFiledName.includes(
                                                    "_status"
                                                ) ? (
                                                    <StatusPill
                                                        value={
                                                            comp.value || "NA"
                                                        }
                                                        className={
                                                            comp.value ===
                                                            "open"
                                                                ? "bg-green-100 text-green-600"
                                                                : comp.value ===
                                                                  "Closed"
                                                                ? "bg-red-100 text-red-600"
                                                                : "bg-yellow-100 text-yellow-600"
                                                        }
                                                    />
                                                ) : (
                                                    comp.value || "-"
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                </>
            )
        },
        IS_PRIMITIVE: ({ title, value }) => {
            return (
                <div className="flex gap-y-4 items-start text-base text-slate-600 w-1/3 flex-col pr-6">
                    <div className="flex items-center gap-3 w-full">
                        <span className="font-bold text-black w-1/2 text-wrap px-1.5">
                            {title} :
                        </span>
                        <div className="text-base text-gray-600 bg-gray-50 h-10 border w-1/2 flex items-center px-2 rounded-lg">
                            {value}
                        </div>
                    </div>
                </div>
            )
        }
    }

    const statusStyles = () => {
        const { tw_light_bg_color, tw_text_color } =
            SHIFT_TURNOVER_STATUSES_COLORS.find(
                (e) => turnoverDetails.data.status === e.status
            )
        return ` ${tw_light_bg_color} ${tw_text_color}`
    }

    return (
        <>
            <div className="w-full inline-flex my-4 justify-between">
                <div className="w-1/3 inline-flex gap-x-3">
                    {turnoverDetails?.data?.stepsDataUpdated.map((e, index) => (
                        <Button
                            variant={"custom"}
                            className={`rounded-lg items-center ${
                                tabIndex === index
                                    ? "border-none bg-primary-100 text-white"
                                    : "text-slate-500 border border-slate-300"
                            }`}
                            key={index}
                            onClick={() => setTabIndex(index)}
                        >
                            {e.stepName}
                        </Button>
                    ))}
                </div>
                <div className="inline-flex justify-center items-center gap-x-3 w-1/3">
                    <div>
                        <span className="font-bold text-black">Status : </span>
                        <StatusPill
                            value={SHIFT_TURNOVER_STATUSES[
                                turnoverDetails?.data?.status
                            ]
                                .replaceAll("_", " ")
                                .toLocaleLowerCase()}
                            className={` capitalize !${statusStyles()}`}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-x-3 w-1/3 justify-end">
                    {turnoverDetails?.data?.status ===
                        SHIFT_TURNOVER_STATUSES.HANDOVER_COMPLETED && (
                        <>
                            <Button
                                variant={"custom"}
                                className="text-green-600 bg-green-100 text-sm inline-flex items-center rounded-lg px-4"
                                onClick={approveTakeoverHandler}
                            >
                                <Check size={16} />
                                Accept
                            </Button>
                            <Button
                                variant={"custom"}
                                className="text-red-500 bg-red-100 text-sm inline-flex items-center rounded-lg px-4"
                            >
                                <X size={16} />
                                Reject
                            </Button>
                            <Button
                                variant={"custom"}
                                className="text-primary-75 bg-blue-100 text-sm inline-flex items-center rounded-lg px-4 w-max"
                            >
                                <Redo2 size={16} />
                                Return for Edit
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <Card>
                <div className="flex flex-wrap gap-y-4 w-full">
                    {turnoverDetails?.data?.stepsDataUpdated[
                        tabIndex
                    ]?.stepComponents?.map((element) => {
                        if (element.displayLable !== "Separator") {
                            const Component =
                                componentMap[
                                    PRIMITIVE_INPUTS.includes(
                                        element.displayInputElementType
                                    )
                                        ? "IS_PRIMITIVE"
                                        : element.displayInputElementType
                                ]
                            if (!Component) return null
                            return (
                                <Component
                                    key={element.displayFiledName}
                                    title={element.displayLable}
                                    value={
                                        PRIMITIVE_INPUTS.includes(
                                            element.displayInputElementType
                                        )
                                            ? element.value
                                            : element.values || element.value
                                    }
                                />
                            )
                        }
                        return null
                    })}
                </div>
            </Card>
        </>
    )
}
