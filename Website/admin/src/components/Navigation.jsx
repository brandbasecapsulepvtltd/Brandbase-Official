import React, { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Users,
  Palette,
  LogOut,
  User,
  Mail,
  Settings
} from "lucide-react";
import { useAuth } from "../context/AuthContext"; // Make sure to import your AuthContext

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth(); // Get logout function from AuthContext
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navItems = [
    { label: "Appointments", icon: Calendar, path: "/admin/dashboard/admin-appointment" },
    { label: "Contact Us", icon: Mail, path: "/admin/dashboard/contact-management" },
    { label: "Employees", icon: Users, path: "/admin/dashboard/employee-management" },
    {
      label: "UI",
      icon: Palette,
      children: [
        { label: "Home", path: "/admin/dashboard/ui/home" },
        { label: "About Section", path: "/admin/dashboard/ui/about-section" },
        { label: "Blogs", path: "/admin/dashboard/blogs-management" },
        { label: "Service Category", path: "/admin/dashboard/service-category" },
        { label: "Service", path: "/admin/dashboard/service-management" },
        { label: "Portfolio", path: "/admin/dashboard/portfolio" },
      ]
    },
    {
      label: "General",
      icon: Settings,
      children: [
        { label: "Top Bar", path: "/admin/dashboard/general/topbar" },
        { label: "Navbar", path: "/admin/dashboard/general/navbar" },
        { label: "Footer", path: "/admin/dashboard/general/footer" },
        { label: "Floating Latest", path: "/admin/dashboard/general/floating-latest" },
      ]
    },
    {
      label: "Event Management",
      icon: Calendar,
      children: [
        { label: "Manage Events", path: "/admin/dashboard/event-management" },
        { label: "Events Leads", path: "/admin/dashboard/event-leads" }
      ]
    }
  ];

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate('/admin/login'); // Navigate to login page
    setShowLogoutConfirm(false); // Close confirmation dialog
  };

  return (
    <>
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
              <LogOut className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Confirm Logout
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to logout from the admin dashboard?
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

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
            const isActive = item.children
              ? item.children.some(child => location.pathname.startsWith(child.path))
              : location.pathname.startsWith(item.path);

            return (
              <div key={item.label} className="relative group">
                {/* Normal Nav Item */}
                {!item.children ? (
                  <>
                    {isActive && <div className="absolute left-0 top-0 h-full w-1 bg-[#FF6600] rounded-r-md" />}
                    <Link
                      to={item.path}
                      className={`flex items-center w-full rounded-lg px-3 py-2 transition-all duration-200
                        ${isActive
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
                        ${isActive
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
                                ${childActive
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

        {/* Sidebar Footer with User Info and Logout */}
        <div className="p-4 border-t border-orange-200">
          {!collapsed ? (
            <>
              {/* User Info */}
              <div className="flex items-center space-x-3 mb-4 p-2 rounded-lg bg-orange-50">
                <div className="flex items-center justify-center w-8 h-8 bg-[#FF6600] rounded-full">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="flex items-center justify-center w-full py-2 px-3 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg font-medium transition-all duration-200 group"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span>Logout</span>
              </button>

              {/* Footer Text */}
              <div className="text-xs text-gray-500 text-center mt-3">
                Brandbase Capsule Admin
              </div>
            </>
          ) : (
            <>
              {/* Collapsed Logout Button */}
              <div className="relative group">
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="flex items-center justify-center w-full py-2 px-3 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                </button>
                <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 shadow-lg transition-opacity z-50 whitespace-nowrap">
                  Logout
                </span>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-md border-b border-orange-200 z-50 flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-2">
          <LayoutDashboard className="h-7 w-7 text-[#FF6600]" />
          <span className="text-lg font-bold text-gray-900">Admin Dashboard</span>
        </div>
        <div className="flex items-center space-x-3">
          {/* Mobile Logout Button */}
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-5 w-5" />
          </button>
          <button
            className="text-gray-600 hover:text-[#FF6600] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col p-6 md:hidden pt-20">
          {/* User Info in Mobile */}
          <div className="flex items-center space-x-3 mb-6 p-3 rounded-lg bg-orange-50">
            <div className="flex items-center justify-center w-10 h-10 bg-[#FF6600] rounded-full">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2 flex-grow">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.children
                ? item.children.some(child => location.pathname.startsWith(child.path))
                : location.pathname.startsWith(item.path);

              return !item.children ? (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center w-full rounded-lg px-4 py-3 text-base transition-all font-medium
                    ${isActive
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
                    className={`flex items-center justify-between w-full rounded-lg px-4 py-3 text-base transition-all font-medium
                      ${isActive
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
                            className={`block px-3 py-2 rounded-lg text-sm transition-all font-medium
                              ${childActive
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
          </div>

          {/* Mobile Logout Button */}
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="mt-6 flex items-center justify-center w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>

          {/* Mobile Menu Footer */}
          <div className="mt-6 pt-4 border-t border-orange-200">
            <div className="text-sm text-gray-500 text-center">
              Brandbase Capsule Admin
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className={`min-h-screen bg-gray-50 transition-all duration-300 ${collapsed ? "md:ml-20" : "md:ml-64"
        } ${menuOpen ? 'mt-16' : ''}`}>
        <div className="p-6">
          <Outlet /> {/* This is where your page content will render */}
        </div>
      </main>
    </>
  );
}