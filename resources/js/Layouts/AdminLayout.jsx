import React from "react";
import Sidebar from "@/Components/Sidebar";

export default function AdminLayout({ user, children }) {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
