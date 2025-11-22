import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export function Navigation() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const navItems = [
    { label: "Appointments", icon: Calendar, path: "/admin/dashboard/appointments" },
  ];

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg border-r border-orange-200 
          hidden md:flex flex-col z-50 transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}`}
      >
        {/* Brand + Controls */}
        <div className="flex items-center justify-between p-4 border-b border-orange-200">
          <div className="flex items-center space-x-2">
            <LayoutDashboard className="h-7 w-7 text-[#FF6600]" />
            {!collapsed && <span className="text-lg font-bold text-gray-900">Admin Dashboard</span>}
          </div>
          <button
            className="hidden md:flex items-center justify-center text-gray-600 hover:bg-orange-50 p-1 rounded-lg transition-colors"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col p-4 space-y-2 flex-grow relative">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);

            return (
              <div key={item.label} className="relative group">
                {/* Normal Nav Item */}
                {!item.children ? (
                  <>
                    {isActive && <div className="absolute left-0 top-0 h-full w-1 bg-[#FF6600] rounded-r-md" />}
                    <Link
                      to={item.path}
                      className={`flex items-center w-full rounded-lg px-3 py-2 transition-all duration-200
                        ${
                          isActive
                            ? "bg-[#FF6600] text-white shadow-md hover:bg-orange-600"
                            : "bg-orange-50 text-gray-700 hover:bg-orange-100 hover:text-[#FF6600]"
                        }`}
                    >
                      <Icon className="h-5 w-5" />
                      {!collapsed && <span className="ml-2 font-medium">{item.label}</span>}
                    </Link>
                  </>
                ) : (
                  <>
                    {/* Dropdown Item */}
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={`flex items-center justify-between w-full rounded-lg px-3 py-2 transition-all duration-200
                        ${
                          isActive
                            ? "bg-[#FF6600] text-white shadow-md hover:bg-orange-600"
                            : "bg-orange-50 text-gray-700 hover:bg-orange-100 hover:text-[#FF6600]"
                        }`}
                    >
                      <div className="flex items-center">
                        <Icon className="h-5 w-5" />
                        {!collapsed && <span className="ml-2 font-medium">{item.label}</span>}
                      </div>
                      {!collapsed &&
                        (openDropdown === item.label ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        ))}
                    </button>

                    {/* Dropdown Links */}
                    {openDropdown === item.label && !collapsed && (
                      <div className="ml-8 mt-2 space-y-2">
                        {item.children.map((child) => {
                          const childActive = location.pathname.startsWith(child.path);
                          return (
                            <Link
                              key={child.path}
                              to={child.path}
                              className={`block px-3 py-2 rounded-lg text-sm transition-all font-medium
                                ${
                                  childActive
                                    ? "bg-[#FF6600] text-white shadow-md hover:bg-orange-600"
                                    : "bg-orange-50 text-gray-700 hover:bg-orange-100 hover:text-[#FF6600]"
                                }`}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}

                {/* Tooltip for collapsed mode */}
                {collapsed && !item.children && (
                  <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 shadow-lg transition-opacity z-50">
                    {item.label}
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        {!collapsed && (
          <div className="p-4 border-t border-orange-200">
            <div className="text-xs text-gray-500 text-center">
              Brandbase Capsule Admin
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-md border-b border-orange-200 z-50 flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-2">
          <LayoutDashboard className="h-7 w-7 text-[#FF6600]" />
          <span className="text-lg font-bold text-gray-900">Admin Dashboard</span>
        </div>
        <button 
          className="text-gray-600 hover:text-[#FF6600] transition-colors" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-4 p-6 md:hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);

            return !item.children ? (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center w-full rounded-lg px-4 py-3 text-lg transition-all font-medium
                  ${
                    isActive
                      ? "bg-[#FF6600] text-white shadow-md hover:bg-orange-600"
                      : "bg-orange-50 text-gray-700 hover:bg-orange-100 hover:text-[#FF6600]"
                  }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            ) : (
              <div key={item.label} className="w-full">
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className={`flex items-center justify-between w-full rounded-lg px-4 py-3 text-lg transition-all font-medium
                    ${
                      isActive
                        ? "bg-[#FF6600] text-white shadow-md hover:bg-orange-600"
                        : "bg-orange-50 text-gray-700 hover:bg-orange-100 hover:text-[#FF6600]"
                    }`}
                >
                  <div className="flex items-center">
                    <Icon className="h-5 w-5 mr-3" />
                    <span>{item.label}</span>
                  </div>
                  {openDropdown === item.label ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>

                {openDropdown === item.label && (
                  <div className="ml-6 mt-2 space-y-2">
                    {item.children.map((child) => {
                      const childActive = location.pathname.startsWith(child.path);
                      return (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={() => setMenuOpen(false)}
                          className={`block px-3 py-2 rounded-lg text-base transition-all font-medium
                            ${
                              childActive
                                ? "bg-[#FF6600] text-white shadow-md hover:bg-orange-600"
                                : "bg-orange-50 text-gray-700 hover:bg-orange-100 hover:text-[#FF6600]"
                            }`}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Mobile Menu Footer */}
          <div className="mt-8 pt-4 border-t border-orange-200 w-full">
            <div className="text-sm text-gray-500 text-center">
              Brandbase Capsule Admin
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className={`min-h-screen bg-gray-50 transition-all duration-300 ${
        collapsed ? "md:ml-20" : "md:ml-64"
      } ${menuOpen ? 'mt-16' : ''}`}>
        <div className="p-6">
          <Outlet /> {/* This is where your page content will render */}
        </div>
      </main>
    </>
  );
}