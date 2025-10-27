import React from 'react';
import { Link } from '@inertiajs/react';
import Button from '@/Components/Admin/Absensi/Button';
import Badge from '@/Components/Admin/Absensi/Badge';
import EmptyState from '@/Components/Admin/Absensi/EmptyState';
import { DollarSign, Plus } from 'lucide-react';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};

export default function MemberPaymentCard({ member, onAddPayment }) {
  const kasDetails = member?.kas_details || {};
  const transactions = kasDetails.transactions || [];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          Pembayaran Kas
        </h3>
        <Button
          variant="success"
          icon={<Plus className="w-4 h-4" />}
          onClick={onAddPayment}
          size="sm"
        >
          Tambah Pembayaran
        </Button>
      </div>

      {/* Total Kas */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl mb-6">
        <p className="text-sm text-gray-600 mb-1">Total Kas</p>
        <p className="text-2xl font-bold text-green-600">
          {formatCurrency(kasDetails.total || 0)}
        </p>
      </div>
      
      {/* Transactions List */}
      {transactions.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {transactions.map((tx, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Tanggal</p>
                  <p className="text-sm font-semibold">{tx.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Deskripsi</p>
                  <p className="text-sm">{tx.description}</p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Jumlah</p>
                  <p className={`text-lg font-bold ${
                    tx.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </p>
                </div>
                <Badge variant={tx.type === 'income' ? 'success' : 'danger'}>
                  {tx.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<DollarSign className="w-full h-full" />}
          title="Belum ada riwayat pembayaran"
          description="Riwayat pembayaran kas akan muncul di sini"
        />
      )}
    </div>
  );
}