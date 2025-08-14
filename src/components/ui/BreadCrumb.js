"use client"

import { PROJECT_NAME } from "@/config/constants"
import { findMatchingTitles } from "@/utils"
import Image from "next/image"
import { useParams, usePathname } from "next/navigation"
import React from "react"
import Arrow from "../../icons/arrow.svg"

import { sidebarItems } from "../Sidebar"

const BreadCrumb = () => {
    const path = usePathname() // Get the current path
    const params = useParams()
    const breads = findMatchingTitles(path, sidebarItems, params) // Find matching breadcrumb titles

    return (
        <div className="flex items-center gap-x-5 pt-2 w-2/3">
            <div className="h-full p-4">
                <Image
                    src={Arrow}
                    height={10}
                    width={10}
                    alt="arrow"
                    onClick={() => window.history.back()}
                />
            </div>
            <div>
                <h3 className="text-black text-xl font-bold mb-1 capitalize">
                    {breads.length > 0 ? breads[breads.length - 1] : ""}
                </h3>
                <p className="capitalize text-sm">
                    <span
                        className={
                            breads.length > 0 ? "text-black" : "text-slate-500"
                        }
                    >
                        {PROJECT_NAME}
                        &nbsp;
                        {breads.length > 0 && " / "}
                        &nbsp;
                    </span>
                    {breads.map((item, index) => (
                        <span
                            key={index}
                            className={
                                index === breads.length - 1
                                    ? "text-slate-500"
                                    : ""
                            }
                        >
                            {item}
                            {index !== breads.length - 1 && " / "}
                        </span>
                    ))}
                </p>
            </div>
        </div>
    )
}

export default BreadCrumb
