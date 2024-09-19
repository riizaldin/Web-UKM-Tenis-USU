import AuthenticationLayout from "@/Layouts/AuthenticationLayout";
import TextInput from "@/Components/TextInput";
import { useRef } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";
import FileInput from "@/Components/FileInput";
import InputError from "@/Components/InputError";

export default function CompleteProfile(){
    const { data, setData, post, processing, errors } = useForm({
        nim: '',
        fakultas: '',
        jurusan: '',
        angkatan: '',
        no_whatsapp: '',
        pasfoto: null,
        ktm: null,
    });

    const { auth } = usePage().props;

    let firstName = auth.user.name.split(' ')[0];

    const submit = (e) => {
        e.preventDefault();
        post(route('user.complete-profile'));
    };

    return(
        <AuthenticationLayout title='Lengkapi Profil'>
            <div className='bg-white border border-darkgray rounded-md p-4'>
                <form noValidate onSubmit={submit}>
                    <div className="text-center text-prismarine">
                        <div className="md:text-3xl text-2xl font-extrabold mb-2">
                            Halo, {firstName}
                        </div>
                        <div className="md:px-11 mb-1 text-sm md:text-base">
                            Sebelum memulai, silahkan lengkapi data diri kamu ya!
                        </div>
                    </div>
                    <div className='w-full border-2 border-prismarine'></div>
                    <div className="mt-8">
                       
                        <div className='mb-3'>
                            <TextInput error={errors.nim} value={data.nim} onChange={(e) => setData('nim', e.target.value)} id="nim" name="nim" type="text" placeholder='Nim' required />
                            {errors.nim && <InputError message={errors.nim} />}
                        </div>
                        <div className='mb-3'>
                            <TextInput error={errors.fakultas} value={data.fakultas} onChange={(e) => setData('fakultas', e.target.value)} id="fakultas" name="fakultas" type="text" placeholder='Fakultas' required />
                            {errors.fakultas && <InputError message={errors.fakultas} />}
                        </div>
                        <div className='mb-3'>
                            <TextInput error={errors.jurusan} value={data.jurusan} onChange={(e) => setData('jurusan', e.target.value)} id="jurusan" name="jurusan" type="text" placeholder='Jurusan' required />
                            {errors.jurusan && <InputError message={errors.jurusan} />}
                        </div>
                        <div className='mb-3'>
                            <TextInput error={errors.angkatan} value={data.angkatan} onChange={(e) => setData('angkatan', e.target.value)} id="angkatan" name="angkatan" type="text" placeholder='Angkatan' required />
                            {errors.angkatan && <InputError message={errors.angkatan} />}
                        </div>
                        <div className='mb-3'>
                            <TextInput error={errors.no_whatsapp} value={data.no_whatsapp} onChange={(e) => setData('no_whatsapp', e.target.value)} id="no_whatsapp" name="no_whatsapp" type="text" placeholder='No. WhatsApp' required />
                            {errors.no_whatsapp && <InputError message={errors.no_whatsapp} />}
                        </div>
                        <div className='mb-3'>
                            <FileInput error={errors.pasfoto} message = {!errors.pasfoto ? 'Pasfoto dengan ukuran 3x4 dengan format jpg, png, jpeg (maks. 2MB)' : ''} onChange={(e) => setData('pasfoto', e.target.files[0])}/>
                            {errors.pasfoto && <InputError message={errors.pasfoto} />}
                        </div>
                        <div className='mb-3'>
                            <FileInput error ={errors.ktm} message= {!errors.ktm ? 'Gambar KTM dengan format jpg, png, jpeg (maks. 2MB)' : ''} onChange={(e) => setData('ktm', e.target.files[0])}/>
                            {errors.ktm && <InputError message={errors.ktm} />}
                        </div>
                        <PrimaryButton disabled={processing}>
                            Simpan
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticationLayout>
    )
} 