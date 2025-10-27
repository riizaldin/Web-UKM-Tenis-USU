import React from 'react';
import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from './Table';
import Badge from './Badge';
import Button from './Button';
import { Clock, MapPin, Users, QrCode } from 'lucide-react';

export default function AttendanceTable({ attendances, onGenerateQR, isAttendanceActive }) {
  return (
    <Table>
      <TableHeader>
        <TableHeaderCell>Keterangan Kegiatan</TableHeaderCell>
        <TableHeaderCell>Waktu Absen</TableHeaderCell>
        <TableHeaderCell>Lokasi</TableHeaderCell>
        <TableHeaderCell align="center">Status</TableHeaderCell>
        <TableHeaderCell align="center">Jumlah Absen</TableHeaderCell>
        <TableHeaderCell align="center">Akses</TableHeaderCell>
        <TableHeaderCell align="center">QR Code</TableHeaderCell>
      </TableHeader>
      <TableBody>
        {attendances.map((attendance) => {
          const isActive = isAttendanceActive(attendance);
          return (
            <TableRow key={attendance.id}>
              <TableCell className="max-w-xs">
                <div className="font-medium">{attendance.description}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(attendance.date).toLocaleDateString('id-ID', { 
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{attendance.start_time}</span>
                  {attendance.end_time && (
                    <>
                      <span className="text-gray-400">-</span>
                      <span>{attendance.end_time}</span>
                    </>
                  )}
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {attendance.location}
                </div>
              </TableCell>
              <TableCell align="center" className="whitespace-nowrap">
                {isActive ? (
                  <Badge variant="success" dot dotColor="bg-green-600">
                    Aktif
                  </Badge>
                ) : (
                  <Badge variant="gray">Selesai</Badge>
                )}
              </TableCell>
              <TableCell align="center" className="whitespace-nowrap">
                <Badge variant="info" icon={<Users className="w-4 h-4" />}>
                  {attendance.attendance_count || 0}
                </Badge>
              </TableCell>
              <TableCell align="center" className="whitespace-nowrap">
                <Badge variant={attendance.qr_only ? 'purple' : 'success'}>
                  {attendance.qr_only ? 'QR Only' : 'Umum'}
                </Badge>
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