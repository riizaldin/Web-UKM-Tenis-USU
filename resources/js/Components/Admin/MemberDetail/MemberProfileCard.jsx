import React from 'react';
import Button from '@/Components/Admin/Absensi/Button';
import Badge from '@/Components/Admin/Absensi/Badge';
import { User, FileText, Phone, Mail, MapPin, Camera, GraduationCap, Edit3, Trash2, ImageIcon } from 'lucide-react';

export default function MemberProfileCard({ member, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <User className="w-5 h-5 text-purple-600" />
          Profil & Biodata
        </h3>
        <div className="flex gap-2">
          <Button
            variant="info"
            icon={<Edit3 className="w-4 h-4" />}
            onClick={onEdit}
            size="sm"
          >
            Edit
          </Button>
          <Button
            variant="danger"
            icon={<Trash2 className="w-4 h-4" />}
            onClick={onDelete}
            size="sm"
          >
            Hapus
          </Button>
        </div>
      </div>
      
      <div className="flex items-start gap-8 mb-8">
        {/* Pas Foto */}
        <div className="flex-shrink-0">
          {member?.profile_photo_url ? (
            <img
              src={member.profile_photo_url}
              alt="Pas Foto"
              className="w-32 h-32 object-cover rounded-full border-4 border-gray-200 shadow-md"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
              <Camera className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>
        
        {/* Biodata Grid */}
        <div className="flex-1 grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Nama Lengkap
            </p>
            <p className="text-lg font-semibold">{member?.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Username
            </p>
            <p className="text-lg font-semibold">{member?.username}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              NIM
            </p>
            <p className="text-lg font-semibold">{member?.nim}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Fakultas
            </p>
            <p className="text-lg">{member?.fakultas}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Jurusan
            </p>
            <p className="text-lg">{member?.jurusan}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Angkatan
            </p>
            <p className="text-lg">{member?.angkatan}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              No. WhatsApp
            </p>
            <p className="text-lg">{member?.no_whatsapp}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </p>
            <p className="text-lg">{member?.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Verifikasi Email</p>
            <Badge variant={member?.email_verified_at ? 'success' : 'warning'}>
              {member?.email_verified_at ? 'Terverifikasi' : 'Belum Terverifikasi'}
            </Badge>
          </div>
          <div className="col-span-2">
            <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Alamat
            </p>
            <p className="text-lg">{member?.address}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Status Re-reg</p>
            <Badge variant="warning">Belum Diimplementasi</Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Status Keanggotaan</p>
            <Badge variant="success">{member?.status || 'Aktif'}</Badge>
          </div>
        </div>
      </div>

      {/* KTM jika ada */}
      {member?.ktm_url && (
        <div className="border-t pt-6">
          <p className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Kartu Tanda Mahasiswa (KTM)
          </p>
          <img
            src={member.ktm_url}
            alt="KTM"
            className="w-full max-w-md h-48 object-cover rounded-xl shadow-md"
          />
        </div>
      )}
    </div>
  );
}