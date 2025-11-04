import React from 'react';
import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from './Table';
import Badge from './Badge';
import Button from './Button';
import { Clock, MapPin, Users, QrCode } from 'lucide-react';

export default function AttendanceTable({ attendances, onGenerateQR, getAttendanceStatus }) {
  return (
    <Table>
      <TableHeader>
        <TableHeaderCell>Keterangan Kegiatan</TableHeaderCell>
        <TableHeaderCell>Waktu Absen</TableHeaderCell>
        <TableHeaderCell>Lokasi</TableHeaderCell>
        <TableHeaderCell align="center">Status</TableHeaderCell>
        <TableHeaderCell align="center">Jumlah Absen</TableHeaderCell>
        <TableHeaderCell align="center">Kode Absen</TableHeaderCell>
        <TableHeaderCell align="center">QR Code</TableHeaderCell>
      </TableHeader>
      <TableBody>
        {attendances.map((attendance) => {
          const status = getAttendanceStatus(attendance);
          return (
            <TableRow key={attendance.id}>
              <TableCell className="max-w-xs">
                <div className="font-medium">{attendance.nama_event}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(attendance.tanggal).toLocaleDateString('id-ID', { 
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{attendance.waktu_mulai.slice(0, 5)}</span>
                  {attendance.waktu_selesai && (
                    <>
                      <span className="text-gray-400">-</span>
                      <span>{attendance.waktu_selesai.slice(0, 5)}</span>
                    </>
                  )}
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {attendance.lokasi}
                </div>
              </TableCell>
              <TableCell align="center" className="whitespace-nowrap">
                  {status === "active" && (
                    <Badge variant="success">Aktif</Badge>
                  )}
                  {status === "selesai" && (
                    <Badge variant="gray">Selesai</Badge>
                  )}
                  {status === "upcoming" && (
                    <Badge variant="info">Mendatang</Badge>
                  )}
              </TableCell>
              <TableCell align="center" className="whitespace-nowrap">
                <Badge variant="info" icon={<Users className="w-4 h-4" />}>
                  {attendance.attendance_count || 0}
                </Badge>
              </TableCell>
           
              <TableCell align="center" className="whitespace-nowrap font-bold">
                {attendance.kode_absensi}
              </TableCell>

              <TableCell align="center" className="whitespace-nowrap">
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<QrCode className="w-4 h-4" />}
                  onClick={() => onGenerateQR(attendance)}
                  className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                >
                  Generate QR
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}