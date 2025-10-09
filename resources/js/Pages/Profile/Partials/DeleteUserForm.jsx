import { useState, useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <div className="rounded-lg bg-red-50 p-6 border-2 border-red-200">
                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                        <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-red-900 mb-2">
                            Hapus Akun Permanen
                        </h3>
                        <p className="text-sm text-red-700 mb-4">
                            Setelah akun Anda dihapus, semua sumber daya dan data akan dihapus secara permanen. 
                            Sebelum menghapus akun Anda, silakan unduh data atau informasi apa pun yang ingin Anda simpan.
                        </p>
                        <button
                            onClick={confirmUserDeletion}
                            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:from-red-700 hover:to-red-800 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                            Hapus Akun
                        </button>
                    </div>
                </div>
            </div>

            {confirmingUserDeletion && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div 
                            className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                            onClick={closeModal}
                        ></div>

                        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-6 pt-6 pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-red-100 sm:mx-0">
                                        <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                                        <h3 className="text-2xl font-bold leading-6 text-gray-900 mb-2">
                                            Apakah Anda yakin ingin menghapus akun?
                                        </h3>
                                        <div className="mt-4">
                                            <p className="text-sm text-gray-600 mb-4">
                                                Setelah akun Anda dihapus, semua sumber daya dan data akan dihapus secara permanen. 
                                                Silakan masukkan password Anda untuk mengkonfirmasi bahwa Anda ingin menghapus akun secara permanen.
                                            </p>

                                            <form onSubmit={deleteUser} className="space-y-4">
                                                <div>
                                                    <InputLabel htmlFor="password" value="Password" className="sr-only" />
                                                    <TextInput
                                                        id="password"
                                                        type="password"
                                                        name="password"
                                                        ref={passwordInput}
                                                        value={data.password}
                                                        onChange={(e) => setData('password', e.target.value)}
                                                        className="mt-1 block w-full"
                                                        isFocused
                                                        placeholder="Masukkan password Anda"
                                                    />
                                                    <InputError message={errors.password} className="mt-2" />
                                                </div>

                                                <div className="flex items-center justify-end space-x-3 mt-6">
                                                    <button
                                                        type="button"
                                                        onClick={closeModal}
                                                        className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                                    >
                                                        Batal
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        disabled={processing}
                                                        className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:from-red-700 hover:to-red-800 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        Hapus Akun
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
