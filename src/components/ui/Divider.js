const Divider = ({ title }) => (
    <div className="flex items-center my-2">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-600">{title}</span>
        <div className="flex-grow border-t border-gray-300"></div>
    </div>
)
export default Divider
