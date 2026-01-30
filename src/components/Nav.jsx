import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, UserCircle, LogOut, LayoutDashboard, Info } from "lucide-react";

const Nav = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-gray-200 font-medium transition-all duration-300 ${
      isActive 
        ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-b-2 border-green-400 shadow-lg shadow-green-500/10" 
        : "hover:bg-gray-800/50 hover:border-b-2 hover:border-green-400/50"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
    setShowAccount(false);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-900 to-black shadow-2xl fixed top-0 left-0 right-0 z-[999] border-b border-gray-800/50 backdrop-blur-xl">
      {/* Animated Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 right-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 left-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between relative z-10">
        {/* Logo Section */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate("/")}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <img 
              src="https://imgs.search.brave.com/P7k2VzGBzqR91lv6eAo6-B7u5abDk_OM2QzMXp3gw9g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTIv/MjU1LzM0NS9zbWFs/bC9saW9uLW1hc2Nv/dC1sb2dvLWVtYmxl/bS1pc29sYXRlZC1i/YWNrZ3JvdW5kLXBu/Zy5wbmc" 
              alt="Doubt Tracker Logo" 
              className="w-12 h-12 object-cover rounded-xl relative z-10 border-2 border-green-500/30 group-hover:border-green-400/50 transition-all" 
            />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent group-hover:from-green-300 group-hover:to-emerald-400 transition-all">
            Doubt Tracker
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {user && (
            <NavLink to={`/dashboard/${user.role}`} className={navLinkClass}>
              <div className="flex items-center gap-2">
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </div>
            </NavLink>
          )}
          <NavLink to="/about" className={navLinkClass}>
            <div className="flex items-center gap-2">
              <Info size={18} />
              <span>About</span>
            </div>
          </NavLink>

          {user ? (
            <div className="relative ml-2">
              <button
                onClick={() => setShowAccount(!showAccount)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 border border-green-500/30 hover:border-green-400/50 text-gray-200 rounded-lg transition-all duration-300 shadow-lg shadow-green-500/10 hover:shadow-green-500/20 group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                  <UserCircle size={20} className="text-white" />
                </div>
                <span className="hidden sm:inline font-medium group-hover:text-green-300 transition-colors">
                  {user.name}
                </span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${showAccount ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showAccount && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowAccount(false)}
                  ></div>
                  
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-72 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 rounded-xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl">
                    {/* User Info Section */}
                    <div className="px-4 py-4 border-b border-gray-700/50 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                          <UserCircle size={28} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-200 truncate">{user.name}</p>
                          <p className="text-xs text-green-400 capitalize font-medium">{user.role}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 truncate bg-gray-800/50 px-2 py-1 rounded border border-gray-700/50">
                        {user.email}
                      </p>
                    </div>

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 hover:bg-red-500/10 text-red-400 hover:text-red-300 text-sm font-medium transition-all duration-300 flex items-center gap-2 group"
                    >
                      <div className="w-8 h-8 bg-red-500/20 group-hover:bg-red-500/30 rounded-lg flex items-center justify-center transition-all">
                        <LogOut size={16} />
                      </div>
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <NavLink 
              to="/auth/student-login" 
              className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 ml-2"
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-gray-200 hover:text-green-400 focus:outline-none bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-all duration-300 border border-gray-700/50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-gray-900 to-gray-800 border-t border-gray-700/50 shadow-2xl backdrop-blur-xl relative z-10">
          <div className="px-4 pb-4 pt-2 space-y-2">
            {user && (
              <NavLink
                to={`/dashboard/${user.role}`}
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </div>
              </NavLink>
            )}
            <NavLink
              to="/about"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-2">
                <Info size={18} />
                <span>About</span>
              </div>
            </NavLink>

            {user ? (
              <>
                {/* User Info Card */}
                <div className="mt-3 p-4 bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-700/30 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                      <UserCircle size={28} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-200 truncate">{user.name}</p>
                      <p className="text-xs text-green-400 capitalize font-medium">{user.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 truncate bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/50">
                    {user.email}
                  </p>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 flex items-center justify-center gap-2 group"
                >
                  <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <NavLink
                to="/auth/student-login"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;