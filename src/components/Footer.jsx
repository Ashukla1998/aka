import React from "react";

export default function Footer() {
  return (
    <footer className="px-10 py-8 border-t border-gray-100 text-sm text-gray-600">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Copyright */}
        <div>
          © {new Date().getFullYear()} Archies. All rights reserved.
        </div>

        {/* Footer Links */}
        <nav className="flex gap-4">
          <a className="hover:text-gray-900" href="#">Privacy</a>
          <a className="hover:text-gray-900" href="#">Terms</a>
          <a className="hover:text-gray-900" href="#">Careers</a>
        </nav>

      </div>
    </footer>
  );
}
