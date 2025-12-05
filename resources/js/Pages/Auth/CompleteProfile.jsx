import AuthenticationLayout from "@/Layouts/AuthenticationLayout";
import TextInput from "@/Components/TextInput";
import { useRef } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";
import FileInput from "@/Components/FileInput";
import { Head } from '@inertiajs/react';
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

    return (
        <section className="py-12 px-6  bg-gray-100 min-h-screen flex items-center">
                <Head title="Lengkapi Profil" />
                <div className='bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto'>
                {/* Header Section with Gradient */}
                <div className="bg-gradient-to-r from-[#43CEA2] to-[#185A9D] p-8 text-white">
                    <div className="text-center">
                        <div className="mb-4">
                            <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
                            Halo, {firstName.charAt(0).toUpperCase() + firstName.slice(1)}! 👋
                        </h1>
                        <p className="text-lg md:text-xl text-white/90">
                            Sebelum memulai, lengkapi data diri kamu terlebih dahulu
                        </p>
                    </div>
                </div>

                {/* Form Section */}
                <div className="p-8 md:p-10">
                    <form noValidate onSubmit={submit}>
                        {/* Progress Indicator */}
                        <div className="mb-8">
                            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                                <span className="flex items-center space-x-1">
                                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white flex items-center justify-center font-semibold">1</span>
                                    <span>Data Akademik</span>
                                </span>
                                <div className="w-12 h-1 bg-gradient-to-r from-[#43CEA2] to-[#185A9D]"></div>
                                <span className="flex items-center space-x-1">
                                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white flex items-center justify-center font-semibold">2</span>
                                    <span>Dokumen</span>
                                </span>
                            </div>
                        </div>

                        {/* Data Akademik Section */}
                        <div className="mb-8">
                            <div className="flex items-center space-x-2 mb-6">
                                <div className="bg-gradient-to-r from-[#43CEA2] to-[#185A9D] w-1 h-6 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-[#45474B]">Data Akademik</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label htmlFor="nim" className="block text-sm font-semibold text-gray-700">
                                        NIM <span className="text-red-500">*</span>
                                    </label>
                                    <TextInput 
                                        error={errors.nim} 
                                        value={data.nim} 
                                        onChange={(e) => setData('nim', e.target.value)} 
                                        id="nim" 
                                        name="nim" 
                                        type="text" 
                                        placeholder='Masukkan NIM' 
                                        required 
                                    />
                                    {errors.nim && <InputError message={errors.nim} />}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="angkatan" className="block text-sm font-semibold text-gray-700">
                                        Angkatan <span className="text-red-500">*</span>
                                    </label>
                                    <TextInput 
                                        error={errors.angkatan} 
                                        value={data.angkatan} 
                                        onChange={(e) => setData('angkatan', e.target.value)} 
                                        id="angkatan" 
                                        name="angkatan" 
                                        type="text" 
                                        placeholder='Contoh: 2024' 
                                        required 
                                    />
                                    {errors.angkatan && <InputError message={errors.angkatan} />}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="fakultas" className="block text-sm font-semibold text-gray-700">
                                        Fakultas <span className="text-red-500">*</span>
                                    </label>
                                    <TextInput 
                                        error={errors.fakultas} 
                                        value={data.fakultas} 
                                        onChange={(e) => setData('fakultas', e.target.value)} 
                                        id="fakultas" 
                                        name="fakultas" 
                                        type="text" 
                                        placeholder='Contoh: Teknik' 
                                        required 
                                    />
                                    {errors.fakultas && <InputError message={errors.fakultas} />}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="jurusan" className="block text-sm font-semibold text-gray-700">
                                        Jurusan <span className="text-red-500">*</span>
                                    </label>
                                    <TextInput 
                                        error={errors.jurusan} 
                                        value={data.jurusan} 
                                        onChange={(e) => setData('jurusan', e.target.value)} 
                                        id="jurusan" 
                                        name="jurusan" 
                                        type="text" 
                                        placeholder='Contoh: Teknik Informatika' 
                                        required 
                                    />
                                    {errors.jurusan && <InputError message={errors.jurusan} />}
                                </div>
                            </div>

                            <div className="space-y-2 mt-5">
                                <label htmlFor="no_whatsapp" className="block text-sm font-semibold text-gray-700">
                                    No. WhatsApp <span className="text-red-500">*</span>
                                </label>
                                <TextInput 
                                    error={errors.no_whatsapp} 
                                    value={data.no_whatsapp} 
                                    onChange={(e) => setData('no_whatsapp', e.target.value)} 
                                    id="no_whatsapp" 
                                    name="no_whatsapp" 
                                    type="text" 
                                    placeholder='Contoh: 081234567890' 
                                    required 
                                />
                                {errors.no_whatsapp && <InputError message={errors.no_whatsapp} />}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t-2 border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-white px-4 text-sm text-gray-500 font-medium">Dokumen Pendukung</span>
                            </div>
                        </div>

                        {/* Dokumen Section */}
                        <div className="mb-8">
                            <div className="flex items-center space-x-2 mb-6">
                                <div className="bg-gradient-to-r from-[#43CEA2] to-[#185A9D] w-1 h-6 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-[#45474B]">Upload Dokumen</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-dashed border-[#43CEA2]">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-[#43CEA2] p-3 rounded-lg">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800 mb-1">Pas Foto <span className="text-red-500">*</span></h3>
                                            <p className="text-sm text-gray-600 mb-3">Format: JPG, PNG, JPEG | Maksimal: 2MB</p>
                                            <FileInput 
                                                error={errors.pasfoto} 
                                                message={!errors.pasfoto ? 'Pilih file pas foto dengan latar belakang merah atau biru' : ''} 
                                                onChange={(e) => setData('pasfoto', e.target.files[0])}
                                            />
                                            {errors.pasfoto && <InputError message={errors.pasfoto} />}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-dashed border-[#185A9D]">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-[#185A9D] p-3 rounded-lg">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800 mb-1">Kartu Tanda Mahasiswa (KTM) <span className="text-red-500">*</span></h3>
                                            <p className="text-sm text-gray-600 mb-3">Format: JPG, PNG, JPEG | Maksimal: 2MB</p>
                                            <FileInput 
                                                error={errors.ktm} 
                                                message={!errors.ktm ? 'Pilih foto atau scan KTM yang masih berlaku' : ''} 
                                                onChange={(e) => setData('ktm', e.target.files[0])}
                                            />
                                            {errors.ktm && <InputError message={errors.ktm} />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Info Box */}
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
                            <div className="flex items-start space-x-3">
                                <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="text-sm text-yellow-800">
                                    <p className="font-semibold mb-1">Informasi Penting:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Pastikan semua data yang diisi sudah benar</li>
                                        <li>File yang diupload harus jelas dan dapat terbaca</li>
                                        <li>Data yang sudah disimpan tidak dapat diubah tanpa persetujuan admin</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8 flex flex-col flex-row gap-4 justify-end items-stretch items-center">
                            <button
                                type="submit"
                                disabled={processing}
                                className="relative group overflow-hidden rounded-xl px-8 py-4 bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white font-bold text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {/* Animated background on hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#185A9D] to-[#43CEA2] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                
                                {/* Button content */}
                                <span className="relative flex items-center justify-center space-x-3">
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Menyimpan Data...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-6 h-6 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Simpan & Lanjutkan</span>
                                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </>
                                    )}
                                </span>

                                {/* Pulse effect on corners */}
                                <span className="absolute top-0 left-0 w-3 h-3 bg-white/50 rounded-full animate-ping"></span>
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-white/50 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            </section>
            
     
    )
} 