import TextInput from '@/Components/TextInput';
import FormHeader from '@/Components/FormHeader';
import { Link, useForm } from '@inertiajs/react';
import {useRef} from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import AuthenticationLayout from '@/Layouts/AuthenticationLayout';
export default function Login(){
    const { data, setData, post, processing, errors} = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    const divRef = useRef();

    const close = () => {
        divRef.current.remove();
    }

    return (
        <AuthenticationLayout title='Login'>
            <div className=' bg-white border border-darkgray rounded-md p-4'>
                <form onSubmit={submit} noValidate>
                    <FormHeader text="Masuk"/>
                    <div className='mt-14'>
                        { errors.auth &&
                            <div className='bg-red-200 text-black mb-3 py-2 flex items-center justify-between relative rounded' ref={divRef}>
                                <div className='pl-4 text-sm lg:text-base flex-1'>
                                    {errors.auth}
                                </div> 
                                <div>
                                    <div onClick={close} className='border border-transparent focus:outline-none hover:border hover:border-darkgray border-rounded p-1 cursor-pointer me-1 rounded'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px">
                                            <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className='mb-3'>
                            <TextInput error={errors.email}  value={data.email} onChange={(e) => setData('email', e.target.value)} id="email" name="email" type="text" placeholder='Email' required/>
                            {errors.email && <InputError message={errors.email}/>}
                        </div>
                        <div>
                            <TextInput error={errors.password} value={data.password} onChange={(e) => setData('password', e.target.value)} id="password" name="password" type="password" placeholder='Kata Sandi' required/>
                            {errors.password && <InputError message={errors.password}/>}
                        </div>
                    </div>
                    
                    <PrimaryButton disabled={processing}>
                        Masuk
                    </PrimaryButton>
                    <div className='text-center mt-5 mb-2 text-darkgray lg:text-lg text-md'>
                        Lupa kata sandi? <Link href={route('password.request')} className='text-link_blue font-bold'>Klik disini</Link>
                    </div>
                </form>
            </div>

            <div className=' bg-white mt-6 text-center border border-darkgray rounded-md p-4 text-darkgray lg:text-lg text-md'>
                Belum punya akun? <Link href={route('register')} className='text-link_blue font-bold'>Daftar</Link>
            </div>
        </AuthenticationLayout>
    )
}