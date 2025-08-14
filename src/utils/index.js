import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import {
    SHIFT_TURNOVER_STATUSES,
    SHIFT_TURNOVER_STATUSES_COLORS
} from "./constants"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export const findStatusColor = (current) =>
    SHIFT_TURNOVER_STATUSES_COLORS.find(
        (e) => e.status === SHIFT_TURNOVER_STATUSES[current]
    )

export const getInitials = (fullName) => {
    const names = fullName.split(" ")

    const initials = names.map((name) => name[0].toUpperCase()).join("")

    return initials
}

export const findMatchingTitles = (pathname, sidebarItems, params) => {
    const result = []

    if (!!params.id) {
        const params_path_array = pathname.split("/")
        const title = params_path_array[params_path_array.length - 2].replace(
            /-/g,
            " "
        )
        result.push(title)
        return result
    }

    const pathSegments = pathname.split("/").filter(Boolean) // Split pathname into segments

    const findTitles = (items, currentPath) => {
        for (const item of items) {
            if (item.link === currentPath) {
                result.push(item.title)
                return true // Stop searching once a match is found
            }

            if (item.subLinks) {
                if (findTitles(item.subLinks, currentPath)) {
                    result.unshift(item.title) // Add parent title when a match is found in sublinks
                    return true
                }
            }
        }
        return false
    }

    // Construct the breadcrumb dynamically by matching each segment
    let constructedPath = ""
    for (const segment of pathSegments) {
        constructedPath += `/${segment}`
        findTitles(sidebarItems, constructedPath)
    }

    return result
}

export const isValidHotoFormTabObject = (obj) => {
    if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
        return false
    }

    const keysToCheck = [
        "incident_block",
        "abnormality_block",
        "activities_block"
    ]

    for (const key of keysToCheck) {
        if (
            !Array.isArray(obj[key]) || // Check if it's an array
            obj[key].length === 0 || // Check if array is non-empty
            !obj[key].every(
                (item) =>
                    typeof item === "object" &&
                    item !== null &&
                    Object.keys(item).length > 0
            ) // Check if all objects have non-empty key-value pairs
        ) {
            return false
        }
    }

    return true
}

export const monthNameToIndex = (monthName) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]
    return months.indexOf(monthName)
}

export const StatusToShow = (status) =>
    status.replaceAll("_", " ").toLowerCase()

export const formatStringToUpperSnakeCase = (str) => {
    if (str === "") return ""
    const chars = [...str]
    for (let i = chars.length - 1; i > 0; i--) {
        if (/[A-Z]/.test(chars[i])) {
            chars.splice(i, 0, "_")
        }
    }
    return chars.join("").toUpperCase()
}

export function upperSnakeToCamel(str) {
    return str
        .toLowerCase() // Convert the entire string to lower case.
        .replace(/(_\w)/g, (match) => match[1].toUpperCase())
}
