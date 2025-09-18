"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiHeart,
  FiImage,
  FiActivity,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: FiHome },
  { href: "/dashboard/vibes", label: "Vibes", icon: FiHeart },
  { href: "/dashboard/scenes", label: "Scenes", icon: FiImage },
  { href: "/dashboard/hobbies", label: "Hobbies", icon: FiActivity },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    window.location.href = "/login";
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        <FiMenu className="w-6 h-6 text-gray-600" />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-xl
          lg:translate-x-0 lg:shadow-none lg:border-r border-gray-200
          flex flex-col h-full
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          transition-transform duration-300 ease-in-out
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FiActivity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Admin</h2>
                <p className="text-sm text-gray-500">Portal</p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            >
              <FiX className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${
                    pathname === item.href ||
                    (item.href !== "/dashboard" &&
                      pathname.startsWith(item.href))
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <Icon
                  className={`w-5 h-5 ${
                    pathname === item.href ||
                    (item.href !== "/dashboard" &&
                      pathname.startsWith(item.href))
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
          >
            <FiLogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
