import { useState, useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformationForm({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;
    const [photoPreview, setPhotoPreview] = useState(null);
    const [fileSizeError, setFileSizeError] = useState(null);
    const photoInputRef = useRef(null);

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        _method: 'patch',
        name: user.name,
        email: user.email,
        photo: null,
        delete_photo: false,
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
            // Check file size (max 2MB)
            const maxSize = 2 * 1024 * 1024; // 2MB in bytes
            if (file.size > maxSize) {
                const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
                setFileSizeError(`Ukuran foto terlalu besar! Maksimal ukuran file adalah 2MB. Ukuran file Anda: ${fileSizeMB}MB`);
                // Clear the input
                if (photoInputRef.current) {
                    photoInputRef.current.value = '';
                }
                return;
            }

            // Clear any previous error
            setFileSizeError(null);
            setData('photo', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removePhoto = () => {
        // Clear preview and photo immediately
        setPhotoPreview(null);
        setData('photo', null);
        if (photoInputRef.current) {
            photoInputRef.current.value = '';
        }
        
        if (user.pasfoto) {
            // If user has existing photo, submit form to delete it from server
            post(route('profile.update'), {
                forceFormData: true,
                preserveScroll: true,
                data: {
                    _method: 'patch',
                    name: data.name,
                    email: data.email,
                    delete_photo: '1',
                },
                onSuccess: () => {
                    setData('delete_photo', false);
                    // Force update user data to null
                    user.pasfoto = null;
                },
            });
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.update'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setPhotoPreview(null);
                setData('photo', null);
                setData('delete_photo', false);
                if (photoInputRef.current) {
                    photoInputRef.current.value = '';
                }
            },
        });
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                            <img
                                src={photoPreview || (user.pasfoto ? `/storage/${user.pasfoto}` : '/images/no_image_placeholder.png')}
                                alt="Profile"
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.src = '/images/no_image_placeholder.png'; }}
                            />
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
                    <button
                        type="button"
                        onClick={() => photoInputRef.current?.click()}
                        className="px-4 py-2 bg-gradient-to-r from-prismarine to-blue-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                        Ganti Foto
                    </button>
                    
                    {/* File Size Warning Box */}
                    {fileSizeError && (
                        <div className="w-full max-w-md bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-md">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-red-800">
                                        {fileSizeError}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setFileSizeError(null)}
                                    className="ml-3 flex-shrink-0 text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                    
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

                <div className="space-y-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-3 bg-gradient-to-r from-prismarine to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Simpan Perubahan
                    </button>

                    {/* Success Notification Box */}
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 transform translate-y-2"
                        enterTo="opacity-100 transform translate-y-0"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0 transform translate-y-2"
                    >
                        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-md">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-green-800">
                                        Profil berhasil diperbarui!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
