import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Menu,
  X,
  UserCircle,
  LogOut,
  LayoutDashboard,
  Info,
} from "lucide-react";

const Nav = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition
     ${
       isActive
         ? "text-green-400 border-b-2 border-green-400"
         : "text-gray-300 hover:text-green-400"
     }`;

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
    setShowAccount(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src="https://imgs.search.brave.com/P7k2VzGBzqR91lv6eAo6-B7u5abDk_OM2QzMXp3gw9g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTIv/MjU1LzM0NS9zbWFs/bC9saW9uLW1hc2Nv/dC1sb2dvLWVtYmxl/bS1pc29sYXRlZC1i/YWNrZ3JvdW5kLXBu/Zy5wbmc"
            alt="Doubt Tracker Logo"
            className="w-10 h-10 rounded-lg object-cover border border-green-500/40"
          />
          <span className="text-lg font-medium text-green-500">
            Doubt Tracker
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">
          {user && (
            <NavLink
              to={`/dashboard/${user.role}`}
              className={navLinkClass}
            >
              <LayoutDashboard size={16} />
              Dashboard
            </NavLink>
          )}

          <NavLink to="/about" className={navLinkClass}>
            <Info size={16} />
            About
          </NavLink>

          {user ? (
            <div className="relative ml-2">
              <button
                onClick={() => setShowAccount(!showAccount)}
                className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-700 text-gray-200 hover:text-green-400"
              >
                <UserCircle size={20} />
                <span className="text-sm">{user.name}</span>
              </button>

              {showAccount && (
                <div className="absolute right-0 mt-2 w-60 bg-gray-900 border border-gray-800 rounded-md">
                  <div className="px-4 py-3 border-b border-gray-800">
                    <p className="text-sm font-semibold text-gray-200 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-green-400 capitalize">
                      {user.role}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-gray-800 flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/auth/student-login"
              className="ml-2 px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-500"
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 py-4 space-y-2">
          {user && (
            <NavLink
              to={`/dashboard/${user.role}`}
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              <LayoutDashboard size={16} />
              Dashboard
            </NavLink>
          )}

          <NavLink
            to="/about"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            <Info size={16} />
            About
          </NavLink>

          {user ? (
            <button
              onClick={handleLogout}
              className="w-full mt-3 px-4 py-2 rounded-md bg-red-600 text-white flex items-center justify-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <NavLink
              to="/auth/student-login"
              className="block text-center px-4 py-2 rounded-md bg-green-600 text-white"
              onClick={() => setIsOpen(false)}
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;
