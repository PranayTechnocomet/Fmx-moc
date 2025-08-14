import React from "react"

const Container = ({ children, className, ...props }) => {
    return (
        <div
            className={`border rounded-lg shadow-md ${
                className ? className : ""
            }`}
            {...props}
        >
            {children}
        </div>
    )
}
export default Container
