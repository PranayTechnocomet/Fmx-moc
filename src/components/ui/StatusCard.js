import React from "react"

const StatusCard = ({
    title,
    number,
    onClick,
    strip_color,
    title_color,
    cardStyles
}) => {
    return (
        <div
            className={
                "bg-white rounded-lg shadow-md w-full cursor-pointer transition-transform hover:scale-105 relative overflow-hidden p-0 " +
                (cardStyles ? ` ${cardStyles}` : "")
            }
            onClick={onClick}
        >
            <div className="relative z-0 flex items-center pl-4 py-2.5 w-3/4 h-full">
                <div className="flex-grow flex flex-col justify-between h-full">
                    <div
                        className={
                            "mb-1 text-sm capitalize " +
                            (title_color ? `${title_color}` : "")
                        }
                    >
                        {title}
                    </div>
                    <div className="text-black font-bold text-xl">{number}</div>
                </div>
            </div>
            <div
                className={
                    "absolute left-0 top-0 bottom-0 w-[5px] rounded-l-lg " +
                    (strip_color ? strip_color : "")
                }
            />
        </div>
    )
}

export default StatusCard
