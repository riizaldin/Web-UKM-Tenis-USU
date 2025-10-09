import TextInput from '@/Components/TextInput';
import FormHeader from '@/Components/FormHeader';
import { Link, useForm } from '@inertiajs/react';
import {useRef, useEffect, useState} from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import AuthenticationLayout from '@/Layouts/AuthenticationLayout';

export default function Login({ status }){
    const [showStatus, setShowStatus] = useState(!!status);
    const { data, setData, post, processing, errors} = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        if (status) {
            setShowStatus(true);
            const timer = setTimeout(() => {
                setShowStatus(false);
            }, 8000);
            return () => clearTimeout(timer);
        }
    }, [status]);

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
            <div className="bg-white rounded-lg shadow-xl p-8">
                <form onSubmit={submit} noValidate>
                    {showStatus && status && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg relative mb-4 animate-fadeIn">
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="block sm:inline font-medium">{status}</span>
                            </div>
                            <button 
                                onClick={() => setShowStatus(false)} 
                                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                                type="button"
                            >
                                <svg className="fill-current h-5 w-5 text-green-600" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <title>Close</title>
                                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                                </svg>
                            </button>
                        </div>
                    )}
                    
                    {errors.auth && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" ref={divRef}>
                            <span className="block sm:inline">{errors.auth}</span>
                            <button onClick={close} className="absolute top-0 bottom-0 right-0 px-4 py-3" type="button">
                                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <title>Close</title>
                                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                                </svg>
                            </button>
                        </div>
                    )}
                    
                    <div className="space-y-4">
                        <div>
                            <TextInput
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-prismarine focus:ring-prismarine"
                                error={errors.email}
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                required
                            />
                            {errors.email && <InputError message={errors.email}/>}
                        </div>

                        <div>
                            <TextInput
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-prismarine focus:ring-prismarine"
                                error={errors.password}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Kata Sandi"
                                required
                            />
                            {errors.password && <InputError message={errors.password}/>}
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input 
                                    type="checkbox" 
                                    className="form-checkbox text-prismarine"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
                            </label>
                            <Link href={route('password.request')} className="text-sm text-prismarine hover:underline">
                                Lupa kata sandi?
                            </Link>
                        </div>
                    </div>

                    <PrimaryButton
                        className="w-full mt-6 bg-prismarine hover:bg-prismarine/90 text-white font-bold py-3 rounded-lg transition-colors duration-200"
                        disabled={processing}
                    >
                        Masuk
                    </PrimaryButton>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Belum punya akun?{' '}
                        <Link href={route('register')} className="text-prismarine hover:underline font-semibold">
                            Daftar disini
                        </Link>
                    </p>
                </div>
            </div>
        </AuthenticationLayout>
    )
}