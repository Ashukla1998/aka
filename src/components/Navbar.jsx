// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../images/akalogo.jpg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Home", to: "/home" },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Contact", to: "/contact" },
  ];

  // NavLink class helper — returns base classes + active styles
  const navClass = ({ isActive }) =>
    `relative transition-colors duration-300 ${isActive ? "text-[#c5a879] font-semibold" : "text-gray-600"}`;

  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 md:py-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center">
            <div className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-700 font-serif font-semibold rounded">
              <img src={logo} alt="AKA Logo" className="w-10 h-10 object-cover rounded" />
            </div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navClass}>
              {link.label}
              {/* decorative underline element kept if you want */}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#c5a879] transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="flex flex-col gap-1.5 text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col gap-4 px-6 py-4 text-gray-700 font-medium">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `py-2 ${isActive ? "text-[#c5a879] font-semibold" : "text-gray-700"}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
