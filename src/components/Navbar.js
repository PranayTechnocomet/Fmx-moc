"use client"

import { HierarchySelector } from "./Hierarchy"
import Breadcrumb from "./ui/BreadCrumb"

const Navbar = () => {
    return (
        <div className="flex items-center justify-between w-full">
            <Breadcrumb />
            <HierarchySelector />
        </div>
    )
}

export default Navbar
