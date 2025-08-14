import { useAuth } from "@/hooks/useAuth"
import { useSendOTPMutation } from "@/redux/api/authApi"
import { AUTH_UI } from "@/utils/constants"
import { useRef } from "react"
import { toast } from "react-toastify"

import InputField from "../ui/form/Input"
import Header from "./Header"
import { TestIcon } from "./LoginUi"

const ForgotPasswordUi = ({ updateUi, setUserEmail }) => {
    const emailRef = useRef(null)
    const { sendOTP } = useAuth()

    const handleOtpRequest = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email = formData.get("email")
        if (!email.length > 0) {
            toast.error("Please enter a valid email")
        } else {
            try {
                setUserEmail(email)
                await sendOTP(email).then((status) => {
                    if (status) updateUi(AUTH_UI.SET_PASSWORD)
                })
            } catch (error) {
                console.log(error)
                toast.error("Something went wrong")
            }
        }
    }
    return (
        <>
            <form
                className="w-full mx-auto flex flex-col px-12 py-4"
                onSubmit={handleOtpRequest}
            >
                <Header
                    title="Forgot Password"
                    subtitle={"Enter your Registered Email Id."}
                />

                <div className="mb-8 mt-4">
                    <InputField
                        ref={emailRef}
                        type="email"
                        placeholder="Email"
                        name="email"
                        id="email"
                        icon={TestIcon}
                    />
                </div>
                <button
                    className="bg-blue-950 text-white w-4/5 mx-auto py-3 rounded-md"
                    type="submit"
                >
                    Get OTP
                </button>
                <button
                    type="button"
                    className="mx-auto mt-4 bg-slate-300 text-black w-4/5 py-3 rounded-md"
                    onClick={() => updateUi(AUTH_UI.LOGIN)}
                >
                    Cancel
                </button>
            </form>
        </>
    )
}
export default ForgotPasswordUi
