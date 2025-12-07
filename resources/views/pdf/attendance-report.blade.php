<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Kehadiran</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            font-size: 11px;
            line-height: 1.4;
            color: #333;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 3px solid #16a34a;
            position: relative;
        }
        
        .header .logo {
            margin-bottom: 15px;
        }
        
        .header .logo img {
            width: 80px;
            height: auto;
        }
        
        .header h1 {
            font-size: 18px;
            font-weight: bold;
            color: #15803d;
            margin-bottom: 5px;
        }
        
        .header p {
            font-size: 10px;
            color: #666;
        }
        
        .info-box {
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 25px;
        }
        
        .info-row {
            display: table;
            width: 100%;
            margin-bottom: 8px;
        }
        
        .info-label {
            display: table-cell;
            width: 30%;
            font-weight: 600;
            color: #475569;
        }
        
        .info-value {
            display: table-cell;
            color: #1e293b;
        }
        
        .summary-box {
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 25px;
        }
        
        .summary-title {
            font-size: 13px;
            font-weight: bold;
            color: #15803d;
            margin-bottom: 12px;
            text-transform: uppercase;
        }
        
        .summary-grid {
            display: table;
            width: 100%;
        }
        
        .summary-row {
            display: table-row;
        }
        
        .summary-label {
            display: table-cell;
            padding: 6px 0;
            font-weight: 600;
            color: #475569;
        }
        
        .summary-value {
            display: table-cell;
            padding: 6px 0;
            text-align: right;
            font-weight: bold;
            color: #1e293b;
        }
        
        .section-title {
            font-size: 13px;
            font-weight: bold;
            color: #fff;
            background: #16a34a;
            padding: 8px 12px;
            margin-bottom: 10px;
            text-transform: uppercase;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }
        
        table thead {
            background: #f1f5f9;
        }
        
        table th {
            padding: 8px;
            text-align: left;
            font-weight: bold;
            font-size: 10px;
            color: #15803d;
            border-bottom: 2px solid #cbd5e1;
        }
        
        table td {
            padding: 7px 8px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 10px;
        }
        
        table tbody tr:nth-child(even) {
            background: #fafafa;
        }
        
        .text-right {
            text-align: right;
        }
        
        .text-center {
            text-align: center;
        }
        
        .badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 9px;
            font-weight: 600;
        }
        
        .badge-hadir {
            background: #dcfce7;
            color: #166534;
        }
        
        .badge-izin {
            background: #dbeafe;
            color: #1e40af;
        }
        
        .badge-alpa {
            background: #fee2e2;
            color: #991b1b;
        }
        
        .footer {
            margin-top: 40px;
            padding-top: 15px;
            border-top: 1px solid #e2e8f0;
            text-align: center;
            font-size: 9px;
            color: #94a3b8;
        }
        
        .no-data {
            text-align: center;
            padding: 20px;
            color: #94a3b8;
            font-style: italic;
        }
        
        .signature-section {
            margin-top: 40px;
            text-align: right;
        }
        
        .signature-box {
            display: inline-block;
            text-align: center;
        }
        
        .signature-box p {
            margin: 5px 0;
            font-size: 11px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">
            <img src="{{ public_path('images/logo.png') }}" alt="Logo UKM Tenis USU">
        </div>
        <h1>{{ $title }}</h1>
        <p>UKM Tenis Universitas Sumatera Utara</p>
        <p>Tanggal Cetak: {{ $date }}</p>
    </div>

    <!-- Info Anggota -->
    <div class="info-box">
        <div class="info-row">
            <div class="info-label">Nama:</div>
            <div class="info-value">{{ $user->name }}</div>
        </div>
        <div class="info-row">
            <div class="info-label">NIM:</div>
            <div class="info-value">{{ $user->nim ?? '-' }}</div>
        </div>
        <div class="info-row">
            <div class="info-label">Email:</div>
            <div class="info-value">{{ $user->email }}</div>
        </div>
        <div class="info-row">
            <div class="info-label">Jabatan:</div>
            <div class="info-value">{{ ucwords(str_replace('_', ' ', $user->jabatan ?? 'Anggota')) }}</div>
        </div>
    </div>

    <!-- Summary Box -->
    <div class="summary-box">
        <div class="summary-title">Ringkasan Kehadiran</div>
        <div class="summary-grid">
            <div class="summary-row">
                <div class="summary-label">Total Hadir:</div>
                <div class="summary-value">{{ $totalHadir }} kegiatan</div>
            </div>
            <div class="summary-row">
                <div class="summary-label">Total Izin:</div>
                <div class="summary-value">{{ $totalIzin }} kegiatan</div>
            </div>
            <div class="summary-row">
                <div class="summary-label">Total Alpa:</div>
                <div class="summary-value">{{ $totalAlpa }} kegiatan</div>
            </div>
            <div class="summary-row">
                <div class="summary-label">Total Kehadiran:</div>
                <div class="summary-value">{{ $attendances->count() }} kegiatan</div>
            </div>
        </div>
    </div>

    <!-- Rincian Kehadiran -->
    <div class="section-title">Rincian Riwayat Kehadiran</div>
    @if($attendances->count() > 0)
    <table>
        <thead>
            <tr>
                <th width="5%">No</th>
                <th width="15%">Tanggal</th>
                <th width="30%">Kegiatan</th>
                <th width="20%">Lokasi</th>
                <th width="15%">Waktu Absen</th>
                <th width="15%" class="text-center">Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach($attendances as $index => $attendance)
            <tr>
                <td class="text-center">{{ $index + 1 }}</td>
                <td>{{ \Carbon\Carbon::parse($attendance->event->tanggal)->format('d/m/Y') }}</td>
                <td>{{ $attendance->event->nama_event }}</td>
                <td>{{ $attendance->event->lokasi }}</td>
                <td>{{ \Carbon\Carbon::parse($attendance->waktu_absen)->timezone('Asia/Jakarta')->format('H:i') }}</td>
                <td class="text-center">
                    <span class="badge badge-{{ strtolower($attendance->status) }}">
                        {{ ucfirst($attendance->status) }}
                    </span>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
    @else
    <div class="no-data">Belum ada data kehadiran</div>
    @endif

    <!-- Tanda Tangan -->
    <div class="signature-section">
        <div class="signature-box">
            <p>Sumatera Utara, {{ $date }}</p>
            <p style="font-weight: bold; margin-top: 5px;">Ketua UKM Tenis USU</p>
            <p style="margin-top: 80px; border-top: 1px solid #000; padding-top: 5px; display: inline-block; min-width: 250px;">
                (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
            </p>
        </div>
    </div>

    <div class="footer">
        Dokumen ini dibuat secara otomatis oleh Sistem Informasi UKM Tenis USU
    </div>
</body>
</html>
