"use client";
import React, { useState } from "react";
import { NavItem } from "../types/types";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/" },
  { label: "Make Booking", href: "/booking" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "Assets", href: "/assets" },
];

export const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex flex-wrap gap-5 justify-between px-20 py-4 w-full bg-white max-md:px-5 max-md:max-w-full">
      <h1 className="text-xl font-semibold text-center text-blue-600">
        PilotForce
      </h1>

      <div className="flex gap-10 my-auto text-base font-medium text-gray-700 max-md:max-w-full">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.href}
            className={({ isActive }: { isActive: boolean }) =>
              isActive
                ? "text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="relative">
        <button
          aria-label="User profile"
          className="flex items-center"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/57d443971e034b5aa8182c7c5505dac4/75d72b31404578a39671f74b5bdb3d3664ab5dc7f587fbcd3d1117dd3a0ab2ae"
            className="object-contain shrink-0 rounded-full aspect-square w-[33px]"
            alt="User avatar"
          />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
