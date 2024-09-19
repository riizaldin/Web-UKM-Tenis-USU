export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button {...props} className={'w-full bg-prismarine mt-6 rounded border border-darkgray text-white font-semibold p-1 text-lg shadow-md hover:bg-opacity-90 ease-in-out duration-150 ' + className} disabled={disabled}>
            {children}
        </button>
    );
}
