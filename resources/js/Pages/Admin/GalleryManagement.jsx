import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import { ArrowLeft, Trash2, Eye, User, Calendar, Heart, Image as ImageIcon } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { Head } from '@inertiajs/react';

const formatDate = (date) => {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

const getCategoryColor = (category) => {
  const colors = {
    latihan: 'bg-blue-100 text-blue-700',
    turnamen: 'bg-purple-100 text-purple-700',
    event: 'bg-green-100 text-green-700',
    prestasi: 'bg-yellow-100 text-yellow-700',
  };
  return colors[category] || 'bg-gray-100 text-gray-700';
};

export default function GalleryManagement({ auth, galleries = [] }) {
  const today = new Date();
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteType, setDeleteType] = useState(null); // 'gallery' or 'photo'
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredGalleries = galleries.filter(gallery => {
    const matchesSearch = gallery.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gallery.uploaded_by.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || gallery.kategori === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteGallery = (gallery) => {
    setDeleteType('gallery');
    setDeleteTarget(gallery);
    setIsDeleteModalOpen(true);
  };

  const handleDeletePhoto = (photo, gallery) => {
    setDeleteType('photo');
    setDeleteTarget({ photo, gallery });
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteType === 'gallery') {
      router.delete(route('admin.gallery.delete', deleteTarget.id), {
        onSuccess: () => {
          toast.success('Galeri berhasil dihapus!');
          setIsDeleteModalOpen(false);
        },
        onError: () => {
          toast.error('Gagal menghapus galeri');
        }
      });
    } else if (deleteType === 'photo') {
      router.delete(route('admin.gallery.photo.delete', deleteTarget.photo.id), {
        onSuccess: () => {
          toast.success('Foto berhasil dihapus!');
          setIsDeleteModalOpen(false);
        },
        onError: () => {
          toast.error('Gagal menghapus foto');
        }
      });
    }
  };

  const viewGalleryDetail = (gallery) => {
    setSelectedGallery(gallery);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Head title="Manajemen Galeri" />
      <Sidebar/>
      <ToastContainer position="top-center" autoClose={1300} />

      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 text-blue-600 hover:bg-blue-50 rounded-md">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h2 className="text-sm text-gray-500">{formatDate(today)}</h2>
              <h1 className="text-3xl font-semibold mt-1">Manajemen Galeri</h1>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Galeri</p>
                <p className="text-2xl font-bold text-gray-800">{galleries.length}</p>
              </div>
              <ImageIcon className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Foto</p>
                <p className="text-2xl font-bold text-gray-800">
                  {galleries.reduce((sum, g) => sum + g.photos_count, 0)}
                </p>
              </div>
              <ImageIcon className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Views</p>
                <p className="text-2xl font-bold text-gray-800">
                  {galleries.reduce((sum, g) => sum + g.view, 0)}
                </p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Likes</p>
                <p className="text-2xl font-bold text-gray-800">
                  {galleries.reduce((sum, g) => sum + g.likes_count, 0)}
                </p>
              </div>
              <Heart className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Filter & Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Cari galeri..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Semua Kategori</option>
              <option value="latihan">Latihan</option>
              <option value="turnamen">Turnamen</option>
              <option value="event">Event</option>
              <option value="prestasi">Prestasi</option>
            </select>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGalleries.map((gallery) => (
            <div key={gallery.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* Gallery Preview */}
              <div className="relative h-48 bg-gray-200">
                {gallery.photos.length > 0 ? (
                  <img
                    src={gallery.photos[0].photo_url}
                    alt={gallery.judul}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${getCategoryColor(gallery.kategori)}`}>
                  {gallery.kategori}
                </span>
              </div>

              {/* Gallery Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{gallery.judul}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{gallery.deskripsi}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="w-4 h-4" />
                    <span>{gallery.uploaded_by} ({gallery.uploaded_by_nim})</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(gallery.created_at).toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <ImageIcon className="w-4 h-4" />
                      {gallery.photos_count} foto
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {gallery.view}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {gallery.likes_count}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => viewGalleryDetail(gallery)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Lihat Detail
                  </button>
                  <button
                    onClick={() => handleDeleteGallery(gallery)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGalleries.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Tidak ada galeri ditemukan</p>
          </div>
        )}
      </div>

      {/* Gallery Detail Modal */}
      {selectedGallery && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">{selectedGallery.judul}</h2>
                <button
                  onClick={() => setSelectedGallery(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <p className="text-gray-600 mb-4">{selectedGallery.deskripsi}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getCategoryColor(selectedGallery.kategori)}`}>
                    {selectedGallery.kategori}
                  </span>
                  <span>Lokasi: {selectedGallery.lokasi || '-'}</span>
                  <span>Tanggal: {selectedGallery.tanggal || '-'}</span>
                </div>
              </div>

              <h3 className="font-semibold mb-4">Foto ({selectedGallery.photos.length})</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedGallery.photos.map((photo) => (
                  <div key={photo.id} className="relative group">
                    <img
                      src={photo.photo_url}
                      alt="Gallery"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleDeletePhoto(photo, selectedGallery)}
                      className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Konfirmasi Hapus</h3>
            <p className="text-gray-600 mb-6">
              {deleteType === 'gallery'
                ? `Apakah Anda yakin ingin menghapus galeri "${deleteTarget?.judul}"? Semua foto dalam galeri ini akan ikut terhapus.`
                : 'Apakah Anda yakin ingin menghapus foto ini?'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
