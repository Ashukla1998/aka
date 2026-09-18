// import React, { useState } from "react";
// import { NavLink, Link } from "react-router-dom";
// import logo from "../images/akalogo.jpg";
// import whatsapp from "../images/whatsapp.jpg";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const links = [
//     { label: "Home", to: "/home" },
//     { label: "About", to: "/about" },
//     { label: "Services", to: "/services" },
//     { label: "Projects", to: "/projects" },
//     { label: "Contact", to: "/contact" },
//   ];

//   const navClass = ({ isActive }) =>
//     `relative pb-1 text-sm font-medium transition-colors duration-300
//      ${isActive ? "text-arcadisOrange" : "text-gray-700 hover:text-arcadisOrange"}`;

//   const handleWhatsAppClick = () => {
//     const url =
//       "https://api.whatsapp.com/send?phone=+919719799992&text=Hello! I have this design query:";
//     window.open(url, "_blank");
//   };

//   return (
//     <header className="bg-white sticky top-0 z-50">
//       {/* ================= TOP BAR ================= */}
//       <div className="border-b border-gray-200">
//         <div className="flex items-center justify-between px-6 py-2 text-xs text-gray-700">

//           <div className="hidden sm:block" />

//           <div className="flex items-center gap-6 font-medium">
//             <Link
//               to="/contact"
//               className="transition-colors duration-300 hover:text-arcadisOrange"
//             >
//               Contact
//             </Link>

//             <Link
//               to="/career"
//               className="transition-colors duration-300 hover:text-arcadisOrange"
//             >
//               Careers
//             </Link>

//             <button
//               onClick={handleWhatsAppClick}
//               className="flex items-center hover:opacity-80 transition"
//               aria-label="WhatsApp"
//             >
//               <img
//                 src={whatsapp}
//                 alt="WhatsApp"
//                 className="w-25 h-8 object-contain"
//               />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ================= MAIN NAV ================= */}
//       <div className="border-b border-gray-200">
//         <div className="flex items-center justify-between px-6 py-4">

//           {/* LOGO + TAGLINE */}
//           <Link to="/home" className="flex items-center gap-3">
//             <img
//               src={logo}
//               alt="AKA Architects Logo"
//               className="w-10 h-10 object-contain"
//             />

//             <div className="hidden sm:block leading-tight">
//               <p className="text-base font-medium tracking-wide">
//                 Dehradun Based Architect
//               </p>
//               <p className="text-xs font-normal text-gray-600">
//                 Planning • Architecture • Interior • Landscape
//               </p>
//             </div>
//           </Link>

//           {/* DESKTOP NAV */}
//           <nav className="hidden md:flex gap-10">
//             {links.map((link) => (
//               <NavLink key={link.to} to={link.to} className={navClass}>
//                 {link.label}
//               </NavLink>
//             ))}
//           </nav>

//           {/* MOBILE BUTTON */}
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             aria-label="Toggle navigation menu"
//             className="md:hidden flex flex-col gap-1.5"
//           >
//             <span
//               className={`w-6 h-0.5 bg-gray-700 transition ${
//                 menuOpen && "rotate-45 translate-y-2"
//               }`}
//             />
//             <span
//               className={`w-6 h-0.5 bg-gray-700 transition ${
//                 menuOpen && "opacity-0"
//               }`}
//             />
//             <span
//               className={`w-6 h-0.5 bg-gray-700 transition ${
//                 menuOpen && "-rotate-45 -translate-y-2"
//               }`}
//             />
//           </button>
//         </div>
//       </div>

//       {/* ================= MOBILE MENU ================= */}
//       <div
//         className={`md:hidden overflow-hidden transition-all duration-300 ${
//           menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
//         }`}
//       >
//         <nav className="flex flex-col gap-4 px-6 py-4 bg-white">
//           {links.map((link) => (
//             <NavLink
//               key={link.to}
//               to={link.to}
//               onClick={() => setMenuOpen(false)}
//               className={({ isActive }) =>
//                 isActive
//                   ? "font-medium text-arcadisOrange"
//                   : "font-medium text-gray-700 hover:text-arcadisOrange"
//               }
//             >
//               {link.label}
//             </NavLink>
//           ))}
//         </nav>
//       </div>
//     </header>
//   );
// }



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
      // Direct to project search or your search handler route
      window.location.href = `/projects?search=${encodeURIComponent(searchQuery)}`;
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* ================= 1. LEFT: SEARCH ICON ================= */}
          <div className="flex-1 flex items-center justify-start">
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-neutral-700 hover:text-arcadisOrange rounded-full transition-colors duration-200"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
            </button>
          </div>

          {/* ================= 2. CENTER: BRANDING & SUBTITLE ================= */}
          <div className="flex-shrink-0 flex flex-col items-center text-center px-2">
            <Link to="/home" className="flex items-center gap-2.5 sm:gap-3 group">
              <img
                src={logo}
                alt="AKA Associates Logo"
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-md"
              />
              <span className="text-base sm:text-lg md:text-xl font-semibold tracking-tight text-neutral-900 group-hover:text-arcadisOrange transition-colors">
                Archana Kapil Associates
              </span>
            </Link>

            <span className="text-[9px] sm:text-[11px] font-mono tracking-wider uppercase text-neutral-500 mt-1 whitespace-nowrap">
              Planning | Architecture | Interior | Landscape
            </span>
          </div>

          {/* ================= 3. RIGHT: HAMBURGER BUTTON ================= */}
          <div className="flex-1 flex items-center justify-end">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="p-2 text-neutral-800 hover:text-arcadisOrange rounded-full transition-colors flex items-center gap-2 group"
            >
              <span className="hidden sm:inline font-mono text-xs uppercase tracking-widest text-neutral-500 group-hover:text-arcadisOrange transition-colors">
                Menu
              </span>
              <Bars3Icon className="w-6 h-6 stroke-[1.8]" />
            </button>
          </div>

        </div>
      </div>

      {/* ================= SEARCH POP-DOWN OVERLAY ================= */}
      {searchOpen && (
        <div className="border-t border-neutral-100 bg-neutral-50/95 py-4 px-6 sm:px-12 animate-in fade-in slide-in-from-top-2 duration-200">
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-2xl mx-auto flex items-center gap-3"
          >
            <MagnifyingGlassIcon className="w-5 h-5 text-neutral-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, categories, or services..."
              className="w-full bg-transparent text-sm sm:text-base text-neutral-900 placeholder-neutral-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="p-1 text-neutral-400 hover:text-neutral-700"
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
          className={`absolute top-0 right-0 h-full w-full max-w-sm sm:max-w-md bg-white shadow-2xl p-8 sm:p-10 flex flex-col justify-between transform transition-transform duration-300 ease-out ${
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
                        ? "text-arcadisOrange font-normal"
                        : "text-white hover:text-arcadisOrange"
                    }`
                  }
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-neutral-300 group-hover:text-arcadisOrange transition-colors">
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
                className="w-5 h-5 object-contain"
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