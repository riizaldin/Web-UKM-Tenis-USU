export default function({className, ...props}){
    return(
        <div>
            <input type='file' className={'w-full bg-cream font-medium rounded-sm border border-[#969696] cursor-pointer file:border-none file:bg-prismarine file:py-2 file:text-white file:px-1 file:mr-2 hover:opacity-90 duration-100 ease-in-out ' + className + ' ' + (props.error ? 'border-red-500 border-2' : '')} {...props}/>
            <p className="text-sm text-gray-500" id="file_input_help">{props.message}</p>
        </div>
    )
}