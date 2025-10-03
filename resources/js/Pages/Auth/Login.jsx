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
            <div className="bg-white rounded-lg shadow-xl p-8">
                <form onSubmit={submit} noValidate>
                    {errors.auth && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" ref={divRef}>
                            <span className="block sm:inline">{errors.auth}</span>
                            <button onClick={close} className="absolute top-0 bottom-0 right-0 px-4 py-3">
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
                                <input type="checkbox" className="form-checkbox text-prismarine"/>
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