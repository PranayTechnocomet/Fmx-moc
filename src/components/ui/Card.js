import React from "react"

import Container from "./Container"

const Card = ({
    title,
    description,
    rightComponent,
    className,
    children,
    ...props
}) => {
    return (
        <Container
            {...props}
            className={"bg-white p-6 " + (className ? className : "")}
        >
            <div className="flex justify-between items-center pb-4">
                <div className="text-black font-semibold">
                    {title}
                    {description && (
                        <p className="text-sm font-normal text-gray-400">
                            {description}
                        </p>
                    )}
                </div>
                {rightComponent && rightComponent}
            </div>
            {children}
        </Container>
    )
}

export default Card
