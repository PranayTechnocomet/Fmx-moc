"use client"

import { PROJECT_NAME, PROJECT_PATHNAME } from "@/config/constants"
import { useAuth } from "@/hooks/useAuth"
import { ChevronDown, ChevronUp, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import Logo from "../images/punctualiti-logo.png"
import Settings from "../icons/settings.svg"
import FAQ from "../icons/faq.svg"
import Client from "../images/client_img.png"
import Letter from "../images/letter-punctualiti.svg"       

import SideLinks from "./SideLinks"

export const sidebarItems = [
    // {
    //     title: "New Handover",
    //     icon: "🏠",
    //     link: PROJECT_PATHNAME + "/new",
    //     disabled: true
    // },
    {
        title: "Dashboard",
        icon: "🏠",
        link: PROJECT_PATHNAME + "/dashboard"
    },
    {
        title: "Create New CR",
        icon: "🏠",
        link: PROJECT_PATHNAME
    },
    {
        title: "CM Listing",
        icon: "🏠",
        link: PROJECT_PATHNAME + "/cm-listing"
    },

    {
        title: "Configuration",
        icon: "⚙️",
        // link: "/dashboard/settings",
        subLinks: [
            // { title: "Profile", link: "/settings/profile" },
            // { title: "Account", link: "/settings/account" },
            {
                title: "User Group",
                link: PROJECT_PATHNAME + "/settings/user-group"
            },
            {
                title: "Module Access",
                link: PROJECT_PATHNAME + "/settings/module-access"
            }
        ]
    }
]
const Sidebar = () => {
    const [openIndex, setOpenIndex] = useState(null)
    const pathname = usePathname()
    const { handleLogout } = useAuth()
    const router = useRouter()

    const toggleSubLinks = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    useEffect(() => {
        const activeLink = sidebarItems.find((item) => {
            if (item.subLinks) {
                return item.subLinks.some(
                    (subLink) => subLink.link === pathname
                )
            }
            return item.link === pathname
        })

        if (activeLink) {
            const activeIndex = sidebarItems.indexOf(activeLink)
            setOpenIndex(activeIndex)
        }
    }, [pathname])

    return (
        <aside className="flex h-screen">
            <div className="flex flex-col items-center w-16 py-4">
                <nav className="flex flex-col items-center flex-1 gap-y-8">
                    <Link href={PROJECT_PATHNAME}>
                        <Image
                            src={Logo}
                            height={40}
                            width={40}
                            alt="logo"
                        />
                    </Link>
                    <SideLinks />
                </nav>

                <div className="flex flex-col items-center mt-4 space-y-4">
                    <Link href={"/"}>
                        <Image
                            className="object-cover rounded-lg"
                            height={20}
                            width={20}
                            src={Settings}
                            alt="settings"
                        />
                    </Link>
                    <Link href={"/"}>
                        <Image
                            className="object-cover rounded-lg"
                            height={20}
                            width={20}
                            src={FAQ}
                            alt="faqs"
                        />
                    </Link>

                    {/* <Link href="#">
                        <Image
                            className="object-cover w-8 h-8 rounded-lg"
                            height={20}
                            width={20}
                            src={Client}
                            alt="avatar"
                        />
                    </Link> */}
                </div>
            </div>

            <div className="h-screen px-5 pt-1 pb-3 overflow-y-hidden flex flex-col justify-between bg-white shadow-md sm:w-64 w-60">
                <nav className="mt-4 -mx-3 flex flex-col justify-between">
                    <div className="relative">
                        <Image
                            src={Letter}
                            height={100}
                            width={100}
                            alt="logo"
                        />
                    </div>
                    <div className="mt-4">
                        <span className="text-slate-400 font-bold text-xs tracking-widest">
                            {PROJECT_NAME.toUpperCase()}
                        </span>
                        <ul className="flex flex-col gap-2 text-slate-600 font-semibold w-full text-sm mt-2">
                            {sidebarItems.map((item, index) => {
                                if (item.subLinks) {
                                    return (
                                        <li
                                            className="w-full"
                                            key={index}
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    toggleSubLinks(index)
                                                }
                                                className={`flex px-3 w-full justify-between py-2 ${
                                                    openIndex === index
                                                        ? "text-primary-100"
                                                        : null
                                                }`}
                                            >
                                                {item.title}{" "}
                                                {openIndex === index ? (
                                                    <ChevronUp />
                                                ) : (
                                                    <ChevronDown />
                                                )}
                                            </button>
                                            {openIndex === index &&
                                                item.subLinks && (
                                                    <>
                                                        {item.subLinks.map(
                                                            (
                                                                subLink,
                                                                subIndex
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        subIndex
                                                                    }
                                                                >
                                                                    <Link
                                                                        href={
                                                                            subLink.link
                                                                        }
                                                                        className={`h-10 w-full ${
                                                                            pathname ===
                                                                            subLink.link
                                                                                ? "bg-primary-100 text-white"
                                                                                : "text-slate-600"
                                                                        } pl-8 rounded-md flex items-center transition-all duration-150`}
                                                                    >
                                                                        {
                                                                            subLink.title
                                                                        }
                                                                    </Link>
                                                                </div>
                                                            )
                                                        )}
                                                    </>
                                                )}
                                        </li>
                                    )
                                } else {
                                    return (
                                        <Link
                                            key={index}
                                            className={`h-10 w-full ${
                                                pathname.split("/")[2] ===
                                                item.link.split("/")[2]
                                                    ? "bg-primary-100 text-white"
                                                    : "text-slate-600 "
                                            } px-3 rounded-md flex items-center transition-all duration-150`}
                                            href={
                                                item.disabled ? "#" : item.link
                                            }
                                        >
                                            {item.title}
                                        </Link>
                                    )
                                }
                            })}
                        </ul>
                    </div>
                </nav>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <div className="text-slate-600 font-semibold text-sm">
                            {sessionStorage.getItem("user")}
                        </div>

                        {/* <div className="text-[#233244] text-xs">
                            nayanish@gmail.com
                        </div> */}
                    </div>
                    <button onClick={handleLogout}>
                        <LogOut className="text-slate-500" />
                    </button>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
