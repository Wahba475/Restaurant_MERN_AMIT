import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import wahbaLogo from "../static/logo.png";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname;
  const { cartSize } = useCart();
  const { isLoggedIn, logout } = useAuth();

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Menu", href: "/menu" },
    ...(isLoggedIn
      ? [
          { label: "My Orders", href: "/orders" },
          { label: "My Bookings", href: "/my-bookings" },
        ]
      : []),
  ];

  const handleAuthClick = () => {
    if (isLoggedIn) {
      logout();
      toast.success("Logged out successfully!");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="flex items-center px-12 py-5 bg-white border-b border-gray-100 font-['Oswald',_sans-serif]">
      {/* LEFT — Logo */}
      <div className="flex-1 flex items-center">
        <Link to="/" className="group flex items-center">
          <img
            src={wahbaLogo}
            alt="Wahba"
            className="h-12 w-auto transition-transform duration-300 group-hover:-translate-y-1"
          />
        </Link>
      </div>

      {/* CENTER — Navigation */}
      <div className="flex-1 hidden md:flex items-center justify-center gap-6">
        {links.map((link) => {
          const isActive = activePath === link.href;

          return (
            <button
              key={link.href}
              onClick={() => navigate(link.href)}
              className={`relative px-4 py-1.5 font-medium transition-colors duration-200 ${
                isActive
                  ? "text-[#2C2F24] font-semibold"
                  : "text-[#474747] hover:text-[#AD343E]"
              }`}
            >
              <span
                className={`absolute inset-0 -z-10 rounded-full transition-colors duration-200 ${
                  isActive ? "bg-[#DBDFD0]" : "bg-transparent"
                }`}
              />
              <span className="relative z-10">{link.label}</span>
            </button>
          );
        })}
      </div>

      {/* RIGHT — Actions */}
      <div className="flex-1 flex items-center justify-end gap-4">
        {/* Cart */}
        <button
          onClick={() => navigate("/cart")}
          className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Cart"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>

          {cartSize > 0 && (
            <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartSize}
            </span>
          )}
        </button>

        {/* Admin */}
        {isLoggedIn && (
          <button
            onClick={() => navigate("/admin")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Admin"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        )}

        {/* Book Table */}
        <button
          onClick={() => navigate("/book-table")}
          className="border-2 border-[#182226] text-[#182226] px-5 py-2 rounded-full font-bold transition-all hover:bg-[#182226] hover:text-white hover:-translate-y-1"
        >
          Book A Table
        </button>

        {/* Login / Logout */}
        <button
          onClick={handleAuthClick}
          className="border-2 border-[#AD343E] text-[#AD343E] px-5 py-2 rounded-full font-bold transition-all hover:bg-[#AD343E] hover:text-white hover:-translate-y-1"
        >
          {isLoggedIn ? "LOGOUT" : "LOGIN"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
