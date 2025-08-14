const { useGetCalendarListingMutation } = require("@/redux/api/hotoApi")
const { useEffect } = require("react")

const CARD_STAT_COLORS = [
    "bg-blue-50 text-blue-600",
    "text-white bg-information-100",
    "bg-green-50 text-green-800",
    "text-white bg-green-600",
    "bg-yellow-50 text-orange-500",
    "text-white bg-orange-500",
    "bg-red-50 text-red-600",
    "text-white bg-red-600",
    "bg-cyan-50 text-cyan-950",
    "text-white bg-cyan-950"
]

const MonthView = ({
    //client,
    //city,
    // cluster,
    // site,
    // moreFilters,
    selectedDate,
    handleDayClick
}) => {
    const [
        getCalendarListing,
        {
            isLoading: isCalendarLoading,
            data: calendarData,
            isError: isCalendarError,
            error: calendarError
        }
    ] = useGetCalendarListingMutation()

    useEffect(() => {
        getCalendarListing({
            month: selectedDate.toLocaleString("en-IN", { month: "long" }),
            year: selectedDate.getFullYear()
        }).unwrap()
    }, [selectedDate, getCalendarListing])

    const firstDayOfMonth = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1
    )
    const lastDayOfMonth = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        0
    )

    // Calculate placeholders for the beginning of the grid
    const startWeekday = firstDayOfMonth.getDay() // Day of the week (0 = Sunday, 6 = Saturday)
    const placeholdersBefore = startWeekday

    // Calculate placeholders for the end of the grid
    const endWeekday = lastDayOfMonth.getDay() // Day of the week (0 = Sunday, 6 = Saturday)
    const placeholdersAfter = 6 - endWeekday

    // Create an array to represent the days in the grid
    const calendarGrid = [
        ...Array.from({ length: placeholdersBefore }, () => {}), // Placeholder days before the first day of the month
        ...(calendarData?.data || []),
        ...Array.from({ length: placeholdersAfter }, () => {}) // Placeholder days after the last day of the month
    ]

    const renderEventInMonth = (stat, color) => {
        return (
            <div
                className={
                    "flex items-center text-xs pr-1 mb-1 truncate rounded cursor-pointer transition-transform hover:scale-105 " +
                    color
                }
            >
                <span className="truncate flex-grow text-right">{stat}</span>
            </div>
        )
    }

    if (isCalendarLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-100"></div>
            </div>
        )
    }

    if (isCalendarError) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="text-red-500 text-sm">
                    {calendarError?.data?.message}
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="grid grid-cols-7 sticky top-0 bg-white">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day, index) => (
                        <div
                            key={index}
                            className=" text-center py-2 text-xs"
                        >
                            {day}
                        </div>
                    )
                )}
            </div>
            <div className="grid grid-cols-7 gap-2 place-items-stretch h-[900px] overflow-auto">
                {calendarGrid.map((calendar_data, index) => {
                    const isCurrentMonth =
                        calendar_data?.month ===
                        selectedDate.toLocaleString("en-IN", {
                            month: "long"
                        })

                    if (!isCurrentMonth)
                        return (
                            <div
                                key={index}
                                onClick={() => handleDayClick(calendar_data)}
                                className={`flex flex-col border border-slate-200 rounded-lg p-1 h-fit cursor-pointer invisible`}
                            ></div>
                        )

                    const matchingDate =
                        calendar_data?.date === selectedDate.getDate()
                    return (
                        <div
                            key={index}
                            onClick={() => handleDayClick(calendar_data)}
                            className={
                                `flex flex-col rounded-lg p-1 h-fit cursor-pointer bg-white border  ` +
                                (matchingDate
                                    ? "border-primary-100"
                                    : "border-slate-200") +
                                (isCurrentMonth
                                    ? " hover:border-primary-100 hover:shadow-lg"
                                    : "")
                            }
                        >
                            {isCurrentMonth && (
                                <>
                                    <div className="mb-3 flex justify-between pr-1 text-right text-slate-600">
                                        <span className=" text-sm font-bold text-black">
                                            {calendar_data.date}
                                        </span>
                                        <span
                                            className={
                                                "h-auto px-1  flex items-center justify-center text-black font-medium rounded text-xs " +
                                                (matchingDate
                                                    ? " bg-slate-400 text-white"
                                                    : "bg-slate-200")
                                            }
                                        >
                                            {calendar_data.completionPercent}%
                                        </span>
                                    </div>
                                    <div className="flex-1 min-h-[2rem]">
                                        {renderEventInMonth(
                                            calendar_data.counts.total,
                                            CARD_STAT_COLORS[
                                                0 + (matchingDate && 1)
                                            ]
                                        )}
                                        {renderEventInMonth(
                                            calendar_data.counts.completed,
                                            CARD_STAT_COLORS[
                                                2 + (matchingDate && 1)
                                            ]
                                        )}
                                        {renderEventInMonth(
                                            calendar_data.counts.missed,
                                            CARD_STAT_COLORS[
                                                4 + (matchingDate && 1)
                                            ]
                                        )}
                                        {renderEventInMonth(
                                            calendar_data.counts.pending,
                                            CARD_STAT_COLORS[
                                                6 + (matchingDate && 1)
                                            ]
                                        )}
                                        {renderEventInMonth(
                                            calendar_data.counts.upcoming,
                                            CARD_STAT_COLORS[
                                                8 + (matchingDate && 1)
                                            ]
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default MonthView
