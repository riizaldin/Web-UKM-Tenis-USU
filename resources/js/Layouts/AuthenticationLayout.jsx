import { Head} from '@inertiajs/react';

export default function AuthenticationLayout({children, ...props}){
    return(
        <div className='bg-cream min-h-screen flex justify-center'>
            <div className='md:w-1/2 lg:w-2/5 xl:w-[30%] my-auto p-4 min-w-60 w-3/4'>
                <Head title={props.title}></Head>
                {children}
            </div>
        </div>
    )
}