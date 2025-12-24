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
    { label: "Projects", to: "/projects" },
    { label: "Contact", to: "/contact" },
  ];

  const navClass = ({ isActive }) =>
    `relative pb-1 text-sm font-medium transition-colors duration-300
     ${isActive ? "text-arcadisOrange" : "text-gray-700 hover:text-gray-900"}`;

  const handleWhatsAppClick = () => {
    const url =
      "https://api.whatsapp.com/send?phone=+919719799992&text=Hello! I have this design query:";
    window.open(url, "_blank");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-2 text-sm text-gray-700">
          <div className="hidden sm:block">
            {/* Can add language / region later */}
          </div>

          {/* RIGHT SIDE (Contact / Careers / WhatsApp) */}
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-gray-900">
              Contact
            </Link>

            <Link to="/careers" className="hover:text-gray-900">
              Careers
            </Link>

            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-1 hover:text-gray-900"
            >
              <img
                src={whatsapp}
                alt="WhatsApp"
                className="w-25 h-8"
              />
              
            </button>
          </div>

        </div>

      </div>



      {/* Black separator line */}
      <div className="border-t border-b border-gray-200"></div>

      {/* ===== MAIN NAV BAR ===== */}
      <div className="flex items-center justify-between px-6 py-4">

        {/* Logo + Tagline */}
        <Link to="/home" className="flex items-center gap-3">
          <img
            src={logo}
            alt="AKA Architects Logo"
            className="w-10 h-10 rounded object-contain"
          />
          <div className="hidden sm:block leading-tight">
            <p className="font-serif text-base tracking-wide font-[16px]">
              Dehradun Based Architect
            </p>
            <p className="text-xs text-gray-600 font-[10px]">
              Planning • Architecture • Interior • Landscape
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-10">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navClass}>
              {link.label}
              <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-arcadisOrange scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </NavLink>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden flex flex-col gap-1.5"
        >
          <span className={`w-6 h-0.5 bg-gray-700 transition ${menuOpen && "rotate-45 translate-y-2"}`} />
          <span className={`w-6 h-0.5 bg-gray-700 transition ${menuOpen && "opacity-0"}`} />
          <span className={`w-6 h-0.5 bg-gray-700 transition ${menuOpen && "-rotate-45 -translate-y-2"}`} />
        </button>
      </div>

      {/* ===== MOBILE MENU ===== */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav className="flex flex-col gap-4 px-6 py-4 bg-white border-t border-gray-100">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-arcadisOrange font-medium"
                  : "text-gray-700 hover:text-gray-900 font-[16px]"
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
