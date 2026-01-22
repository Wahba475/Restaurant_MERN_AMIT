import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";

export default function AdminLayout() {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50 font-['Oswald']">
      <Toaster position="top-right" />
      <Sidebar />
      <div className="flex-1 ml-64 overflow-y-auto p-8">
        <Outlet />
      </div>
    </div>
  );
}
