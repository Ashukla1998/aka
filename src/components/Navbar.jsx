import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  Bars3Icon,
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
      window.location.href = `/projects?search=${encodeURIComponent(
        searchQuery
      )}`;

      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full max-w-full overflow-x-clip bg-white/95 backdrop-blur-md border-b border-neutral-200/80">

      {/* ================= ROW 1 ================= */}
      <div className="relative w-full h-10 sm:h-20 flex items-center px-4 sm:px-8 lg:px-12">

        {/* ================= LEFT : SEARCH ================= */}
        <div className="flex items-center justify-start shrink-0">
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            className="
        p-2
        text-neutral-700
        hover:text-orange-600
        rounded-full
        transition-colors
        duration-200
      "
            aria-label="Search"
          >
            <MagnifyingGlassIcon
              className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]"
            />
          </button>
        </div>


        {/* ================= CENTER : LOGO + COMPANY NAME ================= */}
        <div
          className="
      absolute
      left-1/2
      -translate-x-1/2
      flex
      items-center
      min-w-0
      max-w-[70%]
    "
        >
          <Link
            to="/home"
            className="
        flex
        items-center
        justify-center
        gap-1
        sm:gap-2
        group
        min-w-0
      "
          >
            <img
              src={logo}
              alt="AKA Associates Logo"
              className="
          w-7 h-7
          sm:w-9 sm:h-9
          md:w-10 md:h-10
          object-contain
          shrink-0
        "
            />

            <span
              className="
          text-[13px]
          sm:text-sm
          md:text-xl
          font-semibold
          tracking-tight
          text-neutral-900
          group-hover:text-orange-600
          transition-colors
          whitespace-nowrap
        "
            >
              Archana Kapil Associates
            </span>
          </Link>
        </div>


        {/* ================= RIGHT : HAMBURGER ================= */}
        <div className="ml-auto flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="
        p-2
        text-neutral-800
        hover:text-orange-600
        rounded-full
        transition-colors
      "
          >
            <Bars3Icon
              className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]"
            />
          </button>
        </div>

      </div>


      {/* ================= ROW 2 ================= */}
      <div className="w-full px-4 sm:px-8 lg:px-12 -mt-2 pb-2 sm:pb-3">
        <div
          className="
      w-full
      flex
      justify-center
    "
        >
          <div
            className="
        w-full
        max-w-max
        flex
        justify-start
      "
          >
            <span
              className="
          font-mono
          uppercase
          tracking-[0.08em]
          sm:tracking-[0.12em]
          md:tracking-wider
          text-neutral-500
          text-[9px]
          sm:text-[5px]
          md:text-sm
          leading-relaxed
          
          truncate 
        "
            >
              Planning| Architecture| Interior| Landscape
            </span>
          </div>
        </div>
      </div>
      {/* =========================================================
          SEARCH POP-DOWN
      ========================================================== */}
      {searchOpen && (
        <div className="border-t border-neutral-100 bg-neutral-50/95 py-4 px-4 sm:px-8 lg:px-12 w-full animate-in fade-in slide-in-from-top-2 duration-200">
          <form
            onSubmit={handleSearchSubmit}
            className="w-full flex items-center gap-3"
          >
            <MagnifyingGlassIcon className="w-5 h-5 text-neutral-400 shrink-0" />

            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, categories, or services..."
              className="
                w-full
                bg-transparent
                text-sm
                sm:text-base
                text-neutral-900
                placeholder-neutral-400
                focus:outline-none
                min-w-0
              "
            />

            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="p-1 text-neutral-400 hover:text-neutral-700 shrink-0"
              aria-label="Close search"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      {/* =========================================================
          FULL HAMBURGER DRAWER
      ========================================================== */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${menuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        {/* ================= BACKDROP ================= */}
        <div
          onClick={() => setMenuOpen(false)}
          className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
        />

        {/* ================= DRAWER ================= */}
        <div
          className={`
            absolute
            top-0
            right-0
            h-full
            w-[85vw]
            max-w-sm
            sm:max-w-md
            bg-white
            shadow-2xl
            p-6
            sm:p-10
            flex
            flex-col
            justify-between
            transform
            transition-transform
            duration-300
            ease-out
            ${menuOpen
              ? "translate-x-0"
              : "translate-x-full"
            }
          `}
        >
          {/* ================= TOP BAR ================= */}
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400">
                [ NAVIGATION ]
              </span>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="p-2 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition"
                aria-label="Close menu"
              >
                <XMarkIcon className="w-6 h-6 stroke-[1.8]" />
              </button>
            </div>

            {/* ================= NAVIGATION LINKS ================= */}
            <nav className="flex flex-col gap-5 mt-8">
              {links.map((link, idx) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-baseline justify-between text-2xl sm:text-3xl font-light tracking-tight transition-colors ${isActive
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

          {/* ================= BOTTOM CONTACT ================= */}
          <div className="pt-8 border-t border-neutral-100 space-y-4">

            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-3
                py-3
                px-4
                rounded-xl
                border
                border-neutral-200
                bg-neutral-50
                hover:bg-neutral-100
                transition-colors
              "
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

// import React, { useState } from "react";
// import { NavLink, Link } from "react-router-dom";
// import {
//   MagnifyingGlassIcon,
//   XMarkIcon,
//   Bars3Icon,
// } from "@heroicons/react/24/outline";
// import logo from "../images/akalogo.jpg";
// import whatsapp from "../images/whatsapp.jpg";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const links = [
//     { label: "Home", to: "/home" },
//     { label: "About", to: "/about" },
//     { label: "Services", to: "/services" },
//     { label: "Projects", to: "/projects" },
//     { label: "Contact", to: "/contact" },
//     { label: "Careers", to: "/career" },
//   ];

//   const handleWhatsAppClick = () => {
//     const url =
//       "https://api.whatsapp.com/send?phone=+919719799992&text=Hello! I have this design query:";
//     window.open(url, "_blank");
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();

//     if (searchQuery.trim()) {
//       window.location.href = `/projects?search=${encodeURIComponent(
//         searchQuery
//       )}`;
//       setSearchOpen(false);
//     }
//   };

//   return (
//     <header className="sticky top-0 z-50 w-full max-w-full overflow-x-clip bg-white/95 backdrop-blur-md border-b border-neutral-200/80">

//       {/* ================= MAIN NAVBAR ================= */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">

//         {/* ================= ROW 1 ================= */}
//         <div className="relative flex items-center justify-between h-16 sm:h-20 w-full">

//           {/* LEFT - SEARCH */}
//           <div className="w-10 sm:w-24 flex items-center justify-start shrink-0">
//             <button
//               type="button"
//               onClick={() => setSearchOpen(!searchOpen)}
//               className="p-2 text-neutral-700 hover:text-orange-600 rounded-full transition-colors duration-200"
//               aria-label="Search"
//             >
//               <MagnifyingGlassIcon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
//             </button>
//           </div>

//           {/* CENTER - LOGO + COMPANY NAME */}
//           {/* CENTER - LOGO + COMPANY NAME */}
//           <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center min-w-max">
//             <Link
//               to="/home"
//               className="flex items-center justify-center gap-2 sm:gap-3 group whitespace-nowrap"
//             >
//               <img
//                 src={logo}
//                 alt="AKA Associates Logo"
//                 className="w-7 h-7 sm:w-9 sm:h-9 object-contain shrink-0"
//               />

//               <span className="text-[11px] sm:text-sm md:text-xl font-semibold tracking-tight text-neutral-900 group-hover:text-orange-600 transition-colors whitespace-nowrap">
//                 Archana Kapil Associates
//               </span>
//             </Link>
//           </div>

//           {/* RIGHT - HAMBURGER */}
//           <div className="w-10 sm:w-24 flex items-center justify-end shrink-0 ml-auto">
//             <button
//               type="button"
//               onClick={() => setMenuOpen(true)}
//               aria-label="Open menu"
//               className="p-2 text-neutral-800 hover:text-orange-600 rounded-full transition-colors flex items-center"
//             >
//               <Bars3Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
//             </button>
//           </div>
//         </div>

//         {/* ================= ROW 2 ================= */}
//         <div className="w-full flex  justify-start text-center pb-3 sm:pb-4">
//           <span
//             className="
//               font-mono
//               uppercase
//               tracking-[0.12em] sm:tracking-wider
//               text-neutral-500
//               text-[9px] sm:text-[11px] md:text-sm
//               leading-relaxed
//               max-w-full
//               px-4
//               whitespace-normal
//               break-words
//             "
//           >
//             Planning | Architecture | Interior | Landscape
//           </span>
//         </div>
//       </div>

//       {/* ================= SEARCH POP-DOWN ================= */}
//       {searchOpen && (
//         <div className="border-t border-neutral-100 bg-neutral-50/95 py-4 px-4 sm:px-12 w-full animate-in fade-in slide-in-from-top-2 duration-200">
//           <form
//             onSubmit={handleSearchSubmit}
//             className="max-w-2xl mx-auto flex items-center gap-3 w-full"
//           >
//             <MagnifyingGlassIcon className="w-5 h-5 text-neutral-400 shrink-0" />

//             <input
//               type="text"
//               autoFocus
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search projects, categories, or services..."
//               className="w-full bg-transparent text-sm sm:text-base text-neutral-900 placeholder-neutral-400 focus:outline-none min-w-0"
//             />

//             <button
//               type="button"
//               onClick={() => setSearchOpen(false)}
//               className="p-1 text-neutral-400 hover:text-neutral-700 shrink-0"
//               aria-label="Close search"
//             >
//               <XMarkIcon className="w-5 h-5" />
//             </button>
//           </form>
//         </div>
//       )}

//       {/* ================= FULL HAMBURGER DRAWER ================= */}
//       <div
//         className={`fixed inset-0 z-50 transition-opacity duration-300 ${menuOpen
//             ? "opacity-100 pointer-events-auto"
//             : "opacity-0 pointer-events-none"
//           }`}
//       >
//         {/* BACKDROP */}
//         <div
//           onClick={() => setMenuOpen(false)}
//           className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
//         />

//         {/* DRAWER */}
//         <div
//           className={`absolute top-0 right-0 h-full w-[85vw] max-w-sm sm:max-w-md bg-white shadow-2xl p-6 sm:p-10 flex flex-col justify-between transform transition-transform duration-300 ease-out ${menuOpen ? "translate-x-0" : "translate-x-full"
//             }`}
//         >
//           {/* TOP BAR */}
//           <div>
//             <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
//               <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400">
//                 [ NAVIGATION ]
//               </span>

//               <button
//                 onClick={() => setMenuOpen(false)}
//                 className="p-2 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition"
//                 aria-label="Close menu"
//               >
//                 <XMarkIcon className="w-6 h-6 stroke-[1.8]" />
//               </button>
//             </div>

//             {/* LINKS */}
//             <nav className="flex flex-col gap-5 mt-8">
//               {links.map((link, idx) => (
//                 <NavLink
//                   key={link.to}
//                   to={link.to}
//                   onClick={() => setMenuOpen(false)}
//                   className={({ isActive }) =>
//                     `group flex items-baseline justify-between text-2xl sm:text-3xl font-light tracking-tight transition-colors ${isActive
//                       ? "text-orange-600 font-normal"
//                       : "text-neutral-900 hover:text-orange-600"
//                     }`
//                   }
//                 >
//                   <span>{link.label}</span>

//                   <span className="text-xs font-mono text-neutral-400 group-hover:text-orange-600 transition-colors">
//                     // 0{idx + 1}
//                   </span>
//                 </NavLink>
//               ))}
//             </nav>
//           </div>

//           {/* BOTTOM CONTACT */}
//           <div className="pt-8 border-t border-neutral-100 space-y-4">
//             <button
//               onClick={handleWhatsAppClick}
//               className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 transition-colors"
//             >
//               <img
//                 src={whatsapp}
//                 alt="WhatsApp"
//                 className="w-5 h-5 object-contain shrink-0"
//               />

//               <span className="text-xs font-mono uppercase tracking-wider text-neutral-700">
//                 Direct WhatsApp Query
//               </span>
//             </button>

//             <div className="text-center font-mono text-[11px] text-neutral-400">
//               Archana Kapil Associates • Dehradun
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

