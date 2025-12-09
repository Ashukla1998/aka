import React, { useState } from "react";
import logo from "../images/akalogo.jpg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = ["Home", "About", "Services", "Project", "Blog", "Contact"];

  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 md:py-6">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 font-serif font-semibold">
             <img
            src={logo} 
            alt="AKA Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          </div>
          {/* <span className="text-gray-800 font-semibold text-lg md:text-xl">AKA</span> */}
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600 font-medium">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="relative hover:text-[#c5a879] transition-colors duration-300"
            >
              {link}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#c5a879] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 text-gray-700 focus:outline-none"
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
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="hover:text-[#c5a879] transition-colors duration-300"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
