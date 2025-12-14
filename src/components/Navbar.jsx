// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../images/akalogo.jpg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Home", to: "/home" },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Contact", to: "/contact" },
  ];

  const navClass = ({ isActive }) =>
    `relative pb-1 transition-colors duration-300
     ${isActive ? "text-[#c5a879]" : "text-gray-600 hover:text-gray-900"}`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/home" onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
          <img
            src={logo}
            alt="AKA"
            className="w-10 h-10 object-cover rounded"
          />
          <span className="hidden sm:block font-serif text-lg tracking-wide">
            AKA
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 text-sm font-medium">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navClass}>
              {link.label}
              {/* Active underline */}
              <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#c5a879] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </NavLink>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-gray-700 transition ${menuOpen && "rotate-45 translate-y-2"}`} />
          <span className={`w-6 h-0.5 bg-gray-700 transition ${menuOpen && "opacity-0"}`} />
          <span className={`w-6 h-0.5 bg-gray-700 transition ${menuOpen && "-rotate-45 -translate-y-2"}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <nav className="flex flex-col px-8 py-6 gap-6 text-sm">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#c5a879] font-medium"
                    : "text-gray-700 hover:text-gray-900"
                }
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
