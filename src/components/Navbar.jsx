import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { 
  MagnifyingGlassIcon, 
  XMarkIcon, 
  Bars3Icon 
} from "@heroicons/react/24/outline";
import logo from "../images/akalogo.jpg";
import whatsapp from "../images/whatsapp.jpg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const links = [
    { label: "Home", to: "/home" },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Projects", to: "/projects" },
    { label: "Contact", to: "/contact" },
    { label: "Careers", to: "/career" },
  ];

  const handleWhatsAppClick = () => {
    const url =
      "https://api.whatsapp.com/send?phone=+919719799992&text=Hello! I have this design query:";
    window.open(url, "_blank");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/projects?search=${encodeURIComponent(searchQuery)}`;
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full max-w-full overflow-x-clip bg-white/95 backdrop-blur-md border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <div className="flex items-center justify-between h-20 w-full">

          {/* ================= 1. LEFT: SEARCH ICON ================= */}
          <div className="w-12 sm:w-24 flex items-center justify-start shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-neutral-700 hover:text-orange-600 rounded-full transition-colors duration-200"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
            </button>
          </div>

          {/* ================= 2. CENTER: BRANDING & SUBTITLE ================= */}
          <div className="flex-1 min-w-0 flex flex-col items-center text-center px-2">
            <Link to="/home" className="flex items-center justify-center gap-2 sm:gap-3 max-w-full group">
              <img
                src={logo}
                alt="AKA Associates Logo"
                className="w-7 h-7 sm:w-9 sm:h-9 object-contain rounded-md shrink-0"
              />
              <span className="text-sm sm:text-lg md:text-xl font-semibold tracking-tight text-neutral-900 group-hover:text-orange-600 transition-colors truncate">
                Archana Kapil Associates
              </span>
            </Link>

            {/* Hidden overflow fix: controlled truncate on mobile, full readable text on desktop */}
            <span className="hidden sm:block text-[10px] md:text-[11px] font-mono tracking-wider uppercase text-neutral-500 mt-1 truncate max-w-full">
              Planning | Architecture | Interior | Landscape
            </span>
            <span className="sm:hidden text-[8px] font-mono tracking-wider uppercase text-neutral-400 mt-0.5 truncate max-w-[200px]">
              Architecture • Planning • Interior
            </span>
          </div>

          {/* ================= 3. RIGHT: HAMBURGER BUTTON ================= */}
          <div className="w-12 sm:w-24 flex items-center justify-end shrink-0">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="p-2 text-neutral-800 hover:text-orange-600 rounded-full transition-colors flex items-center"
            >
              <Bars3Icon className="w-6 h-6 stroke-[1.8]" />
            </button>
          </div>

        </div>
      </div>

      {/* ================= SEARCH POP-DOWN OVERLAY ================= */}
      {searchOpen && (
        <div className="border-t border-neutral-100 bg-neutral-50/95 py-4 px-6 sm:px-12 w-full animate-in fade-in slide-in-from-top-2 duration-200">
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-2xl mx-auto flex items-center gap-3 w-full"
          >
            <MagnifyingGlassIcon className="w-5 h-5 text-neutral-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, categories, or services..."
              className="w-full bg-transparent text-sm sm:text-base text-neutral-900 placeholder-neutral-400 focus:outline-none min-w-0"
            />
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="p-1 text-neutral-400 hover:text-neutral-700 shrink-0"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      {/* ================= FULL HAMBURGER DRAWER ================= */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMenuOpen(false)}
          className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[85vw] max-w-sm sm:max-w-md bg-white shadow-2xl p-8 sm:p-10 flex flex-col justify-between transform transition-transform duration-300 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Top Bar of Drawer */}
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400">
                [ NAVIGATION ]
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition"
                aria-label="Close menu"
              >
                <XMarkIcon className="w-6 h-6 stroke-[1.8]" />
              </button>
            </div>

            {/* Links List */}
            <nav className="flex flex-col gap-5 mt-8">
              {links.map((link, idx) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-baseline justify-between text-2xl sm:text-3xl font-light tracking-tight transition-colors ${
                      isActive
                        ? "text-orange-600 font-normal"
                        : "text-neutral-900 hover:text-orange-600"
                    }`
                  }
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-neutral-400 group-hover:text-orange-600 transition-colors">
                    // 0{idx + 1}
                  </span>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Bottom Contact / Actions */}
          <div className="pt-8 border-t border-neutral-100 space-y-4">
            <button
              onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 transition-colors"
            >
              <img
                src={whatsapp}
                alt="WhatsApp"
                className="w-5 h-5 object-contain shrink-0"
              />
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-700">
                Direct WhatsApp Query
              </span>
            </button>

            <div className="text-center font-mono text-[11px] text-neutral-400">
              Archana Kapil Associates • Dehradun
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}