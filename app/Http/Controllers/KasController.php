<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class KasController extends Controller
{
    public function index () {
        $transactions = [
            [
                'id' => 1,
                'date' => '2025-10-20',
                'description' => 'Iuran bulanan Ade',
                'amount' => 50000,
                'type' => 'income',
                'category' => 'Iuran Anggota',
                'status' => 'approved',
                'proof_url' => null,  // Gak ada untuk income
            ],
            [
                'id' => 2,
                'date' => '2025-10-19',
                'description' => 'Biaya cetak banner rapat',
                'amount' => 150000,
                'type' => 'expense',
                'category' => 'Biaya Kegiatan',
                'status' => 'approved',
                'proof_url' => '/storage/proof/banner-kwitansi.jpg',  // Dummy URL bukti
            ],
            [
                'id' => 3,
                'date' => '2025-10-15',
                'description' => 'Donasi sponsor event',
                'amount' => 200000,
                'type' => 'income',
                'category' => 'Sponsor',
                'status' => 'pending',
                'proof_url' => null,
            ],
            [
                'id' => 4,
                'date' => '2025-10-18',
                'description' => 'Beli alat olahraga',
                'amount' => 300000,
                'type' => 'expense',
                'category' => 'Alat & Perlengkapan',
                'status' => 'approved',
                'proof_url' => '/storage/proof/alat-struk.pdf',
            ],
        ];

        $totalIncome = collect($transactions)->where('type', 'income')->sum('amount');
        $totalExpense = collect($transactions)->where('type', 'expense')->sum('amount');
        $totalKas = $totalIncome - $totalExpense;

        return Inertia::render('Admin/Kas', [
            'transactions' => $transactions,
            'total_kas' => $totalKas,
            'total_income' => $totalIncome,
            'total_expense' => $totalExpense,
            'auth' => auth()->user(),
        ]);
    }
}
