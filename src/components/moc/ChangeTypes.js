"use client"

import Card from "../ui/Card"
import Button from "../ui/Button"
import { Building, Shield } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { CardContent } from "../ui/CardContent"
import Image from "next/image"
import StandardChangeIcon from "../../icons/standard_change.png"
import NonStandardChangeIcon from "../../icons/non_standard_change_icon.png"
import { setSelectedRequestType } from "@/redux/slices/mocSlice"
import ClientPassForm from "../gatePass/ClientPassForm"
import ChangeManagementForm from "./ChangeManagementForm"
import TestForm from "./Test"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useGetListMutation } from "@/redux/api/MocApis"
import MocForm from "./MocForm"


export default function ChangeTypes() {
    const selectedRequestType = useSelector(
        (state) => state.moc.selectedRequestType
    )
    const dispatch = useDispatch()
    const router = useRouter()
    const params = useSearchParams()
    const [getList] = useGetListMutation()
    const [list, setList] = useState([])

    useEffect(() => {
        if (params.get("formId")) {
            dispatch(setSelectedRequestType(params.get("formId")))
        }
    }, [])
    const handleRequestTypeSelect = (typeId) => {
        dispatch(setSelectedRequestType(typeId))
        router.push(`/createChangeRequest?formId=${typeId}`)
    }

    useEffect(() => {
        const fetchList = async () => {
            const response = await getList()
            setList(response.data)
        }
        fetchList()
    }, [])

    console.log("list",list?.data);
    
    const requestTypes = [
        {
            id: "4744bf1d-d818-4722-9dc4-f008fc50a83f",
            title: "Standard Change Request",
            description:
                "Choose this option to for planned, low-risk changes with predefined procedures and approvals.",
            image: StandardChangeIcon
        },
        {
            id: "4744bf1d-d818-4722-9dc4-f008fc50a94e",
            title: "Normal Change Request",
            description:
                "Choose this option to for planned, low-risk changes with predefined procedures and approvals.",
            image: StandardChangeIcon
        },
        {
            id: "4744bf1d-d818-4722-9dc4-f008fc50a84f",
            title: "Emergency Change Request",
            description:
                "Choose this option to for complex, high-impact changes that fall outside routine procedures and require extensive review and risk mitigation.",
            image: NonStandardChangeIcon
        }
    ]

    console.log("selectedRequestType",selectedRequestType);
    

    if (selectedRequestType) {
        // return <TestForm formId={selectedRequestType} />
        return <MocForm formId={selectedRequestType} />
    }

    return (
        <div className="w-full my-4 ">
            <Card className="pt-0">
                <h2 className="text-xl font-semibold">Change Request Types</h2>
                <p className="text-sm text-gray-500 mb-6">
                    Select change request types
                </p>

                <div className="flex w-full gap-6">
                    {list?.data?.map((type, index) => (
                        <div
                            key={index}
                            className="w-full cursor-pointer transition-all p-6 rounded-xl border border-gray-300 bg-white shadow-md group hover:border-blue-800 hover:bg-gray-100"
                            onClick={() => handleRequestTypeSelect(type.mocConfigId)}
                        >
                            <CardContent className="p-6 text-center">
                                {/* <div className="rounded-full p-3 mx-auto mb-2 w-28 group-hover:bg-blue-800"> */}
                                <img
                                    src={type.icon}
                                    alt={'type.title'}
                                    width={600}
                                    height={600}
                                    className="w-16 mx-auto text-blue-600"
                                />
                                {/* </div> */}
                                <h3 className="font-semibold text-center text-lg my-2 text-gray-900 group-hover:text-gray-900">
                                    {type.mocName}
                                </h3>
                                <p className="text-md text-gray-500 text-center my-2 ">
                                    {type.description}
                                </p>
                            </CardContent>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}
