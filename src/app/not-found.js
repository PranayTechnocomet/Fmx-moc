import { PROJECT_PATHNAME } from "@/config/constants"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href={PROJECT_PATHNAME}>Return Home</Link>
        </div>
    )
} 
