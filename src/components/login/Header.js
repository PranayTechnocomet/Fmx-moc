const Header = ({ title, subtitle }) => (
    <>
        <div className="text-3xl font-sans font-bold text-blue-950 mb-1">
            {title}
        </div>
        <span>{subtitle}</span>
    </>
)

export default Header
