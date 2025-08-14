import { CalendarDays, Clock5, SquarePen, User, Users } from "lucide-react"

import Button from "../ui/Button"
import Card from "../ui/Card"
import Container from "../ui/Container"

const GridView = () => {
    return (
        <Container
            className={
                "container mx-auto gap-6 grid grid-cols-3 bg-white p-4 rounded-none overflow-y-auto mb-20"
            }
        >
            {[1, 2, 3, 4, 5, 6].map((e) => (
                <Card
                    key={e}
                    className={
                        "w-full min-h-[423px] h-max p-8 flex flex-col space-y-3"
                    }
                    title={"AB123 Product Update Meeting"}
                    rightComponent={
                        <div className="bg-green-100 text-xs font-semibold text-green-600 px-4 py-1 h-fit rounded-full flex items-center">
                            Completed
                        </div>
                    }
                >
                    <div className="inline-flex gap-2 mb-1">
                        {["Phase 1", "Admin Panel", "Finance"].map((e) => (
                            <div
                                key={e}
                                className="bg-green-100 text-xs font-semibold text-green-600 px-4 py-1 h-fit rounded-full flex items-center"
                            >
                                {e}
                            </div>
                        ))}
                    </div>
                    <div className="text-xs inline-flex items-center gap-1">
                        <Clock5 className="w-4" />
                        <span className="font-semibold">
                            2:30 PM - 4:00 PM{" "}
                        </span>
                        (1h 30 mins)
                    </div>
                    <div className="inline-flex flex-wrap gap-2">
                        <span className="text-xs inline-flex items-center gap-1">
                            <CalendarDays className="w-4" />
                            Meeting Date: 9 Apr, 2024
                        </span>
                        <span className="text-xs text-red-500 inline-flex items-center gap-1">
                            <CalendarDays
                                color={"red"}
                                className="w-4"
                            />
                            Original Date: 9 Apr, 2024
                        </span>
                    </div>
                    <div className="text-xs inline-flex items-center gap-1">
                        <Users className="w-4" />
                        10 members attended
                    </div>
                    <div className="inline-flex flex-wrap gap-2">
                        <span className="text-xs inline-flex items-center gap-1">
                            <SquarePen className="w-4" />
                            15 Meeting notes
                        </span>
                        <div className="text-xs inline-flex items-center gap-1">
                            <CalendarDays
                                color={"red"}
                                className="w-4"
                            />
                            Agendas: 11
                            <span className="text-green-500">Closed</span>
                        </div>
                    </div>
                    <div className="text-xs inline-flex items-center gap-1">
                        <Users className="w-4" />
                        Place: Virtual Meeting (Meets)
                    </div>
                    <div className="text-xs inline-flex items-center gap-1">
                        <User className="w-4" />
                        Meeting Host:
                    </div>
                    <Button
                        variant="primary"
                        className={"rounded-lg px-4 py-2.5"}
                    >
                        End Meeting {">"}
                    </Button>
                </Card>
            ))}
        </Container>
    )
}

export default GridView
