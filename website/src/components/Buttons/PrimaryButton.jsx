export default function PrimaryButton({
    text,
    children,
    onClick,
    className = "",
    type = "button",
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`
                px-8
                py-4
                rounded-xl
                font-semibold
                text-lg
                transition-all
                duration-300
                shadow-lg
                hover:scale-105
                hover:shadow-green-500/30
                bg-green-500
                hover:bg-green-600
                text-white
                ${className}
            `}
        >
            {children || text}
        </button>
    );
}