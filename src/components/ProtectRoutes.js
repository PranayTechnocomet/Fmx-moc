"use client"

import { useAuth } from "@/hooks/useAuth"
import { setUser } from "@/redux/slices/authSlice"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const ProtectRoutes = ({ children }) => {
    const { validateSession, handleLogout } = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        const session = validateSession()

        if (!session) {
            // Redirect to login and logout if session is invalid
            handleLogout({
                toastId: "sessionExpired",
                message: "Session expired. Please log in again."
            })
        } else {
            // Update Redux store if session is valid
            dispatch(setUser(session))
            setIsLoading(false) // Stop loading
        }
    }, [dispatch, router])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return <>{children}</>
}

export default ProtectRoutes
