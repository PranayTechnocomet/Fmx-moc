import "react-toastify/dist/ReactToastify.min.css"
import "react-datepicker/dist/react-datepicker.css"
import "./globals.css"

import ReduxProvider from "@/provider/ReduxProvider"
import { ToastContainer } from "react-toastify"

export const metadata = {
    title: "Punctualiti"
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <ReduxProvider>
                <body suppressHydrationWarning={true}>
                    {/* Adding toast container here so that I don't need to import it in other files */}
                    <ToastContainer position="top-center" />

                    {/* Here all the routes need to be authenticated that's why wrapping all the routes in the ProtectRoutes Container */}
                    {children}
                </body>
            </ReduxProvider>
        </html>
    )
}
