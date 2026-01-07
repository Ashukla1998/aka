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
     ${isActive ? "text-arcadisOrange" : "text-gray-700 hover:text-arcadisOrange"}`;

  const handleWhatsAppClick = () => {
    const url =
      "https://api.whatsapp.com/send?phone=+919719799992&text=Hello! I have this design query:";
    window.open(url, "_blank");
  };

  return (
    <header className="bg-white sticky top-0 z-50">
      {/* ================= TOP BAR ================= */}
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-2 text-xs text-gray-700">

          <div className="hidden sm:block" />

          <div className="flex items-center gap-6 font-medium">
            <Link
              to="/contact"
              className="transition-colors duration-300 hover:text-arcadisOrange"
            >
              Contact
            </Link>

            <Link
              to="/career"
              className="transition-colors duration-300 hover:text-arcadisOrange"
            >
              Careers
            </Link>

            <button
              onClick={handleWhatsAppClick}
              className="flex items-center hover:opacity-80 transition"
              aria-label="WhatsApp"
            >
              <img
                src={whatsapp}
                alt="WhatsApp"
                className="w-25 h-8 object-contain"
              />
            </button>
          </div>
        </div>
      </div>

      {/* ================= MAIN NAV ================= */}
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">

          {/* LOGO + TAGLINE */}
          <Link to="/home" className="flex items-center gap-3">
            <img
              src={logo}
              alt="AKA Architects Logo"
              className="w-10 h-10 object-contain"
            />

            <div className="hidden sm:block leading-tight">
              <p className="text-base font-medium tracking-wide">
                Dehradun Based Architect
              </p>
              <p className="text-xs font-normal text-gray-600">
                Planning • Architecture • Interior • Landscape
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-10">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={navClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden flex flex-col gap-1.5"
          >
            <span
              className={`w-6 h-0.5 bg-gray-700 transition ${
                menuOpen && "rotate-45 translate-y-2"
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-gray-700 transition ${
                menuOpen && "opacity-0"
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-gray-700 transition ${
                menuOpen && "-rotate-45 -translate-y-2"
              }`}
            />
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-4 px-6 py-4 bg-white">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-arcadisOrange"
                  : "font-medium text-gray-700 hover:text-arcadisOrange"
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
