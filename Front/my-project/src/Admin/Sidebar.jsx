import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Utensils,
  CalendarDays,
  ShoppingBag,
  Users,
  LogOut,
  ChevronDown,
  ChefHat,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/menu", label: "Menu", icon: Utensils },
    { to: "/admin/bookings", label: "Bookings", icon: CalendarDays },
    { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { to: "/admin/users", label: "Users", icon: Users },
  ];

  return (
    <div className="h-screen w-64 bg-black text-white flex flex-col border-r border-gray-800 shadow-xl fixed left-0 top-0 font-['Oswald']">
      {/* HEADER */}
      <div className="p-6 border-b border-gray-800 flex items-center gap-3">
        <div className="bg-white/10 p-2 rounded-lg">
          <ChefHat className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-medium tracking-wide uppercase">
          Admin Panel
        </h1>
      </div>

      {/* MAIN NAV */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group tracking-wide
              ${
                isActive
                  ? "bg-white text-black font-medium shadow-md"
                  : "text-gray-400 hover:bg-gray-900 hover:text-white"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-normal">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg
          text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all font-medium tracking-wide"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
