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
                <FormHeader text="Reset Password" />
                <div className="mb-4 text-sm text-gray-600 mt-10">
                    Lupa kata sandi Anda? Jangan khawatir. Cukup beri tahu kami alamat email Anda dan kami akan mengirimkan link untuk mereset kata sandi Anda.
                </div>

                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                <form onSubmit={submit}>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="Masukkan alamat email Anda"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                    
                    <div>
                        <PrimaryButton disabled={processing}>
                            Email Link
                        </PrimaryButton>
                    </div>

                    <div className='text-center mt-5 mb-2 text-darkgray lg:text-lg text-md'>
                        Belum punya akun? <Link href={route('register')} className='text-link_blue font-bold'>Klik disini</Link>
                    </div>
                </form>
            </div>
        </AuthenticationLayout>
    );
}
