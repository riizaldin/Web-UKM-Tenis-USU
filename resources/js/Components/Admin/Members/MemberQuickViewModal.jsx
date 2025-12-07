import React from 'react';
import { Link } from '@inertiajs/react';
import Modal from '@/Components/Admin/Absensi/Modal';
import Button from '@/Components/Admin/Absensi/Button';
import Badge from '@/Components/Admin/Absensi/Badge';
import EmptyState from '@/Components/Admin/Absensi/EmptyState';
import { User, FileText, Calendar, DollarSign, ExternalLink } from 'lucide-react';

export default function MemberQuickViewModal({ isOpen, onClose, member }) {
  if (!member) return null;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Detail ${member.name}`}
      icon={<User className="w-5 h-5 text-purple-600" />}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Biodata */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Biodata / Akun Peserta
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Nama Lengkap</p>
              <p className="font-medium">{member.name}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">NIM</p>
              <p className="font-medium">{member.nim}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Email</p>
              <p className="font-medium">{member.email}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">No. WhatsApp</p>
              <p className="font-medium">{member.no_whatsapp || '-'}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Fakultas</p>
              <p className="font-medium">{member.fakultas || '-'}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Jurusan</p>
              <p className="font-medium">{member.jurusan || '-'}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Angkatan</p>
              <p className="font-medium">{member.angkatan || '-'}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Status Re-reg</p>
              <Badge variant={member.re_reg_date ? 'success' : 'warning'}>
                {member.re_reg_date ? 'Sudah' : 'Belum'}
              </Badge>
            </div>
            {member.ktm_url && (
              <div className="col-span-2">
                <p className="text-gray-500 mb-2">KTM</p>
                <img 
                  src={member.ktm_url} 
                  alt="KTM" 
                  className="w-48 h-32 object-cover rounded-md border" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-48 h-32 rounded-md border bg-gradient-to-br from-gray-100 to-gray-200 hidden items-center justify-center">
                  <div className="text-center">
                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs text-gray-500">Tidak ada gambar</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Log Aktivitas */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Log Aktivitas
          </h4>
          {member.logs?.length > 0 ? (
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {member.logs.map((log, index) => (
                <li 
                  key={index} 
                  className="text-sm text-gray-600 bg-white p-3 rounded-md border border-gray-200"
                >
                  <span className="font-medium">{log.date}:</span> {log.action} - {log.description}
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              icon={<Calendar className="w-full h-full" />}
              title="Tidak ada log aktivitas"
              description=""
            />
          )}
        </div>

        {/* Perincian Kas */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Perincian Kas
          </h4>
          <div className="text-sm">
            <div className="bg-green-50 p-3 rounded-lg mb-3">
              <p className="text-gray-600 mb-1">Total Kas</p>
              <p className="text-xl font-bold text-green-600">
                {formatCurrency(member.kas_details?.total || 0)}
              </p>
            </div>
            
            {member.kas_details?.transactions?.length > 0 ? (
              <ul className="space-y-2 max-h-48 overflow-y-auto">
                {member.kas_details.transactions.map((tx, index) => (
                  <li 
                    key={index} 
                    className="flex justify-between items-center text-gray-600 bg-white p-3 rounded-md border border-gray-200"
                  >
                    <div>
                      <span className="font-medium">{tx.date}:</span> {tx.description}
                    </div>
                    <span className={`font-bold ${
                      tx.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                icon={<DollarSign className="w-full h-full" />}
                title="Tidak ada transaksi kas"
                description=""
              />
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Link href={`/admin/members/${member.id}`} className="flex-1">
            <Button
              variant="primary"
              icon={<ExternalLink className="w-4 h-4" />}
              className="w-full"
            >
              Lihat Profil Lengkap
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Tutup
          </Button>
        </div>
      </div>
    </Modal>
  );
}