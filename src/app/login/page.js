"use client"

import ForgotPasswordUi from "@/components/login/ForgotPasswordUi"
import LoginUi from "@/components/login/LoginUi"
import SetPasswordUi from "@/components/login/SetPasswordUi"
import { PROJECT_PATHNAME } from "@/config/constants"
import { useAuth } from "@/hooks/useAuth"
import { AUTH_UI } from "@/utils/constants"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useLayoutEffect, useState } from "react"
import Logo from "../../icons/logo.svg"
export default function Page() {
    const [showUi, setShowUi] = useState(AUTH_UI.LOGIN)
    const [userEmail, setUserEmail] = useState(null)
    const router = useRouter()
    const { validateSession } = useAuth()

    const renderUI = (showUi) => {
        switch (showUi) {
            case AUTH_UI.LOGIN:
                return <LoginUi onForgot={setShowUi} />
            case AUTH_UI.FORGOT_PASSWORD:
                return (
                    <ForgotPasswordUi
                        updateUi={setShowUi}
                        setUserEmail={setUserEmail}
                        userEmail={userEmail}
                    />
                )
            case AUTH_UI.SET_PASSWORD:
                return (
                    <SetPasswordUi
                        updateUi={setShowUi}
                        userEmail={userEmail}
                    />
                )
            default:
                return <LoginUi onForgot={setShowUi} />
        }
    }

    useLayoutEffect(() => {
        const existingSession = validateSession()

        if (existingSession) {
            router.replace(`${PROJECT_PATHNAME}/`)
        }
    }, [router, validateSession])

    return (
        <div className={"gradient h-screen"}>
            <div className="flex flex-col bg-white h-fit w-2/5 max-w-lg rounded-lg">
                <div className="flex items-center justify-between px-12 py-6">
                    <div className="flex items-center gap-2">
                        <Image
                            src={Logo}
                            alt="logo"
                            className="w-6 h-auto"
                            width={20}
                            height={20}
                        />
                        Company & Icon
                    </div>
                    <div className="flex items-center gap-2 font-bold text-lg">
                        <Image
                            src={Logo}
                            alt="logo"
                            className="w-6 h-auto"
                            width={20}
                            height={20}
                        />
                        Punctualiti
                    </div>
                </div>
                {renderUI(showUi)}
            </div>
        </div>
    )
}
