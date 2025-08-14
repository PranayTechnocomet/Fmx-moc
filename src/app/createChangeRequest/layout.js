"use client"

import Navbar from "@/components/Navbar"
import ProtectRoutes from "@/components/ProtectRoutes"
import Sidebar from "@/components/Sidebar"
import { useSelector } from "react-redux"

export default function DashboardLayout({ children }) {
    const { selectedSite } = useSelector((state) => state.hierarchy)
    
    return (
        <ProtectRoutes>
            <main className="flex fixed w-full h-screen">
                <Sidebar />
                <div className="px-5 w-full max-h-screen relative bg-slate-100 flex flex-col">
                    <Navbar />
                    {!selectedSite ? (
                        <>
                            <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)]">
                                <div className="text-gray-500 text-xl font-medium mb-2">
                                    Please select a site to continue
                                </div>
                                <div className="text-gray-400 mb-12">
                                    Use the site selector in the navigation bar
                                    above
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                                </div>
                            </div>
                        </>
                    ) : (
                        children
                    )}
                </div>
            </main>
        </ProtectRoutes>
    )
}
