import React, { useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { toast, ToastContainer } from 'react-toastify';

export default function GalleryUpload({ auth }) {
    const [previewImages, setPreviewImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const { data, setData, post, processing, errors, progress } = useForm({
        title: '',
        description: '',
        category: 'latihan',
        images: [],
        location: '',
        event_date: new Date().toISOString().split('T')[0]
    });

    const categories = [
        { id: 'latihan', name: 'Latihan', icon: '🎾', color: 'green' },
        { id: 'turnamen', name: 'Turnamen', icon: '🏆', color: 'purple' },
        { id: 'event', name: 'Event', icon: '🎉', color: 'blue' },
        { id: 'prestasi', name: 'Prestasi', icon: '🏅', color: 'yellow' }
    ];

    const handleImageSelect = (e) => {
        const files = Array.from(e.target.files);
        handleFiles(files);
    };

    const handleFiles = (files) => {
        const validFiles = files.filter(file => {
            const isImage = file.type.startsWith('image/');
            const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
            
            if (!isImage) {
                toast.error(`${file.name} bukan file gambar!`);
                return false;
            }
            if (!isValidSize) {
                toast.error(`${file.name} terlalu besar! Maksimal 10MB`);
                return false;
            }
            return true;
        });

        if (validFiles.length === 0) return;

        // Create previews
        const newPreviews = validFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
            size: file.size
        }));

        setPreviewImages(prev => [...prev, ...newPreviews]);
        setData('images', [...data.images, ...validFiles]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    };

    const removeImage = (index) => {
        const newPreviews = previewImages.filter((_, i) => i !== index);
        const newImages = data.images.filter((_, i) => i !== index);
        
        // Revoke URL to prevent memory leaks
        URL.revokeObjectURL(previewImages[index].preview);
        
        setPreviewImages(newPreviews);
        setData('images', newImages);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (data.images.length === 0) {
            alert('Pilih minimal 1 foto untuk diupload!');
            return;
        }

        post(route('gallery.store'), data, {
             onSuccess: (page) => {
                if (page.props.flash?.error) {
                    toast.error(page.props.flash.error);
                } else if (page.props.flash?.success) {
                    toast.success(page.props.flash.success);
                }
                // router.visit(route('gallery'));
            },
            onError: (errors) => {
                console.error('Upload error:', errors);
            }
        });
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    const getCategoryColor = (categoryId) => {
        const category = categories.find(c => c.id === categoryId);
        return category?.color || 'gray';
    };

    return (
        <AppLayout title="Upload Galeri" auth={auth}>
            <ToastContainer position='top-center' autoClose={1300}></ToastContainer>
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Upload Foto ke Galeri</h1>
                    <p className="text-lg text-white/90">
                        Bagikan momen berharga kegiatan UKM Tenis USU
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Upload Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Informasi Foto</h2>

                            {/* Title */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Judul Foto <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Contoh: Latihan Rutin Sabtu Pagi"
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-prismarine focus:outline-none"
                                    required
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Deskripsi <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Ceritakan tentang foto ini..."
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-prismarine focus:outline-none resize-none"
                                    rows="4"
                                    required
                                ></textarea>
                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                                )}
                            </div>

                            {/* Category */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Kategori <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            type="button"
                                            onClick={() => setData('category', category.id)}
                                            className={`p-4 border-2 rounded-lg transition-all ${
                                                data.category === category.id
                                                    ? 'border-prismarine bg-prismarine/5'
                                                    : 'border-gray-200 hover:border-prismarine/50'
                                            }`}
                                        >
                                            <div className="text-3xl mb-2">{category.icon}</div>
                                            <div className="text-sm font-semibold text-gray-800">{category.name}</div>
                                        </button>
                                    ))}
                                </div>
                                {errors.category && (
                                    <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                                )}
                            </div>

                            {/* Location */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Lokasi <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    placeholder="Contoh: Lapangan Tenis USU"
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-prismarine focus:outline-none"
                                />
                            </div>

                            {/* Event Date */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Tanggal Kegiatan <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.event_date}
                                    onChange={(e) => setData('event_date', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-prismarine focus:outline-none"
                                />
                            </div>

                            {/* Image Upload Area */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Upload Foto <span className="text-red-500">*</span>
                                </label>
                                
                                {/* Drag & Drop Area */}
                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`border-4 border-dashed rounded-lg p-8 text-center transition-colors ${
                                        isDragging
                                            ? 'border-prismarine bg-prismarine/5'
                                            : 'border-gray-300 hover:border-prismarine/50'
                                    }`}
                                >
                                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className="text-gray-700 font-semibold mb-2">
                                        Drag & Drop foto di sini
                                    </p>
                                    <p className="text-gray-500 text-sm mb-4">atau</p>
                                    <label className="inline-block px-6 py-3 bg-prismarine text-white rounded-lg hover:bg-prismarine/90 transition-colors cursor-pointer font-semibold">
                                        Pilih Foto
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageSelect}
                                            className="hidden"
                                        />
                                    </label>
                                    <p className="text-xs text-gray-500 mt-4">
                                        Format: JPG, PNG, GIF | Maksimal 10MB per file
                                    </p>
                                </div>

                                {errors.images && (
                                    <p className="text-red-500 text-sm mt-2">{errors.images}</p>
                                )}

                                {/* Image Previews */}
                                {previewImages.length > 0 && (
                                    <div className="mt-6">
                                        <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                            Foto yang akan diupload ({previewImages.length})
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {previewImages.map((preview, index) => (
                                                <div key={index} className="relative group">
                                                    <img
                                                        src={preview.preview}
                                                        alt={preview.name}
                                                        className="w-full h-40 object-cover rounded-lg"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                    <div className="mt-2">
                                                        <p className="text-xs text-gray-600 truncate">{preview.name}</p>
                                                        <p className="text-xs text-gray-500">{formatFileSize(preview.size)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Upload Progress */}
                            {progress && (
                                <div className="mb-6">
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-prismarine h-3 rounded-full transition-all duration-300"
                                            style={{ width: `${progress.percentage}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2 text-center">
                                        Uploading... {progress.percentage}%
                                    </p>
                                </div>
                            )}

                            {/* Submit Buttons */}
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    disabled={processing || previewImages.length === 0}
                                    className="flex-1 py-4 bg-prismarine text-white rounded-lg font-bold text-lg hover:bg-prismarine/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Mengupload...' : 'Upload Foto'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => router.visit(route('gallery'))}
                                    className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-colors"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Info Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Info Upload</h3>
                            
                            {/* Uploader Info */}
                            <div className="mb-6 p-4 bg-prismarine/5 rounded-lg border border-prismarine/20">
                                <div className="flex items-center space-x-3 mb-3">
                                    <div className="w-12 h-12 bg-prismarine rounded-full flex items-center justify-center text-white font-bold text-lg">
                                        {auth?.user?.name?.charAt(0) || 'U'}
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-600">Diupload oleh</div>
                                        <div className="font-semibold text-gray-800">
                                            {auth?.user?.name || 'User'}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            {auth?.user?.nim || '-'}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-600">
                                    <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {new Date().toLocaleString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </div>
                            </div>

                            {/* Guidelines */}
                            <div className="space-y-4">
                                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        Tips Upload
                                    </h4>
                                    <ul className="text-sm text-blue-800 space-y-1">
                                        <li>✓ Gunakan foto berkualitas baik</li>
                                        <li>✓ Pastikan foto tidak blur</li>
                                        <li>✓ Hindari foto duplikat</li>
                                        <li>✓ Beri judul yang deskriptif</li>
                                    </ul>
                                </div>

                                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                    <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        Perhatian
                                    </h4>
                                    <ul className="text-sm text-yellow-800 space-y-1">
                                        <li>• Maksimal 10MB per foto</li>
                                        <li>• Format: JPG, PNG, GIF</li>
                                        <li>• Foto akan direview admin</li>
                                        <li>• Hindari konten sensitif</li>
                                    </ul>
                                </div>

                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Keuntungan
                                    </h4>
                                    <ul className="text-sm text-green-800 space-y-1">
                                        <li>✓ Dokumentasi tersimpan rapi</li>
                                        <li>✓ Dapat dilihat semua anggota</li>
                                        <li>✓ Mendapat credit sebagai uploader</li>
                                        <li>✓ Berkontribusi untuk UKM</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Recent Uploads */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h4 className="font-semibold text-gray-800 mb-3">Upload Terakhir Anda</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2 text-sm">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-gray-600">3 foto (5 Okt 2025)</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-gray-600">2 foto (28 Sep 2025)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
