// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   MapPinIcon,
// } from "@heroicons/react/24/outline";
// import {
//   FaInstagram,
//   FaLinkedinIn,
//   FaFacebookF,
//   FaWhatsapp,
// } from "react-icons/fa";

// export default function Footer() {
//   return (
//     <motion.footer
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//       className="bg-black"
//     >
//       <div className="max-w-7xl mx-auto px-8 md:px-10 py-16 md:py-20">

//         {/* TOP GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-14">

//           {/* BRAND */}
//           <div>
//             <h3 className="text-m uppercase tracking-[0.25em] text-white mb-6">
//               Archana Kapil Associates
//             </h3>

//             <p className="text-m leading-relaxed max-w-sm text-white/90">
//               A Dehradun-based multidisciplinary design practice, established
//               in 2013, delivering architecture, interiors, landscape, and
//               site planning solutions grounded in context, craft, and
//               long-term value.
//             </p>

//             {/* SOCIAL */}
//             <div className="flex items-center gap-4 mt-6">
//               <a
//                 href="https://www.instagram.com/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Instagram"
//                 className="text-white/70 hover:text-white transition transform hover:-translate-y-0.5"
//               >
//                 <FaInstagram size={18} />
//               </a>

//               <a
//                 href="https://www.linkedin.com/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="LinkedIn"
//                 className="text-white/70 hover:text-white transition transform hover:-translate-y-0.5"
//               >
//                 <FaLinkedinIn size={18} />
//               </a>

//               <a
//                 href="https://www.linkedin.com/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="LinkedIn"
//                 className="text-white/70 hover:text-white transition transform hover:-translate-y-0.5"
//               >
//                 <FaFacebookF size={18} />
//               </a>

//               <a
//                 href="https://www.linkedin.com/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="LinkedIn"
//                 className="text-white/70 hover:text-white transition transform hover:-translate-y-0.5"
//               >
//                 <FaWhatsapp size={18} />
//               </a>
//             </div>
//           </div>

//           {/* INFORMATION */}
//           <div className="md:text-center">
//             <p className="text-m uppercase tracking-[0.25em] text-white mb-6">
//               Information
//             </p>

//             <nav className="flex flex-col gap-4 text-m">
//               <Link
//                 to="/projects"
//                 className="text-white/90 hover:text-white transition transform hover:-translate-y-0.5"
//               >
//                 Projects
//               </Link>
//               <Link
//                 to="/services"
//                 className="text-white/90 hover:text-white transition transform hover:-translate-y-0.5"
//               >
//                 Services
//               </Link>
//               <Link
//                 to="/about"
//                 className="text-white/90 hover:text-white transition transform hover:-translate-y-0.5"
//               >
//                 About the Studio
//               </Link>
//               <Link
//                 to="/contact"
//                 className="text-white/90 hover:text-white transition transform hover:-translate-y-0.5"
//               >
//                 Contact
//               </Link>
//               <Link
//                 to="/career"
//                 className="text-white/90 hover:text-white transition transform hover:-translate-y-0.5"
//               >
//                 Career
//               </Link>
//             </nav>
//           </div>

//           {/* ADDRESS */}
//           <div className="md:text-right">
//             <p className="text-m uppercase tracking-[0.25em] text-white mb-6">
//               Office
//             </p>

//             <p className="text-m text-white/90 leading-relaxed mb-4">
//               48,Pleasant Valley, Rajpur Road <br />
//               Dehradun, Uttarakhand 248009
//             </p>

//             <a
//               href="https://www.google.com/maps?q=Pleasant+Valley+Rajpur+Road+Dehradun"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition"
//             >
//               <MapPinIcon className="w-4 h-4" />
//               View on Google Maps
//             </a>
//           </div>

//         </div>

//         {/* DIVIDER */}
//         <div className="border-t border-white/30 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/70">

//           <p>
//             © {new Date().getFullYear()} Archana Kapil Associates. All rights reserved.
//           </p>

//           <p className="tracking-wide">
//             Architecture · Interiors · Landscape
//           </p>

//         </div>
//       </div>
//     </motion.footer>
//   );
// }


import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// import { FaInstagram, FaLinkedinIn, FaFacebookF, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white text-black"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-10 py-16 md:py-20">

        {/* MAIN FOOTER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">

          {/* LEFT — NAVIGATION */}
          <div>
            <p className="text-sm uppercase tracking-[0.25em] mb-7">
              Explore
            </p>

            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-lg  hover:text-arcadisOrange transition-colors"
              >
                Home
              </Link>

              <Link
                to="/projects"
                className="text-lg hover:text-arcadisOrange transition-colors"
              >
                Projects
              </Link>

              <Link
                to="/about"
                className="text-lg  hover:text-arcadisOrange transition-colors"
              >
                Team
              </Link>

              <Link
                to="/contact"
                className="text-lg  hover:text-arcadisOrange transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* RIGHT — CONTACT */}
          <div className="md:text-right">
            <p className="text-sm uppercase tracking-[0.25em] mb-7">
              Get in Touch
            </p>

            <div className="space-y-4 ">
              <div>
                {/* <p className="text-sm  mb-1">
                  Address
                </p> */}

                <p className="leading-relaxed">
                  48, Pleasant Valley, Rajpur Road
                  <br />
                  Dehradun, Uttarakhand 248009
                </p>
              </div>

              <div>
                {/* <p className="text-sm  mb-1">
                  Phone Number
                </p> */}

                <a
                  href="tel:+919719799992"
                  className="text-base hover:text-arcadisOrange transition-colors"
                >
                  +91 97197 99992
                </a>
              </div>

              <div>
                {/* <p className="text-sm  mb-1">
                  Email
                </p> */}

                <a
                  href="mailto:kapil@lifepage.in"
                  className="text-base hover:text-arcadisOrange transition-colors"
                >
                  kapil@lifepage.in
                </a>
              </div>
            </div>

            {/* SOCIAL ICONS */}
            {/* <div className="flex md:justify-end items-center gap-5 mt-8">

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/60 hover:text-white transition-colors"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/60 hover:text-white transition-colors"
              >
                <FaLinkedinIn size={18} />
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white/60 hover:text-white transition-colors"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-white/60 hover:text-white transition-colors"
              >
                <FaWhatsapp size={18} />
              </a>

            </div> */}
          </div>

        </div>

        {/* GREY DIVIDER */}
        <div className=" mt-16 pt-7">

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            {/* COPYRIGHT */}
            <p className="text-xs md:text-sm  text-center md:text-left">
              © 2013 Archana Kapil Associates Private Limited. All rights reserved.
            </p>

            {/* SERVICES */}
            <p className="text-xs md:text-sm  tracking-wide text-center md:text-right">
              Planning · Architecture · Interior · Landscape
            </p>

          </div>

        </div>

      </div>
    </motion.footer>
  );
}
