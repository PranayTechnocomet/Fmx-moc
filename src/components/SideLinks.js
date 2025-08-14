"use client"

import { PROJECT_PATHNAME } from "@/config/constants"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import SideIcon1 from "../icons/side-icon-1.svg"
import SideIcon2 from "../icons/side-icon-2.svg"
import SideIcon3 from "../icons/side-icon-3.svg"
import SideIcon4 from "../icons/side-icon-4.svg"
import SideIcon5 from "../icons/side-icon-5.svg"
import SideIcon6 from "../icons/side-icon-6.svg"
import SideIcon7 from "../icons/side-icon-7.svg"
const sideBarMenus = [
    {
        name: "home1",
        link: PROJECT_PATHNAME,
        icon: SideIcon1,
        activeIcon: SideIcon1,
        alt: "alt_for_img"
    },
    {
        name: "home2",
        link: PROJECT_PATHNAME + "/cost",
        icon: SideIcon2,
        activeIcon: SideIcon2,
        alt: "alt_for_img"
    },
    {
        name: "home3",
        link: PROJECT_PATHNAME + "/cm-listing",
        icon: SideIcon3,
        activeIcon: SideIcon3,
        alt: "alt_for_img"
    },
    {
        name: "home4",
        link: PROJECT_PATHNAME + "/create-change-request",
        icon: SideIcon4,
        activeIcon: SideIcon4,
        alt: "alt_for_img"
    },
    {
        name: "home5",
        link: PROJECT_PATHNAME + "/create-get-pass",
        icon: SideIcon5,
        activeIcon: SideIcon5,
        alt: "alt_for_img"
    },
    {
        name: "home6",
        link: PROJECT_PATHNAME + "/create-get-pass",
        icon: SideIcon6,
        activeIcon: SideIcon6,
        alt: "alt_for_img"
    },
    {
        name: "home7",
        link: PROJECT_PATHNAME + "/create-get-pass",
        icon: SideIcon7,
        activeIcon: SideIcon7,
        alt: "alt_for_img"
    }
]

const SideLinks = () => {
    const pathname = usePathname()
    return (
        <>
            {sideBarMenus.map((menu) => {
                return (
                    <Link
                        key={menu.name}
                        href={menu.link}
                        className={`${
                            pathname === menu.link ? "bg-primary-100" : null
                        } p-2 inline-block text-gray-500 focus:outline-nones transition-colors duration-200 rounded-full `}
                    >
                        <Image
                            src={
                                pathname === menu.link
                                    ? menu.activeIcon
                                    : menu.icon
                            }
                            height={20}
                            width={20}
                            alt={menu.alt}
                            className="fill-blue-600 text-blue0"
                        />
                    </Link>
                )
            })}
        </>
    )
}

export default SideLinks
