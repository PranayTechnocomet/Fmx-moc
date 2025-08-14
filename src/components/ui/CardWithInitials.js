import { getInitials } from "@/utils"
import { Trash2 } from "lucide-react"

const CardWithInitials = ({
    label,
    view_only = true,
    children,
    onClickTrash
}) => {
    return (
        <div className="flex items-center justify-items-start w-full min-h-20 gap-3 p-2 border rounded-lg">
            <div>
                <div className="flex items-center justify-center text-2xl font-semibold text-center text-primary-100 uppercase rounded-full w-14 h-14 bg-blue-50">
                    {getInitials(label)}
                </div>
            </div>
            <div className="flex flex-col w-full overflow-hidden">
                {children}
            </div>
            {!view_only && (
                <Trash2
                    color="red"
                    className="cursor-pointer w-8"
                    onClick={onClickTrash}
                />
            )}
        </div>
    )
}

export default CardWithInitials
