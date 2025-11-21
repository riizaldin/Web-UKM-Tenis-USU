import React, { useState, useMemo } from 'react';
import AppLayout from '@/Layouts/AppLayout';

export default function Reports({ auth, expenses, income}) {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    // robust formatter (handles null/undefined/strings)
    const formatCurrency = (amount) => {
        const n = Number(amount);
        // if not a finite number, treat as 0
        const safe = Number.isFinite(n) ? n : 0;
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(safe);
    };

    // Helper to parse date safely
    const safeDate = (d) => {
        const date = new Date(d);
        return isNaN(date.getTime()) ? null : date;
    };

    // Filter expenses by selected month and year (skip invalid dates)
    const filteredExpenses = useMemo(() => {
        if (!Array.isArray(expenses)) return [];
        return expenses.filter(expense => {
            const expenseDate = safeDate(expense.date);
            if (!expenseDate) return false;
            return expenseDate.getMonth() === selectedMonth &&
                expenseDate.getFullYear() === selectedYear;
        });
    }, [expenses, selectedMonth, selectedYear]);

    // Filter income by selected month and year (skip invalid dates)
    const filteredIncome = useMemo(() => {
        if (!Array.isArray(income)) return [];
        return income.filter(item => {
            const incomeDate = safeDate(item.submitted_at ?? item.date ?? item.created_at);
            if (!incomeDate) return false;
            return incomeDate.getMonth() === selectedMonth &&
                incomeDate.getFullYear() === selectedYear;
        });
    }, [income, selectedMonth, selectedYear]);

    // Totals with numeric coercion and fallback
    const filteredTotalExpense = useMemo(() => {
        return filteredExpenses.reduce((sum, expense) => {
            const amt = Number(expense.amount);
            return sum + (Number.isFinite(amt) ? amt : 0);
        }, 0);
    }, [filteredExpenses]);

    const filteredTotalIncome = useMemo(() => {
        return filteredIncome.reduce((sum, item) => {
            const amt = Number(item.amount);
            return sum + (Number.isFinite(amt) ? amt : 0);
        }, 0);
    }, [filteredIncome]);

    const filteredBalance = filteredTotalIncome - filteredTotalExpense;

    // Generate month options
    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    // Generate year options (current year and 2 years back)
    const currentYear = new Date().getFullYear();
    const years = [currentYear - 3 , currentYear - 2, currentYear - 1, currentYear];


    return (
        <AppLayout title="Laporan" auth={auth}>
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Laporan UKM</h1>
                    <p className="text-lg text-white/90">
                        Akses laporan keuangan UKM Tenis USU
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div>
                    {/* Filter Section */}
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Filter Laporan</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Month Selector */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Bulan
                                </label>
                                <select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {months.map((month, index) => (
                                        <option key={index} value={index}>
                                            {month}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Year Selector */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tahun
                                </label>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mt-4 text-sm text-gray-600">
                            Menampilkan laporan untuk <span className="font-semibold">{months[selectedMonth]} {selectedYear}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Total Income */}
                        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold opacity-90">Total Pemasukan</h3>
                                <div className="bg-white/20 p-2 rounded-lg">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-3xl font-bold mb-2">{formatCurrency(filteredTotalIncome)}</div>
                            <div className="text-sm opacity-75">{months[selectedMonth]} {selectedYear}</div>
                        </div>

                        {/* Total Expense */}
                        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold opacity-90">Total Pengeluaran</h3>
                                <div className="bg-white/20 p-2 rounded-lg">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-3xl font-bold mb-2">{formatCurrency(filteredTotalExpense)}</div>
                            <div className="text-sm opacity-75">{months[selectedMonth]} {selectedYear}</div>
                        </div>

                        {/* Balance */}
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold opacity-90">Saldo Akhir</h3>
                                <div className="bg-white/20 p-2 rounded-lg">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-3xl font-bold mb-2">{formatCurrency(filteredBalance)}</div>
                            <div className="text-sm opacity-75">
                                {filteredBalance >= 0 ? 'Surplus' : 'Defisit'}
                            </div>
                        </div>
                    </div>

                    {/* Income & Expense Tables */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Income Table */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="p-6 bg-green-50 border-b border-green-200">
                                <h3 className="text-lg font-bold text-green-800 flex items-center">
                                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                    </svg>
                                    Pemasukan
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {filteredIncome.length > 0 ? (
                                        filteredIncome.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div>
                                                    <div className="font-semibold text-gray-800">{item.bill?.title ?? '-'}</div>
                                                    <div className="text-sm text-gray-600 mt-1">
                                                        {new Date(item.submitted_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-1">Dibayar oleh: {item.user?.name ?? '-'}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-green-600 text-lg">
                                                        {formatCurrency(item.amount)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            Tidak ada data pemasukan untuk bulan ini
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-gray-800">Total Pemasukan</span>
                                        <span className="font-bold text-green-600 text-xl">
                                            {formatCurrency(filteredTotalIncome)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Expense Table */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="p-6 bg-red-50 border-b border-red-200">
                                <h3 className="text-lg font-bold text-red-800 flex items-center">
                                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                    </svg>
                                    Pengeluaran
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {filteredExpenses.length > 0 ? (
                                        filteredExpenses.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div>
                                                    <div className="font-semibold text-gray-800">{item.expense ? item.expense : '-'}</div>
                                                    <div className="text-sm text-gray-600 mt-1">
                                                        {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' , year: 'numeric' })}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-red-600 text-lg">
                                                        {formatCurrency(item.amount)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            Tidak ada data pengeluaran untuk bulan ini
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-gray-800">Total Pengeluaran</span>
                                        <span className="font-bold text-red-600 text-xl">
                                            {formatCurrency(filteredTotalExpense)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
