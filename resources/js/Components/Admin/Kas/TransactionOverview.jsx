import React from 'react';

export default function TransactionOverview({ totalKas, totalIncome, totalExpense }) {
  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Total Kas</h4>
        <p className="text-2xl font-bold text-gray-900">
          Rp {totalKas?.toLocaleString('id-ID') || 0}
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Pemasukan</h4>
        <p className="text-2xl font-bold text-green-600">
          Rp {totalIncome?.toLocaleString('id-ID') || 0}
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Pengeluaran</h4>
        <p className="text-2xl font-bold text-red-600">
          Rp {totalExpense?.toLocaleString('id-ID') || 0}
        </p>
      </div>
    </div>
  );
}