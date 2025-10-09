import AuthenticationLayout from '@/Layouts/AuthenticationLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import FormHeader from '@/Components/FormHeader';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <AuthenticationLayout title='Lupa Password'>
            <div className='bg-white border border-darkgray rounded-md p-4'>
                <FormHeader text="Lupa Kata Sandi" />
                
                <div className="mb-4 text-sm text-gray-600 mt-6">
                    Lupa kata sandi Anda? Jangan khawatir. Masukkan alamat email Anda dan kami akan mengirimkan link untuk mereset kata sandi.
                </div>

                {status && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="font-medium text-sm text-green-600">{status}</p>
                        </div>
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Alamat Email
                        </label>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            placeholder="nama@example.com"
                            className="w-full"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    
                    <div className="pt-2">
                        <PrimaryButton disabled={processing} className="w-full justify-center">
                            {processing ? (
                                <span className="flex items-center space-x-2">
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Mengirim...</span>
                                </span>
                            ) : (
                                'Kirim Link Reset Password'
                            )}
                        </PrimaryButton>
                    </div>

                    <div className='text-center mt-5 mb-2 text-darkgray lg:text-lg text-md'>
                        Kembali ke <Link href={route('login')} className='text-link_blue font-bold hover:underline'>Halaman Login</Link>
                    </div>
                    
                    <div className='text-center text-darkgray text-sm border-t pt-4'>
                        Belum punya akun? <Link href={route('register')} className='text-link_blue font-bold hover:underline'>Daftar disini</Link>
                    </div>
                </form>
            </div>
        </AuthenticationLayout>
    );
}
