"use client"

import Card from "@/components/ui/Card"
import InputField from "@/components/ui/form/Input"
import { RESPONSE_TYPES } from "@/utils/constants"
import React from "react"

export default function Details({ register, formState, control }) {
    return (
        <>
            <div className="flex justify-between items-end w-[830px] mb-2 mx-auto">
                <h3 className="font-bold text-xl">Additional Details</h3>
            </div>
            <div className=" w-full mx-auto pb-10 h-full overflow-y-auto">
                <div className=" flex flex-col gap-4 w-[830px] mx-auto">
                    {" "}
                    <Card
                        title={"Additional Information"}
                        className="space-y-4"
                    >
                        <div className="flex items-baseline w-full justify-stretch">
                            <label className="block w-2/5 text-sm font-medium text-gray-600">
                                Materials Utilized:
                            </label>
                            <div className="w-full">
                                <div className="flex gap-2">
                                    <label className="flex gap-2">
                                        <input
                                            {...register("materials_utilized", {
                                                required: true
                                            })}
                                            type="radio"
                                            value={RESPONSE_TYPES.YES}
                                        />
                                        Yes
                                    </label>
                                    <label className="flex gap-2">
                                        <input
                                            {...register("materials_utilized", {
                                                required: true
                                            })}
                                            type="radio"
                                            value={RESPONSE_TYPES.NO}
                                        />
                                        No
                                    </label>
                                    <label className="flex gap-2">
                                        <input
                                            {...register("materials_utilized", {
                                                required: true
                                            })}
                                            type="radio"
                                            value={RESPONSE_TYPES.NA}
                                        />
                                        NA
                                    </label>
                                </div>
                                <InputField
                                    id="materials_utilized_remarks"
                                    {...register("materials_utilized_remarks")}
                                    className="block w-full mt-1"
                                    placeholder="Enter Remarks"
                                />
                            </div>
                        </div>
                        <div className="flex items-baseline w-full justify-stretch">
                            <label className="block w-2/5 text-sm font-medium text-gray-600">
                                Incident tracker & report status:
                            </label>
                            <div className="w-full">
                                <div className="flex gap-2">
                                    <label className="flex gap-2">
                                        <input
                                            {...register("incident_report", {
                                                required: true
                                            })}
                                            type="radio"
                                            value={RESPONSE_TYPES.YES}
                                        />
                                        Yes
                                    </label>
                                    <label className="flex gap-2">
                                        <input
                                            {...register("incident_report", {
                                                required: true
                                            })}
                                            type="radio"
                                            value={RESPONSE_TYPES.NO}
                                        />
                                        No
                                    </label>
                                    <label className="flex gap-2">
                                        <input
                                            {...register("incident_report", {
                                                required: true
                                            })}
                                            type="radio"
                                            value={RESPONSE_TYPES.NA}
                                        />
                                        NA
                                    </label>
                                </div>
                                <InputField
                                    id="incident_report_remarks"
                                    {...register("incident_report_remarks")}
                                    className="block w-full mt-1"
                                    placeholder="Enter Remarks"
                                />
                            </div>
                        </div>
                        <div className="flex items-baseline w-full justify-stretch">
                            <label className="block w-2/5 text-sm font-medium text-gray-600">
                                Customer list updating:
                            </label>
                            <div className="w-full">
                                <div className="flex gap-2">
                                    <label className="flex gap-2">
                                        <input
                                            {...register(
                                                "customer_list_updating",
                                                {
                                                    required: true
                                                }
                                            )}
                                            type="radio"
                                            value={RESPONSE_TYPES.YES}
                                        />
                                        Yes
                                    </label>
                                    <label className="flex gap-2">
                                        <input
                                            {...register(
                                                "customer_list_updating",
                                                {
                                                    required: true
                                                }
                                            )}
                                            type="radio"
                                            value={RESPONSE_TYPES.NO}
                                        />
                                        No
                                    </label>
                                    <label className="flex gap-2">
                                        <input
                                            {...register(
                                                "customer_list_updating",
                                                {
                                                    required: true
                                                }
                                            )}
                                            type="radio"
                                            value={RESPONSE_TYPES.NA}
                                        />
                                        NA
                                    </label>
                                </div>
                                <InputField
                                    id="customer_list_updating_remarks"
                                    {...register(
                                        "customer_list_updating_remarks"
                                    )}
                                    className="block w-full mt-1"
                                    placeholder="Enter Remarks"
                                />
                            </div>
                        </div>
                        <div className="flex items-baseline w-full justify-stretch">
                            <label className="block w-2/5 text-sm font-medium text-gray-600">
                                Rack Power ON tracker:
                            </label>
                            <div className="w-full">
                                <div className="flex gap-2">
                                    <label className="flex gap-2">
                                        <input
                                            {...register(
                                                "rack_power_on_tracker",
                                                {
                                                    required: true
                                                }
                                            )}
                                            type="radio"
                                            value={RESPONSE_TYPES.YES}
                                        />
                                        Yes
                                    </label>
                                    <label className="flex gap-2">
                                        <input
                                            {...register(
                                                "rack_power_on_tracker",
                                                {
                                                    required: true
                                                }
                                            )}
                                            type="radio"
                                            value={RESPONSE_TYPES.NO}
                                        />
                                        No
                                    </label>
                                    <label className="flex gap-2">
                                        <input
                                            {...register(
                                                "rack_power_on_tracker",
                                                {
                                                    required: true
                                                }
                                            )}
                                            type="radio"
                                            value={RESPONSE_TYPES.NA}
                                        />
                                        NA
                                    </label>
                                </div>
                                <InputField
                                    id="rack_power_on_tracker_remarks"
                                    {...register(
                                        "rack_power_on_tracker_remarks"
                                    )}
                                    className="block w-full mt-1"
                                    placeholder="Enter Remarks"
                                />
                            </div>
                        </div>
                        <div className="flex items-baseline w-full justify-stretch">
                            <label
                                htmlFor="hoto_id"
                                className="block w-2/5 text-sm font-medium text-gray-600"
                            >
                                Vendor performance tracker:
                            </label>
                            <div className="w-full">
                                <div className="flex gap-2">
                                    <label className="flex gap-2">
                                        <input
                                            {...register(
                                                "vendor_performance_tracker",
                                                {
                                                    required: true
                                                }
                                            )}
                                            type="radio"
                                            value={RESPONSE_TYPES.YES}
                                        />
                                        Yes
                                    </label>
                                    <label className="flex gap-2">
                                        <input
                                            {...register(
                                                "vendor_performance_tracker",
                                                {
                                                    required: true
                                                }
                                            )}
                                            type="radio"
                                            value={RESPONSE_TYPES.NO}
                                        />
                                        No
                                    </label>
                                    <label className="flex gap-2">
                                        <input
                                            {...register(
                                                "vendor_performance_tracker",
                                                {
                                                    required: true
                                                }
                                            )}
                                            type="radio"
                                            value={RESPONSE_TYPES.NA}
                                        />
                                        NA
                                    </label>
                                </div>
                                <InputField
                                    id="vendor_performance_tracker_remarks"
                                    {...register(
                                        "vendor_performance_tracker_remarks"
                                    )}
                                    className="block w-full mt-1"
                                    placeholder="Enter Remarks"
                                />
                            </div>
                        </div>
                        <div className="flex items-baseline w-full justify-stretch">
                            <label
                                htmlFor="hoto_id"
                                className="block w-2/5 text-sm font-medium text-gray-600"
                            >
                                Tool & Tackles status:
                            </label>
                            <div className="w-full">
                                <div className="flex gap-2">
                                    <label className="flex gap-2">
                                        <input
                                            {...register(
                                                "tool_and_tackle_status",
                                                {
                                                    required: true
                                                }
                                            )}
                                            type="radio"
                                            value={RESPONSE_TYPES.YES}
                                        />
                                        Yes
                                    </label>
                                    <label className="flex gap-2">
                                        <input
                                            {...register(
                                                "tool_and_tackle_status",
                                                {
                                                    required: true
                                                }
                                            )}
                                            type="radio"
                                            value={RESPONSE_TYPES.NO}
                                        />
                                        No
                                    </label>
                                    <label className="flex gap-2">
                                        <input
                                            {...register(
                                                "tool_and_tackle_status",
                                                {
                                                    required: true
                                                }
                                            )}
                                            type="radio"
                                            value={RESPONSE_TYPES.NA}
                                        />
                                        NA
                                    </label>
                                </div>
                                <InputField
                                    id="tool_and_tackle_status_remarks"
                                    {...register(
                                        "tool_and_tackle_status_remarks"
                                    )}
                                    className="block w-full mt-1"
                                    placeholder="Enter Remarks"
                                />
                            </div>
                        </div>
                        <div className="flex items-baseline w-full justify-stretch">
                            <label
                                htmlFor="hoto_id"
                                className="block w-2/5 text-sm font-medium text-gray-600"
                            >
                                Shift Resource (Staffing Issue if any):
                            </label>
                            <div className="w-full">
                                <div className="flex gap-2">
                                    <label className="flex gap-2">
                                        <input
                                            {...register("staffing_issue", {
                                                required: true
                                            })}
                                            type="radio"
                                            value={RESPONSE_TYPES.YES}
                                        />
                                        Yes
                                    </label>
                                    <label className="flex gap-2">
                                        <input
                                            {...register("staffing_issue", {
                                                required: true
                                            })}
                                            type="radio"
                                            value={RESPONSE_TYPES.NO}
                                        />
                                        No
                                    </label>
                                    <label className="flex gap-2">
                                        <input
                                            {...register("staffing_issue", {
                                                required: true
                                            })}
                                            type="radio"
                                            value={RESPONSE_TYPES.NA}
                                        />
                                        NA
                                    </label>
                                </div>
                                <InputField
                                    id="staffing_issue_remarks"
                                    {...register("staffing_issue_remarks")}
                                    className="block w-full mt-1"
                                    placeholder="Enter Remarks"
                                />
                            </div>
                        </div>
                    </Card>
                    <Card
                        title="Remarks / Special Instructions:"
                        className="space-y-4"
                    >
                        <div className="flex items-start w-full justify-stretch">
                            <label className="block w-2/5 text-sm font-medium text-gray-600 pt-2">
                                Remarks / Special Instructions:
                            </label>
                            <textarea
                                id="remarks"
                                {...register("remarks")}
                                className="w-full border border-gray-300 rounded-md p-2"
                                placeholder="Enter Remarks / Special Instructions"
                            />
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}
