// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../images/akalogo.jpg";
import whatsapp from "../images/whatsapp.jpg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Home", to: "/home" },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Contact", to: "/contact" },
  ];

  const navClass = ({ isActive }) =>
    `group relative pb-1 text-sm font-medium transition-colors duration-300
     ${isActive ? "text-[#c5a879]" : "text-gray-600 hover:text-gray-900"}`;

  const handleWhatsAppClick = () => {
    const url =
      "https://api.whatsapp.com/send?phone=+919719799992&text=Hello! I have this design query:";
    if (window.gtag_report_conversion) {
      window.gtag_report_conversion(url);
    } else {
      window.open(url, "_blank");
    }
  };


  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/home"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-3"
        >
          <img
            src={logo}
            alt="AKA Architects Logo"
            className="w-10 h-10 rounded object-cover"
          />

          <div className="hidden sm:block leading-tight">
            <p className="font-serif text-base tracking-wide">
              Dehradun Based Architect
            </p>
            <p className="text-xs text-gray-600">
              Planning • Architecture • Interior • Landscape
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-10">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navClass}>
              {link.label}
              <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#c5a879] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </NavLink>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-4" onClick={handleWhatsAppClick}>
          <img
            src={whatsapp}
            alt="WhatsApp Contact"
            className="w-30 h-6 cursor-pointer hover:scale-110 transition"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="md:hidden flex flex-col gap-1.5"
        >
          <span className={`w-6 h-0.5 bg-gray-700 transition ${menuOpen && "rotate-45 translate-y-2"}`} />
          <span className={`w-6 h-0.5 bg-gray-700 transition ${menuOpen && "opacity-0"}`} />
          <span className={`w-6 h-0.5 bg-gray-700 transition ${menuOpen && "-rotate-45 -translate-y-2"}`} />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <nav className="flex flex-col gap-6 px-6 py-6 bg-white border-t border-gray-100">
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
    </header>
  );
}
