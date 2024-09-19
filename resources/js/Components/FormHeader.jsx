import ApplicationLogo from '@/Components/ApplicationLogo';

export default function FormHeader(props){
    return(
        <div>
            <div className='flex mb-2'>
                <div className='flex items-center'>
                    <ApplicationLogo className='min-w-14 w-14' />
                </div>
                <div className='ml-4 flex'>
                    <div className='self-center'>
                        <div className='text-prismarine font-bold lg:text-[1.4rem] text-lg'>
                            UKM TENIS LAPANGAN USU
                        </div>
                        <div className='font-semibold text-darkgray'>
                            {props.text}
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full border-2 border-prismarine'></div>
        </div>
    )
}