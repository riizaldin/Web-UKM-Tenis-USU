import { useState, useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformationForm({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;
    const [photoPreview, setPhotoPreview] = useState(null);
    const photoInputRef = useRef(null);

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        _method: 'patch',
        name: user.name,
        email: user.email,
        photo: null,
    });

    const getInitials = (name) => {
        if (!name) return 'U';
        const parts = name.trim().split(' ');
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('photo', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removePhoto = () => {
        setData('photo', null);
        setPhotoPreview(null);
        if (photoInputRef.current) {
            photoInputRef.current.value = '';
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.update'), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                            {photoPreview || user.profile_photo_path ? (
                                <img
                                    src={photoPreview || `/storage/${user.profile_photo_path}`}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-prismarine to-blue-600 flex items-center justify-center">
                                    <span className="text-white text-4xl font-bold">
                                        {getInitials(data.name)}
                                    </span>
                                </div>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => photoInputRef.current?.click()}
                            className="absolute bottom-0 right-0 bg-gradient-to-r from-prismarine to-blue-600 text-white p-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>
                    <input
                        ref={photoInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handlePhotoChange}
                    />
                    <div className="flex space-x-2">
                        <button
                            type="button"
                            onClick={() => photoInputRef.current?.click()}
                            className="px-4 py-2 bg-gradient-to-r from-prismarine to-blue-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                            Ganti Foto
                        </button>
                        {(photoPreview || user.profile_photo_path) && (
                            <button
                                type="button"
                                onClick={removePhoto}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                            >
                                Hapus Foto
                            </button>
                        )}
                    </div>
                    <InputError message={errors.photo} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" />
                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <TextInput
                            id="name"
                            className="pl-10 mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />
                    </div>
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" />
                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            className="pl-10 mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="username"
                        />
                    </div>
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="rounded-lg bg-yellow-50 p-4 border border-yellow-200">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-yellow-700">
                                    Email Anda belum diverifikasi.
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="ml-2 underline text-sm text-yellow-700 hover:text-yellow-900 font-medium"
                                    >
                                        Kirim ulang email verifikasi
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {status === 'verification-link-sent' && (
                    <div className="rounded-lg bg-green-50 p-4 border border-green-200">
                        <p className="text-sm font-medium text-green-800">
                            Link verifikasi baru telah dikirim ke email Anda.
                        </p>
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-3 bg-gradient-to-r from-prismarine to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Simpan Perubahan
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600 font-medium">Tersimpan!</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
