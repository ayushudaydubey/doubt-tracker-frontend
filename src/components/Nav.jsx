import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, UserCircle } from "lucide-react";

const Nav = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md text-white font-medium transition ${
      isActive ? "border-b-2 border-blue-200" : "hover:border-[1px] hover:border-blue-200"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 shadow-md fixed top-0 left-0 right-0 z-[999] ">
      <div className="max-w-7xl mx-auto px-4  py-4 flex items-center justify-between">
     
        <div className="flex items-center gap-2 text-blue-200 font-semibold text-xl">
          <img src="https://imgs.search.brave.com/P7k2VzGBzqR91lv6eAo6-B7u5abDk_OM2QzMXp3gw9g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTIv/MjU1LzM0NS9zbWFs/bC9saW9uLW1hc2Nv/dC1sb2dvLWVtYmxl/bS1pc29sYXRlZC1i/YWNrZ3JvdW5kLXBu/Zy5wbmc" alt="" className="w-12 h-12 object-fit" />
          <span>Doubt Tracker</span>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user && (
            <NavLink to={`/dashboard/${user.role}`} className={navLinkClass}>
              Dashboard
            </NavLink>
          )}
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowAccount(!showAccount)}
                className="flex items-center gap-2 text-white hover:text-blue-300 transition"
              >
                <UserCircle size={24} />
                <span className="hidden sm:inline">{user.name}</span>
              </button>

              {showAccount && (
                <div className="absolute right-0 mt-2 w-68 bg-white  bg-zinc-100 text-gray-800 rounded-md shadow-lg z-50">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                    <p className="text-xs text-gray-600 capitalize">{user.role}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/auth/student-login" className={navLinkClass}>
              Login
            </NavLink>
          )}
        </div>

        {/* Mobil menu toggler  */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 pb-4 space-y-2">
          {user && (
            <NavLink
              to={`/dashboard/${user.role}`}
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </NavLink>
          )}
          <NavLink
            to="/about"
            className={navLinkClass}
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>

          {user ? (
            <>
              <div className="text-white text-sm border-t border-gray-700 pt-2">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs">{user.email}</p>
                <p className="text-xs capitalize">{user.role}</p>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  navigate("/")
                  setIsOpen(false);
                }}
                className="w-full text-left bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/auth/student-login"
              className={navLinkClass}
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
