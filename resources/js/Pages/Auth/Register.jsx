import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import FormHeader from '@/Components/FormHeader';
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
            <div className=' bg-white border border-darkgray rounded-md p-4'>
                <form onSubmit={submit} noValidate>
                    <FormHeader text="Daftar" />
                    <div className='mt-14'>
                        <div className="mb-3">
                            <TextInput id="email" name="email" type="email" placeholder='Email' error={errors.email} value={data.email} onChange={(e)=>setData('email', e.target.value)} required />
                            {errors.email && <InputError message={errors.email}/>}
                        </div>
                        <div className="mb-3">
                            <TextInput id="name" name="name" type="text" placeholder='Nama Lengkap' error={errors.name} value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                            {errors.name && <InputError message={errors.name} />}
                        </div>
                        <div className="mb-3">
                            <TextInput id="password" name="password" type="password" placeholder='Kata Sandi' error={errors.password} value={data.password} onChange={(e) => setData('password', e.target.value)} required />
                            {errors.password && <InputError message={errors.password} />}
                        </div>

                    </div>
                    <PrimaryButton className='mb-4' disabled={processing}>
                        Daftar
                    </PrimaryButton>
                </form>
            </div>

            <div className=' bg-white mt-6 text-center border border-darkgray rounded-md p-4 text-darkgray lg:text-lg text-md'>
                Sudah punya akun? <Link href={route('login')} className='text-link_blue font-bold'>Masuk</Link>
            </div>
        </AuthenticationLayout>
    );
}
