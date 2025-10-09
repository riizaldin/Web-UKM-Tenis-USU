import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Gallery() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // grid or list

    const categories = [
        { id: 'all', name: 'Semua Foto', count: 48 },
        { id: 'training', name: 'Latihan', count: 20 },
        { id: 'tournament', name: 'Turnamen', count: 15 },
        { id: 'event', name: 'Event', count: 8 },
        { id: 'achievement', name: 'Prestasi', count: 5 }
    ];

    // Sample gallery data with uploader info
    const galleryItems = [
        {
            id: 1,
            title: 'Latihan Rutin Mingguan',
            category: 'training',
            image: '/images/LatihanRutin.jpg',
            date: '2025-10-05',
            description: 'Latihan rutin anggota UKM Tenis USU setiap hari Sabtu',
            photographer: 'Admin UKM',
            uploadedBy: 'Budi Santoso',
            uploaderNim: '210101001',
            likes: 45,
            views: 230
        },
        {
            id: 2,
            title: 'Turnamen Internal 2024',
            category: 'tournament',
            image: '/images/TurnamenInternal.jpg',
            date: '2024-12-15',
            description: 'Turnamen internal tahunan UKM Tenis USU kategori singles dan doubles',
            photographer: 'Tim Dokumentasi',
            uploadedBy: 'Siti Rahma',
            uploaderNim: '210101002',
            likes: 89,
            views: 456
        },
        {
            id: 3,
            title: 'Kunjungan ke Lapangan Tenis',
            category: 'event',
            image: '/images/TennisVisit.jpg',
            date: '2025-09-20',
            description: 'Kunjungan dan orientasi anggota baru ke fasilitas lapangan tenis',
            photographer: 'Dokumentasi',
            uploadedBy: 'Ahmad Rizki',
            uploaderNim: '210101003',
            likes: 67,
            views: 340
        },
        {
            id: 4,
            title: 'Fotbar Bersama',
            category: 'event',
            image: '/images/UkmFotbar.jpg',
            date: '2025-08-12',
            description: 'Sesi foto bersama seluruh anggota dan pengurus UKM Tenis USU',
            photographer: 'Official Photographer',
            uploadedBy: 'Dewi Lestari',
            uploaderNim: '210101004',
            likes: 125,
            views: 678
        },
        {
            id: 5,
            title: 'Latihan Teknik Forehand',
            category: 'training',
            image: '/images/LatihanRutin.jpg',
            date: '2025-09-28',
            description: 'Sesi latihan khusus teknik forehand dengan coach profesional',
            photographer: 'Admin UKM',
            uploadedBy: 'Andi Pratama',
            uploaderNim: '210101005',
            likes: 52,
            views: 290
        },
        {
            id: 6,
            title: 'Juara 1 Turnamen Antar Fakultas',
            category: 'achievement',
            image: '/images/TurnamenInternal.jpg',
            date: '2025-07-15',
            description: 'Tim UKM Tenis USU meraih juara 1 turnamen antar fakultas se-USU',
            photographer: 'Tim Media',
            uploadedBy: 'Rini Wulandari',
            uploaderNim: '210101006',
            likes: 156,
            views: 890
        },
        {
            id: 7,
            title: 'Workshop Strategi Bermain',
            category: 'event',
            image: '/images/TennisVisit.jpg',
            date: '2025-09-10',
            description: 'Workshop strategi bermain tenis dari atlet nasional',
            photographer: 'Dokumentasi',
            uploadedBy: 'Budi Santoso',
            uploaderNim: '210101001',
            likes: 78,
            views: 420
        },
        {
            id: 8,
            title: 'Sparing dengan UKM Tenis USU Medan',
            category: 'training',
            image: '/images/LatihanRutin.jpg',
            date: '2025-08-22',
            description: 'Latihan sparing bersama UKM Tenis dari universitas lain',
            photographer: 'Admin UKM',
            uploadedBy: 'Siti Rahma',
            uploaderNim: '210101002',
            likes: 61,
            views: 310
        },
        {
            id: 9,
            title: 'Turnamen Doubles Championship',
            category: 'tournament',
            image: '/images/TurnamenInternal.jpg',
            date: '2025-06-20',
            description: 'Pertandingan seru kategori doubles di turnamen regional',
            photographer: 'Sport Photographer',
            uploadedBy: 'Ahmad Rizki',
            uploaderNim: '210101003',
            likes: 94,
            views: 520
        },
        {
            id: 10,
            title: 'Perayaan HUT UKM Tenis',
            category: 'event',
            image: '/images/UkmFotbar.jpg',
            date: '2025-05-17',
            description: 'Perayaan ulang tahun UKM Tenis USU yang ke-25',
            photographer: 'Tim Dokumentasi',
            uploadedBy: 'Dewi Lestari',
            uploaderNim: '210101004',
            likes: 142,
            views: 765
        },
        {
            id: 11,
            title: 'Latihan Serve & Volley',
            category: 'training',
            image: '/images/LatihanRutin.jpg',
            date: '2025-10-01',
            description: 'Latihan teknik serve and volley untuk meningkatkan skill',
            photographer: 'Admin UKM',
            uploadedBy: 'Andi Pratama',
            uploaderNim: '210101005',
            likes: 48,
            views: 265
        },
        {
            id: 12,
            title: 'Juara 2 Kejuaraan Provinsi',
            category: 'achievement',
            image: '/images/TurnamenInternal.jpg',
            date: '2025-04-10',
            description: 'Prestasi membanggakan meraih runner-up kejuaraan provinsi',
            photographer: 'Official Media',
            uploadedBy: 'Rini Wulandari',
            uploaderNim: '210101006',
            likes: 178,
            views: 945
        }
    ];

    const filteredGallery = selectedCategory === 'all'
        ? galleryItems
        : galleryItems.filter(item => item.category === selectedCategory);

    const getCategoryBadgeColor = (category) => {
        switch (category) {
            case 'training':
                return 'bg-green-100 text-green-700';
            case 'tournament':
                return 'bg-purple-100 text-purple-700';
            case 'event':
                return 'bg-blue-100 text-blue-700';
            case 'achievement':
                return 'bg-yellow-100 text-yellow-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getCategoryName = (category) => {
        const cat = categories.find(c => c.id === category);
        return cat ? cat.name : category;
    };

    return (
        <AppLayout title="Galeri Foto">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Galeri Foto</h1>
                    <p className="text-lg text-white/90">
                        Dokumentasi kegiatan dan momen berharga UKM Tenis USU
                    </p>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-prismarine">48</div>
                            <div className="text-sm text-gray-600">Total Foto</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-prismarine">12</div>
                            <div className="text-sm text-gray-600">Album</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-prismarine">2.4K</div>
                            <div className="text-sm text-gray-600">Total Views</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-prismarine">856</div>
                            <div className="text-sm text-gray-600">Total Likes</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Filter & View Mode */}
            <div className="bg-white shadow-md sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                                        selectedCategory === category.id
                                            ? 'bg-prismarine text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {category.name}
                                    <span className="ml-2 text-xs opacity-75">({category.count})</span>
                                </button>
                            ))}
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex items-center space-x-2">
                            {/* Upload Button */}
                            <Link
                                href={route('gallery.upload')}
                                className="px-4 py-2 bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Upload Foto</span>
                            </Link>

                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-colors ${
                                    viewMode === 'grid'
                                        ? 'bg-prismarine text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                                title="Grid View"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-colors ${
                                    viewMode === 'list'
                                        ? 'bg-prismarine text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                                title="List View"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gallery Content */}
            <div className="container mx-auto px-4 py-8">
                {viewMode === 'grid' ? (
                    /* Grid View */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredGallery.map((item) => (
                            <div
                                key={item.id}
                                className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                                onClick={() => setSelectedImage(item)}
                            >
                                {/* Image */}
                                <div className="aspect-square overflow-hidden bg-gray-200">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                                        <p className="text-sm text-white/80 line-clamp-2">{item.description}</p>
                                    </div>
                                </div>

                                {/* Category Badge */}
                                <div className="absolute top-3 left-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryBadgeColor(item.category)}`}>
                                        {getCategoryName(item.category)}
                                    </span>
                                </div>

                                {/* Info Bar */}
                                <div className="p-4">
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex items-center space-x-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                </svg>
                                                <span>{item.likes}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                <span>{item.views}</span>
                                            </div>
                                        </div>
                                        <span className="text-xs">
                                            {new Date(item.date).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* List View */
                    <div className="space-y-4">
                        {filteredGallery.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                                onClick={() => setSelectedImage(item)}
                            >
                                <div className="flex flex-col md:flex-row">
                                    {/* Image */}
                                    <div className="md:w-64 h-64 md:h-auto bg-gray-200 flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryBadgeColor(item.category)}`}>
                                                    {getCategoryName(item.category)}
                                                </span>
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                {new Date(item.date).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                                        <p className="text-gray-600 mb-4">{item.description}</p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span>Foto oleh: <strong>{item.photographer}</strong></span>
                                            </div>

                                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                <div className="flex items-center space-x-1">
                                                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="font-semibold">{item.likes}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    <span className="font-semibold">{item.views}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {filteredGallery.length === 0 && (
                    <div className="text-center py-16">
                        <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Tidak ada foto</h3>
                        <p className="text-gray-500">Belum ada foto untuk kategori ini</p>
                    </div>
                )}
            </div>

            {/* Image Modal/Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="fixed top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
                        onClick={() => setSelectedImage(null)}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="max-w-5xl w-full my-8" onClick={(e) => e.stopPropagation()}>
                        {/* Image */}
                        <div className="mb-6">
                            <img
                                src={selectedImage.image}
                                alt={selectedImage.title}
                                className="w-full rounded-lg shadow-2xl max-h-[70vh] object-contain"
                            />
                        </div>

                        {/* Image Info */}
                        <div className="bg-white rounded-lg p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryBadgeColor(selectedImage.category)}`}>
                                            {getCategoryName(selectedImage.category)}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {new Date(selectedImage.date).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedImage.title}</h2>
                                    <p className="text-gray-600 mb-4">{selectedImage.description}</p>
                                    
                                    {/* Uploader Info */}
                                    <div className="flex items-center space-x-4 mb-4 p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-prismarine rounded-full flex items-center justify-center text-white font-bold">
                                                {selectedImage.uploadedBy?.charAt(0) || 'U'}
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500">Diupload oleh</div>
                                                <div className="font-semibold text-gray-800">{selectedImage.uploadedBy}</div>
                                                <div className="text-xs text-gray-600">{selectedImage.uploaderNim}</div>
                                            </div>
                                        </div>
                                        <div className="h-8 w-px bg-gray-300"></div>
                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>Foto oleh: <strong>{selectedImage.photographer}</strong></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 text-gray-600">
                                    <button className="flex items-center space-x-2 hover:text-red-500 transition-colors">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                        </svg>
                                        <span className="font-semibold">{selectedImage.likes}</span>
                                    </button>
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span className="font-semibold">{selectedImage.views}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button className="flex-1 px-6 py-3 bg-prismarine text-white rounded-lg hover:bg-prismarine/90 transition-colors font-semibold">
                                    Download Foto
                                </button>
                                <button className="px-6 py-3 border border-prismarine text-prismarine rounded-lg hover:bg-prismarine/10 transition-colors font-semibold">
                                    Bagikan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Button (Floating) */}
            <Link
                href="/gallery/upload"
                className="fixed bottom-8 right-8 bg-prismarine text-white p-4 rounded-full shadow-lg hover:bg-prismarine/90 transition-all hover:scale-110"
                title="Upload Foto"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
            </Link>
        </AppLayout>
    );
}
