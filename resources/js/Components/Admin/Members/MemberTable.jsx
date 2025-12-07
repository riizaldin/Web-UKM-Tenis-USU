import React from 'react';
import { Link } from '@inertiajs/react';
import Badge from '@/Components/Admin/Absensi/Badge';
import Button from '@/Components/Admin/Absensi/Button';
import EmptyState from '@/Components/Admin/Absensi/EmptyState';
import { Users, Eye, Trash2 } from 'lucide-react';

export default function MemberTable({ members, onViewDetail, onDelete }) {
  if (members.length === 0) {
    return (
      <EmptyState
        icon={<Users className="w-full h-full" />}
        title="Tidak ada anggota ditemukan"
        description="Coba ubah filter atau kata kunci pencarian"
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              NIM
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fakultas
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status Re-reg
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {members.map((member) => (
            <tr key={member.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    {member.profile_photo_url ? (
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={member.profile_photo_url}
                        alt={member.name}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className={`h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-md ${member.profile_photo_url ? 'hidden' : ''}`}>
                      <span className="text-white font-bold text-sm">
                        {member.name.split(' ').map(n => n.charAt(0)).join('').substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{member.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {member.nim}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {member.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {member.fakultas || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant={member.re_reg_date ? 'success' : 'warning'}>
                  {member.re_reg_date ? 'Sudah Re-reg' : 'Belum Re-reg'}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="info"
                    size="sm"
                    icon={<Eye className="w-4 h-4" />}
                    onClick={() => onViewDetail(member)}
                  >
                    Detail
                  </Button>
                  <Link href={`/admin/members/${member.id}`}>
                    <Button variant="outline" size="sm">
                      Profil Lengkap
                    </Button>
                  </Link>
                  <button
                    onClick={() => onDelete(member)}
                    className="px-3 py-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-semibold flex items-center gap-1"
                    title="Hapus anggota"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}