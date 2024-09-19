import AuthenticationLayout from '@/Layouts/AuthenticationLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import FormHeader from '@/Components/FormHeader';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <AuthenticationLayout>
            <div className=' bg-white border border-darkgray rounded-md p-4'>
                <Head title="Email Verification" />
                <FormHeader text="Verifikasi Email" />
                <div className="mb-4 text-sm text-gray-600 mt-4">
                    Sebelum memulai, verifikasi email Anda dengan mengklik link yang sudah dikirimkan ke email Anda. Jika Anda belum menerima email, klik tombol dibawah untuk mengirim ulang.
                </div>

                {status === 'verification-link-sent' && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        Link verifikasi baru telah dikirim ke alamat email Anda.
                    </div>
                )}

                <form onSubmit={submit} className=''>
                    <div className='text-end'>
                        <PrimaryButton disabled={processing}>Kirim ulang link verifikasi</PrimaryButton>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-3"
                        >
                            Log Out
                        </Link>
                    </div>
                </form>
            </div>
            
        </AuthenticationLayout>
    );
}
