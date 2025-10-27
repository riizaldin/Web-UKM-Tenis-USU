import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import StatsCard from "@/Components/StatsCard";
import DashboardCalendar from "@/Components/DashboardCalendar";
import { Users, ClipboardList, DollarSign, FileText, Upload, Image, X, CalendarDays, Camera, Star } from "lucide-react";

const formatDate = (date) => {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

export default function AdminPage({ auth }) {
  const today = new Date();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    const input = document.querySelector('input[type="file"]');
    if (input) input.value = '';
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-sm text-gray-500">{formatDate(today)}</h2>
            <h1 className="text-3xl font-semibold mt-1">
              {getGreeting()}, {auth?.user?.name || "Admin"}!
            </h1>
          </div>
        </div>

        {/* Top Section: Stats Cards + Calendar */}
        <div className="flex gap-6 mb-6">
          {/* Left (3/4 width) */}
          <div className="w-3/4">
            {/* Stats Cards Grid */}
            <div className="grid grid-cols-3 gap-6 pb-6">
              <Link href="/admin/members" className="block">
                <StatsCard
                  title="Anggota"
                  value="150"
                  icon={<Users className="text-purple-600 w-6 h-6" />}
                />
              </Link>
              <Link href="/admin/attendance" className="block">
                <StatsCard
                  title="Absensi"
                  value="45"
                  icon={<ClipboardList className="text-pink-500 w-6 h-6" />}
                />
              </Link>
              <Link href="/admin/kas" className="block">
                <StatsCard
                  title="Kas"
                  value="Rp 2.500.000"
                  icon={<DollarSign className="text-yellow-500 w-6 h-6" />}
                />
              </Link>
              <Link href="/admin/documentation" className="block">
                <StatsCard
                  title="Dokumentasi"
                  value="248"
                  icon={<Camera className="text-blue-500 w-6 h-6" />}
                />
              </Link>
              <Link href="/admin/penilaian" className="block">
                <StatsCard
                  title="Penilaian Pengurus"
                  value="4.5"
                  icon={<Star className="text-orange-500 w-6 h-6" />}
                />
              </Link>
              <Link href="/admin/laporan-akhir" className="block">
                <StatsCard
                  title="Laporan Akhir"
                  icon={<FileText className="text-green-500 w-6 h-6" />}
                />
              </Link>
            </div>

            
        {/* Bottom Section: Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">New Member Added</p>
                <p className="text-xs text-gray-500">Ade Pratama joined today</p>
              </div>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-pink-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Attendance Closed</p>
                <p className="text-xs text-gray-500">Rapat Mingguan: 15/20 hadir</p>
              </div>
              <span className="text-xs text-gray-500">1 day ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Payment Received</p>
                <p className="text-xs text-gray-500">Monthly dues collected</p>
              </div>
              <span className="text-xs text-gray-500">3 days ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">New Evaluation Submitted</p>
                <p className="text-xs text-gray-500">Performance rating for Ahmad Rizki</p>
              </div>
              <span className="text-xs text-gray-500">5 days ago</span>
            </div>
          </div>
        </div>

          </div>

          {/* Right (1/4 width) */}
          <div className="w-1/4 flex flex-col gap-6">
            <DashboardCalendar />
          </div>
        </div>

      </div>
    </div>
  );
}