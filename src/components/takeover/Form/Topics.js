"use client"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Container from "@/components/ui/Container"
import InputField from "@/components/ui/form/Input"
import SelectHF from "@/components/ui/form/SelectHF"
import {
    ABNORMALITY_TYPES,
    ACTIVITIES_PRIORITIES,
    ACTIVITIES_TYPES,
    INCIDENT_CLASSIFICATIONS,
    INCIDENT_TYPES,
    STATUS,
    TAB_TOPICS
} from "@/utils/constants"
import React, { useState } from "react"
import { useFieldArray } from "react-hook-form"

export default function Topics({ register, formState, control }) {
    const [tabTopic, setTabTopic] = useState(TAB_TOPICS.ABNORMALITY)

    const {
        fields: incident_fields,
        append: incident_append,
        remove: incident_remove
    } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormProvider)
        name: "incidents" // unique name for your Field Array
    })
    const {
        fields: abnormality_fields,
        append: abnormality_append,
        remove: abnormality_remove
    } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormProvider)
        name: "abnormalities" // unique name for your Field Array
    })
    const {
        fields: activities_fields,
        append: activities_append,
        remove: activities_remove
    } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormProvider)
        name: "activities" // unique name for your Field Array
    })

    const addTopic = (topic) => {
        switch (topic) {
            case TAB_TOPICS.INCIDENT:
                incident_append({
                    incident_type: INCIDENT_TYPES.ACCIDENT,
                    status: STATUS.OPEN,
                    description: "",
                    comments: "",
                    classification: INCIDENT_CLASSIFICATIONS.NA,
                    ticketno: ""
                })
                return
            case TAB_TOPICS.ABNORMALITY:
                abnormality_append({
                    abnormality_type: ABNORMALITY_TYPES.OPERATION,
                    status: STATUS.OPEN,
                    description: "",
                    comments: "",
                    count: ""
                })
                return
            case TAB_TOPICS.ACTIVITIES:
                activities_append({
                    activity_type: ACTIVITIES_TYPES.ONGOING,
                    status: STATUS.OPEN,
                    description: "",
                    comments: "",
                    priority: ""
                })
                return
            default:
                return
        }
    }
    //TODO: reset form question
    const reset = () => {}

    // return <div className="flex"></div>

    return (
        <div className="flex relative gap-6 h-full overflow-y-hidden w-full justify-center">
            <Container className="ml-auto h-fit rounded-xl flex justify-evenly flex-col sticky w-[21%] bg-white mt-12 text-sm font-semibold hover:cursor-pointer">
                <div
                    className={`flex p-6 border-b h-full ${
                        tabTopic === TAB_TOPICS.INCIDENT
                            ? "bg-blue-50 text-primary-100"
                            : ""
                    }`}
                    onClick={() => setTabTopic(TAB_TOPICS.INCIDENT)}
                >
                    <span>Incident</span>
                    {true && (
                        <span className="text-xs ml-auto ">1 task pending</span>
                    )}
                </div>
                <div
                    className={`flex p-6 border-b h-full ${
                        tabTopic === TAB_TOPICS.ABNORMALITY
                            ? "bg-blue-50 text-primary-100"
                            : ""
                    }`}
                    onClick={() => setTabTopic(TAB_TOPICS.ABNORMALITY)}
                >
                    <span>Abnormality</span>
                    {true && (
                        <span className="text-xs ml-auto ">1 task pending</span>
                    )}
                </div>
                <div
                    className={`flex p-6 h-full ${
                        tabTopic === TAB_TOPICS.ACTIVITIES
                            ? "bg-blue-50 text-primary-100"
                            : ""
                    }`}
                    onClick={() => setTabTopic(TAB_TOPICS.ACTIVITIES)}
                >
                    <span>Activities</span>
                    {true && (
                        <span className="text-xs ml-auto ">1 task pending</span>
                    )}
                </div>
            </Container>
            <div className="w-full flex flex-col gap-4 pb-3 flex-1 h-full">
                <div className="flex flex-col justify-between items-end h-full">
                    <div className="flex justify-between pb-2 w-[830px] self-start">
                        <h3 className="font-bold text-xl">Topics</h3>
                        <Container className="bg-white px-3 py-0.5 flex items-center gap-2">
                            <div className="bg-blue-200 h-3 w-3 border border-blue-300 rounded-sm" />
                            <span>Pending tasks from prior handover</span>
                        </Container>
                    </div>

                    <div className="w-full overflow-y-auto flex self-start">
                        {tabTopic === TAB_TOPICS.INCIDENT && (
                            <Card
                                title={"Incident"}
                                className="w-[830px] h-fit space-y-4"
                            >
                                {incident_fields.map((field, index) => (
                                    <div
                                        className="border-b py-6 space-y-4"
                                        key={field.id}
                                    >
                                        <div className="flex items-center w-full justify-stretch">
                                            <label
                                                htmlFor="type"
                                                className="block w-2/5 text-sm font-medium text-gray-600 px-1"
                                            >
                                                Incident (Facility Incident/
                                                Accident / Near Miss):
                                            </label>
                                            <SelectHF
                                                id={field.id}
                                                name={`incidents.${index}.type`}
                                                options={Object.values(
                                                    INCIDENT_TYPES
                                                )}
                                                register={register}
                                                placeholder="Select Incident"
                                            />
                                        </div>
                                        <div className="flex items-center w-full justify-stretch">
                                            <label
                                                htmlFor="ticketno"
                                                className="block w-2/5 text-sm font-medium text-gray-600"
                                            >
                                                Ticket No.:
                                            </label>
                                            <InputField
                                                id={field.id}
                                                {...register(
                                                    `incidents.${index}.ticketno`
                                                )}
                                                className="block w-full mt-1"
                                            />
                                        </div>
                                        <div className="flex items-center w-full justify-stretch">
                                            <label
                                                htmlFor="classification"
                                                className="block w-2/5 text-sm font-medium text-gray-600"
                                            >
                                                Classification:
                                            </label>
                                            <SelectHF
                                                id="classification"
                                                name={`incidents.${index}.classification`}
                                                options={Object.values(
                                                    INCIDENT_CLASSIFICATIONS
                                                )}
                                                register={register}
                                                placeholder="Select Classification"
                                            />
                                        </div>
                                        <div className="flex items-start w-full justify-stretch">
                                            <label
                                                htmlFor="description"
                                                className="block w-2/5 text-sm font-medium text-gray-600 pt-2"
                                            >
                                                Incident Description:
                                            </label>
                                            <textarea
                                                id="description"
                                                name={`incidents.${index}.description`}
                                                {...register(
                                                    `incidents.${index}.description`
                                                )}
                                                className="w-full h-24 border rounded-lg p-2"
                                                placeholder="Enter Incident Description"
                                            />
                                        </div>

                                        <div className="flex items-start">
                                            <label
                                                className="block w-2/5 text-sm font-medium text-gray-600 pt-2"
                                                htmlFor="comments"
                                            >
                                                Comments / Related information
                                                to review:
                                            </label>
                                            <div className="flex w-full gap-4">
                                                <textarea
                                                    id="comments"
                                                    name={`incidents.${index}.comments`}
                                                    {...register(
                                                        `incidents.${index}.comments`
                                                    )}
                                                    className="w-full h-24 border rounded-lg p-2"
                                                    placeholder="Enter Comments / Related information to review"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center w-full justify-stretch">
                                            <label
                                                htmlFor="status"
                                                className="block w-2/5 text-sm font-medium text-gray-600"
                                            >
                                                Status:
                                            </label>
                                            <SelectHF
                                                id="status"
                                                name={`incidents.${index}.status`}
                                                options={Object.values(STATUS)}
                                                register={register}
                                                placeholder="Select Status"
                                            />
                                        </div>
                                    </div>
                                ))}
                                <Button
                                    variant="tertiary"
                                    className={
                                        " rouneded-lg !text-gray-500 font-semibold text-sm px-4 py-2.5"
                                    }
                                    onClick={() =>
                                        addTopic(TAB_TOPICS.INCIDENT)
                                    }
                                >
                                    + Add Incident
                                </Button>
                            </Card>
                        )}

                        {tabTopic === TAB_TOPICS.ABNORMALITY && (
                            <Card
                                title={"Abnormality"}
                                className="w-[830px] h-fit space-y-4"
                            >
                                {abnormality_fields.map((field, index) => (
                                    <div
                                        className="border-b py-6 space-y-4"
                                        key={field.id}
                                    >
                                        <div className="flex items-center w-full justify-stretch">
                                            <label className="block w-2/5 text-sm font-medium text-gray-600 px-1">
                                                Abnormality (Facility /
                                                Operation / Others):
                                            </label>
                                            <SelectHF
                                                id="type"
                                                name={`abnormalities.${index}.type`}
                                                options={Object.values(
                                                    ABNORMALITY_TYPES
                                                )}
                                                register={register}
                                                placeholder="Select Abnormality"
                                            />
                                        </div>
                                        <div className="flex items-center w-full justify-stretch">
                                            <label className="block w-2/5 text-sm font-medium text-gray-600">
                                                Count:
                                            </label>
                                            <InputField
                                                id="count"
                                                {...register(
                                                    `abnormalities.${index}.count`
                                                )}
                                                className="block w-full mt-1"
                                            />
                                        </div>
                                        <div className="flex items-start w-full justify-stretch">
                                            <label className="block w-2/5 text-sm font-medium text-gray-600 pt-2">
                                                Abnormality Description:
                                            </label>
                                            <textarea
                                                id="description"
                                                name={`abnormalities.${index}.description`}
                                                {...register(
                                                    `abnormalities.${index}.description`
                                                )}
                                                className="w-full h-24 border rounded-lg p-2"
                                                placeholder="Enter Incident Description"
                                            />
                                        </div>

                                        <div className="flex items-start">
                                            <label
                                                className="block w-2/5 text-sm font-medium text-gray-600 pt-2"
                                                htmlFor="comments"
                                            >
                                                Comments / Related information
                                                to review:
                                            </label>
                                            <div className="flex w-full gap-4">
                                                <textarea
                                                    id="comments"
                                                    name={`abnormalities.${index}.comments`}
                                                    {...register(
                                                        `abnormalities.${index}.comments`
                                                    )}
                                                    className="w-full h-24 border rounded-lg p-2"
                                                    placeholder="Enter Comments / Related information to review"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center w-full justify-stretch">
                                            <label
                                                htmlFor="status"
                                                className="block w-2/5 text-sm font-medium text-gray-600"
                                            >
                                                Status:
                                            </label>
                                            <SelectHF
                                                id="status"
                                                name={`abnormalities.${index}.status`}
                                                options={Object.values(STATUS)}
                                                register={register}
                                                placeholder="Select Status"
                                            />
                                        </div>
                                    </div>
                                ))}
                                <Button
                                    variant="tertiary"
                                    className={
                                        " rouneded-lg !text-gray-500 font-semibold text-sm px-4 py-2.5"
                                    }
                                    onClick={() =>
                                        addTopic(TAB_TOPICS.ABNORMALITY)
                                    }
                                >
                                    + Add Abnormality
                                </Button>
                            </Card>
                        )}

                        {tabTopic === TAB_TOPICS.ACTIVITIES && (
                            <Card
                                title={"Activities"}
                                className="w-[830px] h-fit space-y-4"
                            >
                                {activities_fields.map((field, index) => (
                                    <div
                                        className="border-b py-6 space-y-4"
                                        key={field.id}
                                    >
                                        <div className="flex items-center w-full justify-stretch">
                                            <label
                                                htmlFor="type"
                                                className="block w-2/5 text-sm font-medium text-gray-600 px-1"
                                            >
                                                Activities (Ongoing / Planned /
                                                Customer Related):
                                            </label>
                                            <SelectHF
                                                id={field.id}
                                                name={`activities.${index}.type`}
                                                options={Object.values(
                                                    ACTIVITIES_TYPES
                                                )}
                                                register={register}
                                                placeholder="Select Activities"
                                            />
                                        </div>
                                        <div className="flex items-center w-full justify-stretch">
                                            <label
                                                htmlFor="priority"
                                                className="block w-2/5 text-sm font-medium text-gray-600"
                                            >
                                                Classification:
                                            </label>
                                            <SelectHF
                                                id="priority"
                                                name={`activities.${index}.priority`}
                                                options={Object.values(
                                                    ACTIVITIES_PRIORITIES
                                                )}
                                                register={register}
                                                placeholder="Select priority"
                                            />
                                        </div>
                                        <div className="flex items-start w-full justify-stretch">
                                            <label
                                                htmlFor="description"
                                                className="block w-2/5 text-sm font-medium text-gray-600 pt-2"
                                            >
                                                Activity Description:
                                            </label>
                                            <textarea
                                                id="description"
                                                name={`activities.${index}.description`}
                                                {...register(
                                                    `activities.${index}.description`
                                                )}
                                                className="w-full h-24 border rounded-lg p-2"
                                                placeholder="Enter Incident Description"
                                            />
                                        </div>

                                        <div className="flex items-start">
                                            <label
                                                className="block w-2/5 text-sm font-medium text-gray-600 pt-2"
                                                htmlFor="comments"
                                            >
                                                Comments / Related information
                                                to review:
                                            </label>
                                            <div className="flex w-full gap-4">
                                                <textarea
                                                    id="comments"
                                                    name={`activities.${index}.comments`}
                                                    {...register(
                                                        `activities.${index}.comments`
                                                    )}
                                                    className="w-full h-24 border rounded-lg p-2"
                                                    placeholder="Enter Comments / Related information to review"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center w-full justify-stretch">
                                            <label
                                                htmlFor="status"
                                                className="block w-2/5 text-sm font-medium text-gray-600"
                                            >
                                                Status:
                                            </label>
                                            <SelectHF
                                                id="status"
                                                name={`activities.${index}.status`}
                                                options={Object.values(STATUS)}
                                                register={register}
                                                placeholder="Select Status"
                                            />
                                        </div>
                                    </div>
                                ))}
                                <Button
                                    variant="tertiary"
                                    className={
                                        " rouneded-lg !text-gray-500 font-semibold text-sm px-4 py-2.5"
                                    }
                                    onClick={() =>
                                        addTopic(TAB_TOPICS.ACTIVITIES)
                                    }
                                >
                                    + Add More Activities
                                </Button>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
