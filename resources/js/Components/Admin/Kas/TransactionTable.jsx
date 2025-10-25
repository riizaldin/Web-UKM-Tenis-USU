import React from 'react';
import { Link } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import Badge from '@/Components/Admin/Absensi/Badge';

export default function TransactionTable({ transactions, type = 'income' }) {
  const isIncome = type === 'income';

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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Kategori
            </th>
            {isIncome && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Metode
              </th>
            )}
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Jumlah
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {tx.category}
              </td>
              {isIncome && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Badge 
                    variant={tx.payment_method === 'cash' ? 'info' : 'purple'}
                  >
                    {tx.payment_method === 'cash' ? 'Cash' : 'Transfer'}
                  </Badge>
                </td>
              )}
              <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${
                isIncome ? 'text-green-600' : 'text-red-600'
              }`}>
                {isIncome ? '+' : '-'}Rp {tx.amount.toLocaleString('id-ID')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <Badge 
                  variant={tx.status === 'approved' ? 'success' : 'warning'}
                >
                  {tx.status === 'approved' ? 'Disetujui' : 'Pending'}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {tx.proof_url ? (
                  <Link 
                    href={tx.proof_url} 
                    target="_blank" 
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    Lihat
                  </Link>
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