"use client"

import { logout } from "@/redux/slices/authSlice"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

import { useLoginMutation, useSendOTPMutation } from "../redux/api/authApi"

export const useAuth = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const [loginMutation] = useLoginMutation()
    const [sendOTPMutation] = useSendOTPMutation()

    const { user, token, isAuthenticated } = useSelector((state) => state.auth)

    const login = async (credentials) => {
        try {
            const res = await loginMutation(credentials).unwrap()
            if (res.success === 1) {
                const token = res.data.loginToken
                const userData = res.data.userName

                // Save to session storage
                sessionStorage.setItem("token", token)
                sessionStorage.setItem("user", userData)

                toast.success("Login Successful")
                return true
            } else {
                toast.error(res.message, { toastId: "loginError" })
                return false
            }
        } catch (error) {
            console.error("Login failed:", error)
            toast.error("An error occurred during login.")
            return false
        }
    }

    const handleLogout = ({
        toastId = "logout",
        message = "Logged out successfully."
    }) => {
        dispatch(logout())
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
        toast.info(message, { toastId })
        router.push("/login")
    }

    const sendOTP = async (email) => {
        try {
            const res = await sendOTPMutation({ email }).unwrap()
            if (res.success === 1) {
                toast.success("OTP sent successfully")
                return true
            } else {
                toast.error(res.message, { toastId: "sendOTPError" })
                return false
            }
        } catch (error) {
            console.error("OTP sending failed:", error)
            toast.error("An error occurred while sending the OTP.")
            return false
        }
    }

    const changePassword = async ({ newPassword, otp, email }) => {
        try {
            const res = await changePassword({
                newPassword,
                otp,
                email
            }).unwrap()
            if (res.success === 1) {
                toast.success("Password changed successfully")
                return true
            } else {
                toast.error(res.message, { toastId: "changePasswordError" })
                return false
            }
        } catch (error) {
            console.error("Password change failed:", error)
            toast.error("An error occurred while changing the password.")
            return false
        }
    }

    const validateSession = () => {
        const sessionToken = sessionStorage.getItem("token")
        const sessionUser = sessionStorage.getItem("user")

        if (!sessionToken || !sessionUser) {
            return false // Session is invalid
        }

        return {
            user: sessionUser,
            token: sessionToken
        } // Return the valid session details
    }

    return {
        user,
        token,
        isAuthenticated,
        login,
        handleLogout,
        sendOTP,
        changePassword,
        validateSession
    }
}
