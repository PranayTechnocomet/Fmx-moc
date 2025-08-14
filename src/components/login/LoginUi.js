import { PROJECT_PATHNAME } from "@/config/constants"
import { useAuth } from "@/hooks/useAuth"
import { AUTH_UI } from "@/utils/constants"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import { toast } from "react-toastify"

import InputField from "../ui/form/Input"
import Header from "./Header"

export const TestIcon = () => (
    <svg
        xmlns="XXXXXXXXXXXXXXXXXXXXXXXXXX"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
    </svg>
)

const LoginUi = ({ onForgot }) => {
    const router = useRouter()
    const { login } = useAuth()
    const userNameRef = useRef(null)
    const passwordRef = useRef(null)

    // handling the login form sumbission here
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const userName = formData.get("userName")
        const password = formData.get("password")

        await login({ userName, password })
            .then(() => {
                router.push(`${PROJECT_PATHNAME}/`)
            })
            .catch((err) => {
                console.error(err)
                toast.error("Login Failed")
            })
    }

    return (
        <>
            <form
                className="w-full mx-auto flex flex-col px-12 py-4"
                onSubmit={handleFormSubmit}
            >
                <Header
                    title="Welcome Back!"
                    subtitle={"Enter your Username and Password."}
                />

                <div className="mb-8 mt-4 flex flex-col gap-4">
                    <InputField
                        ref={userNameRef}
                        type="text"
                        placeholder="Username or Email"
                        name="userName"
                        id="userName"
                        icon={TestIcon}
                    />
                    <InputField
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                        name="password"
                        id="password"
                        icon={TestIcon}
                    />
                </div>
                <button
                    className="bg-blue-950 text-white w-4/5 mx-auto py-3 rounded-md"
                    type="submit"
                >
                    Login
                </button>
                <button
                    className="text-lg mt-4"
                    type="button"
                    onClick={() => onForgot(AUTH_UI.FORGOT_PASSWORD)}
                >
                    Forgot Password?
                </button>
            </form>
            <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-400" />
                <span className="flex-shrink mx-4 text-gray-400">OR</span>
                <div className="flex-grow border-t border-gray-400" />
            </div>
            <Link
                className="bg-slate-100 my-4 p-4 text-black font-semibold text-center"
                href={"https://sggsc.punctualiti.tech/sso-login/fmxAuth/signin"}
            >
                Continue with SSO Login
            </Link>
        </>
    )
}
export default LoginUi
