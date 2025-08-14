import { useAuth } from "@/hooks/useAuth"
import { AUTH_UI } from "@/utils/constants"
import { useRef, useState } from "react"
import { toast } from "react-toastify"

import InputField from "../ui/form/Input"
import Header from "./Header"
import { TestIcon } from "./LoginUi"

const SetPasswordUi = ({ updateUi, userEmail }) => {
    const { changePassword } = useAuth()
    const otpRef = useRef(null)
    const newPasswordRef = useRef(null)
    const confirmPasswordRef = useRef(null)

    // handling the login form sumbission here
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const newPassword = formData.get("newPassword")
        const confirmPassword = formData.get("confirmPassword")
        const otp = formData.get("otp").trim()

        // Validate inputs
        if (!otp) {
            toast.error("OTP is required")
            return
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        } else {
            await changePassword({ newPassword, otp, email: userEmail })
                .then((status) => {
                    if (status) updateUi(AUTH_UI.LOGIN)
                })
                .catch((err) => {
                    console.log(err)
                    toast.error("Something went wrong")
                })
        }
    }

    return (
        <>
            <form
                className="w-full mx-auto flex flex-col px-12 py-4 pb-8"
                onSubmit={handleFormSubmit}
            >
                <Header
                    title="Reset Password"
                    subtitle={"Set your New Password."}
                />

                <div className="mb-8 mt-4 flex flex-col gap-4">
                    <InputField
                        ref={newPasswordRef}
                        type="password"
                        id="newPassword"
                        placeholder="New Password"
                        name="newPassword"
                        icon={TestIcon}
                    />
                    <InputField
                        ref={confirmPasswordRef}
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        id="confirmPassword"
                        icon={TestIcon}
                    />
                    <InputField
                        ref={otpRef}
                        type="text"
                        placeholder="OTP"
                        name="otp"
                        id="otp"
                        icon={TestIcon}
                    />
                </div>
                <button
                    className="bg-blue-950 text-white w-4/5 mx-auto py-3 rounded-md"
                    type="submit"
                >
                    Submit
                </button>
                <button
                    className="text-blue-950 bg-slate-100 w-4/5 mx-auto py-3 rounded-md mt-4"
                    type="button"
                    onClick={() => updateUi(AUTH_UI.LOGIN)}
                >
                    Cancel
                </button>
            </form>
        </>
    )
}
export default SetPasswordUi
