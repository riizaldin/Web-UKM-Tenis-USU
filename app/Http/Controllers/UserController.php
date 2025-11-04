<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Event;
use App\Models\Absensi;
use Illuminate\Http\Request;
use Carbon\Carbon;

class UserController extends Controller
{
    // Schedules
    public function schedules(){
        $auth = auth()->user();
        $events = Event::withCount('attendance')->orderBy('tanggal', 'desc')->orderBy('waktu_mulai', 'desc')->get();

        return Inertia::render('Schedules', [
            'auth' => [
                'user' => $auth,
            ],
            'schedules' => $events,
        ]);

    }

    // Attendance
    public function attendance(){
        $auth = auth()->user();

        $attendances = Absensi::with('event:id,nama_event')->where('user_id', auth()->id())->get();

        $event_count = Event::count();
        return Inertia::render('Attendance', [
            'auth' => [
                'user' => $auth,
            ],
            'attendance' => $attendances,
            'event_count' => $event_count,
        ]);
    }

    public function setAttendance(Request $request){
        $id = $request->query('id');

        $validated = $request->validate([
            'attendanceCode' => 'required|string|max:255',
        ]);

        $code = $validated['attendanceCode'];

        $event = Event::where('kode_absensi', $code)->first();

        if (!$event) {
            return redirect()->route('attendance')->with('error', 'Kode absensi tidak valid');
        }

        $existingAbsensi = Absensi::where('user_id', auth()->id())
            ->where('event_id', $event->id)
            ->first();

        if ($existingAbsensi) {
            return redirect()->route('attendance')->with('error', 'Anda sudah absen untuk kegiatan ini');
        }

        $today = Carbon::today()->toDateString();
        if ($event->tanggal !== $today) {
            return redirect()->route('attendance')->with('error', 'Absensi hanya bisa dilakukan pada hari kegiatan');
        }

        try {
            $start = Carbon::createFromFormat('Y-m-d H:i:s', "{$event->tanggal} {$event->waktu_mulai}", 'Asia/Jakarta');
        } catch (\Exception $e) {
            return redirect()->route('attendance')->with('error', 'Waktu kegiatan tidak valid');
        }

        $now = Carbon::now('Asia/Jakarta');
        
        if ($event->waktu_selesai) {
            try {
                $end = Carbon::createFromFormat('Y-m-d H:i:s', "{$event->tanggal} {$event->waktu_selesai}", 'Asia/Jakarta');
            } catch (\Exception $e) {   
                return redirect()->route('attendance')->with('error', 'Waktu kegiatan tidak valid');
            }

            if ($end->lessThanOrEqualTo($start)) {
                $end->addDay();
            }

            if (!$now->between($start, $end, true)) {
                return redirect()->route('attendance')->with('error', 'Absensi hanya bisa dilakukan saat kegiatan berlangsung!');
            }
        } else {
            if (!$now->isSameDay($start) || $now->lessThan($start)) {
                return redirect()->route('attendance')->with('error', 'Absensi hanya bisa dilakukan setelah kegiatan dimulai!');
            }
        }

        Absensi::create([
            'user_id' => auth()->id(),
            'event_id' => $event->id,
            'waktu_absen' => now(),
            'status' => 'hadir',
        ]);

        return redirect()->route('attendance')->with('success', 'Absensi berhasil dicatat!');
    }
}
