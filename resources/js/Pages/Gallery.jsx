import React, { useState, useEffect, useRef } from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePage } from '@inertiajs/react';


export default function Gallery({ auth, galleryItems, totalFoto, totalLikes, totalViews }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [viewMode, setViewMode] = useState('grid'); // grid or list
    const viewTimerRef = useRef(null);
    const viewIncrementedRef = useRef(false);
    const [galleryData, setGalleryData] = useState(galleryItems);

    const { flash } = usePage().props;

    // Update gallery data when props change
    useEffect(() => {
        setGalleryData(galleryItems);
    }, [galleryItems]);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    // Track modal open time and increment view count after 3 seconds
    useEffect(() => {
        if (selectedImage) {
            // Reset the flag when a new image is selected
            viewIncrementedRef.current = false;
            
            // Capture the ID immediately to avoid stale closure
            const currentGaleriId = selectedImage.id;
            
            // Set a timer to increment view count after 3 seconds
            viewTimerRef.current = setTimeout(() => {
                if (!viewIncrementedRef.current) {
                    incrementViewCount(currentGaleriId);
                    viewIncrementedRef.current = true;
                }
            }, 3000);
        }

        // Cleanup function
        return () => {
            if (viewTimerRef.current) {
                clearTimeout(viewTimerRef.current);
                viewTimerRef.current = null;
            }
        };
    }, [selectedImage]);

    const incrementViewCount = (galeriId) => {
        if (!galeriId) return;
        
        fetch(route('gallery.increment-view', galeriId), {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then(res => res.json())
            .catch(err => {
                console.error('Failed to increment view count:', err);
            });
    };

    const handleToggleLike = async (galeriId, event) => {
        if (event) {
            event.stopPropagation();
        }

        try {
            const response = await fetch(route('gallery.toggle-like', galeriId), {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });

            const data = await response.json();

            if (data.success) {
                // Update gallery data with new like count and status
                setGalleryData(prevData => 
                    prevData.map(item => 
                        item.id === galeriId 
                            ? { ...item, like: data.new_like_count, is_liked: data.is_liked }
                            : item
                    )
                );

                // Update the selected image if it's currently open
                setSelectedImage(prev => {
                    // Only update if modal is still open for this image
                    if (prev && prev.id === galeriId) {
                        return {
                            ...prev,
                            like: data.new_like_count,
                            is_liked: data.is_liked
                        };
                    }
                    return prev;
                });

                // Show toast notification
            }
        } catch (error) {
            console.error('Failed to toggle like:', error);
        }
    };


    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedImage || !selectedImage.photos || selectedImage.photos.length === 0) return;
            
            if (e.key === 'ArrowLeft') {
                handlePrevPhoto();
            } else if (e.key === 'ArrowRight') {
                handleNextPhoto();
            } else if (e.key === 'Escape') {
                handleCloseModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, currentPhotoIndex]);

    const handleCloseModal = () => {
        // Clear the timer if modal is closed before 3 seconds
        if (viewTimerRef.current) {
            clearTimeout(viewTimerRef.current);
            viewTimerRef.current = null;
        }
        setSelectedImage(null);
        setCurrentPhotoIndex(0);
    };

    const handleNextPhoto = () => {
        if (!selectedImage?.photos || selectedImage.photos.length === 0) return;
        setCurrentPhotoIndex((prev) => 
            prev < selectedImage.photos.length - 1 ? prev + 1 : 0
        );
    };

    const handlePrevPhoto = () => {
        if (!selectedImage?.photos || selectedImage.photos.length === 0) return;
        setCurrentPhotoIndex((prev) => 
            prev > 0 ? prev - 1 : selectedImage.photos.length - 1
        );
    };

    const handleDownload = async () => {
        if (!selectedImage?.photos || selectedImage.photos.length === 0) return;
        
        const currentPhoto = selectedImage.photos[currentPhotoIndex];
        const imageUrl = `/storage/${currentPhoto.photo_path}`;
        
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${selectedImage.judul}-${currentPhotoIndex + 1}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success('Foto berhasil diunduh!');
        } catch (error) {
            console.error('Download failed:', error);
            toast.error('Gagal mengunduh foto');
        }
    };

    const handleShare = async () => {
        if (!selectedImage) return;
        
        const shareData = {
            title: selectedImage.judul,
            text: selectedImage.deskripsi,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                toast.success('Berhasil dibagikan!');
            } else {
                await navigator.clipboard.writeText(window.location.href);
                toast.success('Link disalin ke clipboard!');
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Share failed:', error);
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    toast.success('Link disalin ke clipboard!');
                } catch (clipboardError) {
                    toast.error('Gagal membagikan foto');
                }
            }
        }
    };


    const categories = [
        { id: 'all', name: 'Semua Foto', count: 0 },
        { id: 'latihan', name: 'Latihan', count: 0 },
        { id: 'turnamen', name: 'Turnamen', count: 0 },
        { id: 'event', name: 'Event', count: 0 },
        { id: 'prestasi', name: 'Prestasi', count: 0 },
    ];

    const items = galleryData; 

    const counts = galleryItems.reduce((acc, item) => {
        acc[item.kategori] = (acc[item.kategori] || 0) + 1;
        return acc;
    }, {});

    categories.forEach(cat => {
        if (cat.id === 'all') {
            cat.count = galleryItems.length;
        } else {
            cat.count = counts[cat.id] || 0;
        }
    });


    const filteredGallery = selectedCategory === 'all'
        ? items
        : items.filter(item => item.kategori === selectedCategory);


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
        <AppLayout title="Galeri Foto" auth={auth}>
            <ToastContainer position='top-center' autoClose={1300}></ToastContainer>
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
                            <div className="text-3xl font-bold text-prismarine">{totalFoto ? totalFoto : '0'}</div>
                            <div className="text-sm text-gray-600">Total Foto</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-prismarine">{galleryData.length}</div>
                            <div className="text-sm text-gray-600">Album</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-prismarine">{totalViews ? totalViews : '0'}</div>
                            <div className="text-sm text-gray-600">Total Views</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-prismarine">{totalLikes ? totalLikes : '0'}</div>
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
                                onClick={() => {
                                    setSelectedImage(item);
                                    setCurrentPhotoIndex(0);
                                }}
                            >
                                {/* Image */}
                                <div className="w-full h-56 overflow-hidden bg-gray-200">
                                    <img
                                        src={item.photos?.length ? `/storage/${item.photos[0].photo_path}` : '/images/no_image_placeholder.png'}
                                        alt={item.judul}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                        <h3 className="font-semibold text-lg mb-1">{item.judul}</h3>
                                        <p className="text-sm text-white/80 line-clamp-2">{item.deskripsi}</p>
                                    </div>
                                </div>

                                {/* Category Badge */}
                                <div className="absolute top-3 left-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryBadgeColor(item.kategori)}`}>
                                        {getCategoryName(item.kategori)}
                                    </span>
                                </div>

                                {/* Info Bar */}
                                <div className="p-4">
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex items-center space-x-1">
                                                <svg className={`w-4 h-4 ${item.is_liked ? 'text-red-500' : 'text-gray-600'}`} fill={item.is_liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                </svg>
                                                <span>{item.like}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                <span>{item.view}</span>
                                            </div>
                                        </div>
                                        <span className="text-xs">
                                            {new Date(item.tanggal).toLocaleDateString('id-ID', {
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
                                onClick={() => {
                                    setSelectedImage(item);
                                    setCurrentPhotoIndex(0);
                                }}
                            >
                                <div className="flex flex-col md:flex-row">
                                    {/* Image */}
                                    <div className="md:w-56 h-56 md:h-auto bg-gray-200 flex-shrink-0">
                                        <img
                                            src={item.photos?.length ? `/storage/${item.photos[0].photo_path}` : '/images/no_image_placeholder.png'}
                                            alt={item.judul}
                                            className="w-full h-full object-fill"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryBadgeColor(item.kategori)}`}>
                                                    {getCategoryName(item.kategori)}
                                                </span>
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                {new Date(item.tanggal).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.judul}</h3>
                                        <p className="text-gray-600 mb-4">{item.deskripsi}</p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span>Foto oleh: <strong>{item.user.name}</strong></span>
                                            </div>

                                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                <button 
                                                    onClick={(e) => handleToggleLike(item.id, e)}
                                                    className="flex items-center space-x-1"
                                                >
                                                    <svg className={`w-5 h-5 transition-colors ${
                                                        item.is_liked
                                                        ? 'text-red-500 hover:text-red-600' 
                                                        : 'text-gray-600 hover:text-red-500'
                                                    }`} fill={item.is_liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="font-semibold">{item.like}</span>
                                                </button>
                                                <div className="flex items-center space-x-1">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    <span className="font-semibold">{item.view}</span>
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
                    onClick={handleCloseModal}
                >
                    <button
                        className="fixed top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
                        onClick={handleCloseModal}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="max-w-4xl w-full my-8" onClick={(e) => e.stopPropagation()}>
                        {/* Image with Carousel Controls */}
                        <div className="mb-6 relative bg-black rounded-lg overflow-hidden">
                            <img
                                src={selectedImage.photos?.length ? `/storage/${selectedImage.photos[currentPhotoIndex]?.photo_path}` : '/images/no_image_placeholder.png'}
                                alt={selectedImage.judul}
                                className="w-full h-auto max-h-[59vh] object-contain mx-auto"
                            />
                            
                            {/* Carousel Navigation - Only show if multiple photos */}
                            {selectedImage.photos && selectedImage.photos.length > 1 && (
                                <>
                                    {/* Previous Button */}
                                    <button
                                        onClick={handlePrevPhoto}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 text-gray-800 p-4 rounded-full transition-all shadow-lg hover:scale-110"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    
                                    {/* Next Button */}
                                    <button
                                        onClick={handleNextPhoto}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 text-gray-800 p-4 rounded-full transition-all shadow-lg hover:scale-110"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                    
                                    {/* Dot Indicators */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2">
                                        {selectedImage.photos.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentPhotoIndex(index)}
                                                className={`transition-all rounded-full ${
                                                    index === currentPhotoIndex 
                                                        ? 'w-6 h-2 bg-white' 
                                                        : 'w-2 h-2 bg-white/50 hover:bg-white/75'
                                                }`}
                                                aria-label={`Go to photo ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                    
                                    {/* Photo Counter Badge */}
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                                        {currentPhotoIndex + 1} / {selectedImage.photos.length}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Image Info */}
                        <div className="bg-white rounded-lg p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryBadgeColor(selectedImage.kategori)}`}>
                                            {getCategoryName(selectedImage.kategori)}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {new Date(selectedImage.tanggal).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedImage.judul}</h2>
                                    <p className="text-gray-600 mb-4">{selectedImage.deskripsi}</p>
                                    
                                    {/* Uploader Info */}
                                    <div className="flex items-center space-x-4 mb-4 p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-prismarine rounded-full flex items-center justify-center text-white font-bold">
                                                {selectedImage.user?.name?.charAt(0) || 'U'}
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500">Diupload oleh</div>
                                                <div className="font-semibold text-gray-800">{selectedImage.user?.name}</div>
                                                <div className="text-xs text-gray-600">{selectedImage.user?.nim}</div>
                                            </div>
                                        </div>
                                        <div className="h-8 w-px bg-gray-300"></div>
                                        {/* <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>Foto oleh: <strong>{selectedImage.photographer}</strong></span>
                                        </div> */}
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 text-gray-600">
                                    <button 
                                        onClick={(e) => handleToggleLike(selectedImage.id, e)}
                                        className={`flex items-center space-x-2 transition-colors ${
                                            selectedImage.is_liked 
                                                ? 'text-red-500 hover:text-red-600' 
                                                : 'hover:text-red-500'
                                        }`}
                                    >
                                        <svg className="w-6 h-6" fill={selectedImage.is_liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                        </svg>
                                        <span className="font-semibold">{selectedImage.like}</span>
                                    </button>
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span className="font-semibold">{selectedImage.view}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button 
                                    onClick={handleDownload}
                                    className="flex-1 px-6 py-3 bg-prismarine text-white rounded-lg hover:bg-prismarine/90 transition-colors font-semibold flex items-center justify-center space-x-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    <span>Download Foto</span>
                                </button>
                                <button 
                                    onClick={handleShare}
                                    className="px-6 py-3 border border-prismarine text-prismarine rounded-lg hover:bg-prismarine/10 transition-colors font-semibold flex items-center justify-center space-x-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                    <span>Bagikan</span>
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
