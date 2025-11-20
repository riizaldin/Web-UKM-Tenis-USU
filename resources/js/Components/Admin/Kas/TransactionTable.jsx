import React from 'react';
import { Link } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import Badge from '@/Components/Admin/Absensi/Badge';

export default function TransactionTable({ transactions, type = 'income' }) {

  return (
    <div className="overflow-x-auto max-h-96 overflow-y-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tanggal
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Deskripsi
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Jumlah
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Bukti
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(tx.date).toLocaleDateString('id-ID')}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                {tx.description}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-red-600`}>
                - Rp {Number(tx.amount).toLocaleString('id-ID')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {tx.proof_image ? (
                  <a
                    href={`/admin/kas/expense/proof/${tx.proof_image}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    Lihat
                  </a>
                ) : (
                  <span className="text-gray-400">Tidak ada</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}