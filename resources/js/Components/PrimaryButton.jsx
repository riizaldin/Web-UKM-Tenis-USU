export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={`
                w-full px-4 py-3 bg-prismarine text-white rounded-lg
                font-semibold text-sm tracking-wider
                transition duration-200 ease-in-out
                hover:bg-prismarine/90 
                focus:outline-none focus:ring-2 focus:ring-prismarine focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                ${className}
            `}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
