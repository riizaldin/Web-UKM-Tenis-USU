import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import {
  Home,
  Users,
  CalendarDays,
  DollarSign,
  FileText,
  Menu,
  X,
  Star,
  Camera,
  LogOut,
  Shield,
} from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-gradient-to-b from-[#43CEA2] to-[#185A9D] text-white min-h-screen transition-all duration-300 flex flex-col shadow-lg`}
    >
      {/* Header */}
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} p-4 border-b border-white/20`}>
        {!collapsed && <h1 className="text-lg font-semibold">Dashboard</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-2 rounded hover:bg-white/20 transition-colors ${collapsed ? 'mx-auto' : ''}`}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="p-4 flex flex-col gap-2 mt-2 flex-1">
        <SidebarLink
          href="/admin"
          icon={<Home size={20} />}
          text="Dashboard"
          collapsed={collapsed}
        />
        <SidebarLink
          href="/admin/members"
          icon={<Users size={20} />}
          text="Anggota"
          collapsed={collapsed}
        />
        <SidebarLink
          href="/admin/attendance"
          icon={<CalendarDays size={20} />}
          text="Absensi"
          collapsed={collapsed}
        />
        <SidebarLink
          href="/admin/kas"
          icon={<DollarSign size={20} />}
          text="Keuangan"
          collapsed={collapsed}
        />
        <SidebarLink
          href="/admin/heregistration"
          icon={<FileText size={20} />}
          text="Heregistrasi"
          collapsed={collapsed}
        />
        <SidebarLink
          href="/admin/gallery"
          icon={<Camera size={20} />}
          text="Galeri"
          collapsed={collapsed}
        />
        <SidebarLink
          href="/admin/struktur"
          icon={<Shield size={20} />}
          text="Struktur Organisasi"
          collapsed={collapsed}
        />
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-white/20">
        <Link
          href="/logout"
          method="post"
          as="button"
          className={`flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-white/20 transition-colors w-full ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && <span className="text-sm">Logout</span>}
        </Link>
      </div>
    </div>
  );
}

function SidebarLink({ href, icon, text, collapsed }) {
  const isActive = window.location.pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-colors ${
        isActive ? "bg-white/30 font-semibold" : "hover:bg-white/20"
      } ${collapsed ? "justify-center" : ""}`}
    >
      <span className="flex-shrink-0">{icon}</span>
      {!collapsed && <span className="text-sm">{text}</span>}
    </Link>
  );
}