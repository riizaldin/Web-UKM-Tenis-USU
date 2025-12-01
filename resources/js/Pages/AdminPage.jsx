import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import StatsCard from "@/Components/StatsCard";
import DashboardCalendar from "@/Components/DashboardCalendar";
import { Users, ClipboardList, DollarSign, Image, CalendarDays, Camera } from "lucide-react";
import { Head } from '@inertiajs/react';

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

const getActivityIcon = (type) => {
  switch (type) {
    case 'member':
      return <Users className="w-5 h-5 text-purple-600" />;
    case 'event':
      return <CalendarDays className="w-5 h-5 text-pink-600" />;
    case 'payment':
      return <DollarSign className="w-5 h-5 text-yellow-600" />;
    case 'gallery':
      return <Camera className="w-5 h-5 text-blue-600" />;
    default:
      return <ClipboardList className="w-5 h-5 text-gray-600" />;
  }
};

const getActivityBgColor = (type) => {
  switch (type) {
    case 'member':
      return 'bg-purple-100';
    case 'event':
      return 'bg-pink-100';
    case 'payment':
      return 'bg-yellow-100';
    case 'gallery':
      return 'bg-blue-100';
    default:
      return 'bg-gray-100';
  }
};

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'Baru saja';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit lalu`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam lalu`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} hari lalu`;
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

export default function AdminPage({ auth, stats = {}, recent_activities = [], upcoming_events = [] }) {
  const today = new Date();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Head title="Admin Dashboard" />
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
            <div className="grid grid-cols-4 gap-6 pb-6">
              <Link href="/admin/members" className="block">
                <StatsCard
                  title="Total Anggota"
                  value={stats.total_members || 0}
                  icon={<Users className="text-purple-600 w-6 h-6" />}
                />
              </Link>
              <Link href="/admin/attendance" className="block">
                <StatsCard
                  title="Total Event"
                  value={stats.total_events || 0}
                  icon={<ClipboardList className="text-pink-500 w-6 h-6" />}
                />
              </Link>
              <Link href="/admin/kas" className="block">
                <StatsCard
                  title="Saldo Kas"
                  value={formatCurrency(stats.total_kas || 0)}
                  icon={<DollarSign className="text-yellow-500 w-6 h-6" />}
                />
              </Link>
              <Link href="/admin/gallery" className="block">
                <StatsCard
                  title="Galeri Foto"
                  value={stats.total_gallery_photos || 0}
                  icon={<Camera className="text-blue-500 w-6 h-6" />}
                />
              </Link>
            </div>

            
        {/* Bottom Section: Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-3">
            {recent_activities.length > 0 ? (
              recent_activities.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className={`w-10 h-10 ${getActivityBgColor(activity.type)} rounded-full flex items-center justify-center`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.description}</p>
                  </div>
                  <span className="text-xs text-gray-500">{formatTimeAgo(activity.time)}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">Belum ada aktivitas terbaru</p>
              </div>
            )}
          </div>
        </div>

          </div>

          {/* Right (1/4 width) */}
          <div className="w-1/4 flex flex-col gap-6">
            <DashboardCalendar upcomingEvents={upcoming_events} />
          </div>
        </div>

      </div>
    </div>
  );
}