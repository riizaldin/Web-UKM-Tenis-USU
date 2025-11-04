<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Event;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class AdminController extends Controller
{
    private function generateUniqueKodeAbsen(){
        do {
            $kode = Str::upper(Str::random(10));
        } while (Event::where('kode_absensi', $kode)->exists());

        return $kode;
    }

    public function index(){
        return Inertia::render('AdminPage');
    }

    public function member(){
        return Inertia::render('Admin/Members');
    }

    public function showMembers($id)
    {
        $user = User::with(['logs', 'kasTransactions'])  // Load relasi (sekarang kasTransactions ready)
                    ->findOrFail($id);

        // Hitung total kas: income positif, expense negatif
        $totalKas = $user->kasTransactions->sum(function ($tx) {
            return $tx->type === 'income' ? $tx->amount : -$tx->amount;
        });

        $transformedUser = [
            'id' => $user->id,
            'name' => $user->name,
            'username' => $user->username ?? 'Tidak tersedia',
            'nim' => $user->nim ?? 'Tidak tersedia',
            'fakultas' => $user->fakultas ?? 'Tidak tersedia',
            'jurusan' => $user->jurusan ?? 'Tidak tersedia',
            'angkatan' => $user->angkatan ?? 'Tidak tersedia',
            'no_whatsapp' => $user->no_whatsapp ?? 'Tidak tersedia',
            'email' => $user->email,
            'email_verified_at' => $user->email_verified_at?->format('Y-m-d H:i') ?? null,
            'phone' => $user->no_whatsapp ?? 'Tidak tersedia',
            'address' => 'Tidak tersedia',  // Tambah field nanti
            'profile_photo_url' => $user->pasfoto ? Storage::url($user->pasfoto) : null,
            'ktm_url' => $user->ktm ? Storage::url($user->ktm) : null,
            're_reg_date' => null,  // Tambah field nanti
            'status' => 'active',
            'joined_at' => $user->created_at?->format('Y-m-d'),
            'logs' => $user->logs->map(function ($log) {
                return [
                    'date' => $log->created_at?->format('Y-m-d H:i'),
                    'action' => $log->action ?? 'Unknown',
                    'description' => $log->description ?? 'No description',
                ];
            }),
            'kas_details' => [
                'total' => $totalKas,  // Hitung real dari relasi
                'transactions' => $user->kasTransactions->map(function ($tx) {
                    return [
                        'date' => $tx->created_at?->format('Y-m-d'),
                        'description' => $tx->description ?? 'No description',
                        'amount' => $tx->amount,  // Tampilkan positif, sign dari type
                        'type' => $tx->type,  // 'income' atau 'expense'
                    ];
                }),
            ],
        ];

        return inertia('Admin/MemberDetail', [
            'member' => $transformedUser,
            'auth' => auth()->user(),
        ]);
    }

    public function attendance(){

        $attendances = Event::withCount('attendance')->orderBy('tanggal', 'desc')->orderBy('waktu_mulai', 'desc')->get();

        return Inertia::render('Admin/Absensi', [ 
            'attendances' => $attendances,
            'auth' => auth()->user(),
        ]);
    }

    public function storeAttendance(Request $request){

        $request->validate([
            'date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required',
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:latihan,turnamen,lainnya',
            'location' => 'required|string|max:255',
            'description' => 'required|string',
            'pelatih' => 'nullable|string|max:255',
            'hadiah' => 'nullable|string|max:255',
        ]);

        $kodeAbsensi = $this->generateUniqueKodeAbsen();

        // Simpan data absensi ke database
        Event::create([
            'tanggal' => $request->input('date'),
            'waktu_mulai' => $request->input('start_time'),
            'waktu_selesai' => $request->input('end_time'),
            'nama_event' => $request->input('name'),
            'tipe' => $request->input('type'),
            'lokasi' => $request->input('location'),
            'deskripsi' => $request->input('description'),
            'pelatih' => $request->input('pelatih'),
            'hadiah' => $request->input('hadiah'),
            'kode_absensi' => $kodeAbsensi,
        ]);

        return redirect()->route('admin.attendance')->with('message', 'Absensi berhasil dibuat!');
    }
}
