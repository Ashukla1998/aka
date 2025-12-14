// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-10 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">

        {/* Brand */}
        <div>
          <p className="font-serif text-lg text-gray-900 mb-3">
            Archana Kapil Associates
          </p>
          <p className="max-w-xs leading-relaxed">
            Designing thoughtful, sustainable environments that shape
            better futures.
          </p>
        </div>

        {/* Links */}
        <div className="md:text-center">
          <nav className="flex flex-col gap-3">
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900">Terms of Use</a>
            <a href="#" className="hover:text-gray-900">Careers</a>
          </nav>
        </div>

        {/* Copyright */}
        <div className="md:text-right text-gray-500">
          <p>
            © {new Date().getFullYear()} Archana Kapil Associates
          </p>
          <p className="mt-2 text-xs">
            All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
