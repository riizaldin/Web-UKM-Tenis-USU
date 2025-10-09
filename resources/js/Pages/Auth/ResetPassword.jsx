import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticationLayout from '@/Layouts/AuthenticationLayout';
import FormHeader from '@/Components/FormHeader';
import { useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function ResetPassword({ token, email }) {
    const [showSuccess, setShowSuccess] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onSuccess: () => {
                setShowSuccess(true);
                setTimeout(() => {
                    router.visit(route('login'), {
                        data: { status: 'Password berhasil direset! Silakan login dengan password baru Anda.' }
                    });
                }, 2000);
            },
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthenticationLayout title='Reset Password'>
            <div className='bg-white border border-darkgray rounded-md p-6'>
                <FormHeader text="Reset Kata Sandi" />
                
                <div className="mb-6 text-sm text-gray-600 mt-4">
                    Masukkan email dan password baru Anda untuk mereset kata sandi.
                </div>

                {showSuccess && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg animate-fadeIn">
                        <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <p className="font-medium text-sm text-green-600">Password Berhasil Direset!</p>
                                <p className="text-xs text-green-500 mt-1">Mengalihkan ke halaman login...</p>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <InputLabel htmlFor="email" value="Alamat Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Password Baru" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            isFocused={true}
                            placeholder="Minimal 8 karakter"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password Baru" />
                        <TextInput
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            placeholder="Ulangi password baru"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="pt-2">
                        <PrimaryButton className="w-full justify-center" disabled={processing || showSuccess}>
                            {processing ? (
                                <span className="flex items-center space-x-2">
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Mereset Password...</span>
                                </span>
                            ) : showSuccess ? (
                                'Berhasil! Mengalihkan...'
                            ) : (
                                'Reset Password'
                            )}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticationLayout>
    );
}
