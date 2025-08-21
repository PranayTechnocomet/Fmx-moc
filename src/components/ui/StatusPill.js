const StatusPill = ({ value, className }) => {
    // console.log("className", className);
    
    return (
        <span
            className={`px-3 py-1 text-xs rounded-full font-semibold ${
                className ? className : ""
            } `}
        >
            {value}
        </span>
    )
}

export default StatusPill
