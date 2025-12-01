import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import FormHeader from '@/Components/FormHeader';
import { Head } from '@inertiajs/react';
import { Link, useForm } from '@inertiajs/react';
import AuthenticationLayout from '@/Layouts/AuthenticationLayout';


export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <AuthenticationLayout title='Daftar'>
            <Head title='Daftar' />

            <div className="bg-white rounded-lg shadow-xl p-8">
                <form onSubmit={submit} noValidate>
                    <div className="space-y-4">
                        <div>
                            <TextInput
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-prismarine focus:ring-prismarine"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                error={errors.email}
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && <InputError message={errors.email}/>}
                        </div>

                        <div>
                            <TextInput
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-prismarine focus:ring-prismarine"
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Nama Lengkap"
                                error={errors.name}
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && <InputError message={errors.name}/>}
                        </div>

                        <div>
                            <TextInput
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-prismarine focus:ring-prismarine"
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Kata Sandi"
                                error={errors.password}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            {errors.password && <InputError message={errors.password}/>}
                        </div>

                        <PrimaryButton
                            className="w-full mt-2 bg-prismarine hover:bg-prismarine/90 text-white font-bold py-3 rounded-lg transition-colors duration-200"
                            disabled={processing}
                        >
                            Daftar
                        </PrimaryButton>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Sudah punya akun?{' '}
                        <Link href={route('login')} className="text-prismarine hover:underline font-semibold">
                            Masuk disini
                        </Link>
                    </p>
                </div>
            </div>
        </AuthenticationLayout>
    );
}
