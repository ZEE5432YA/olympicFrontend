import React from "react";
import { FaGithub, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-10  border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 items-center text-center md:text-left">
        
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            ZeeshuNinja Coders
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Innovating the future of sports management through code & creativity.
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-8 text-3xl">
          <a
            href="https://github.com/ZEE5432YA"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 hover:scale-125 transition-transform duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.facebook.com/zeeshan.saleem.tanhai.2025"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 hover:scale-125 transition-transform duration-300"
          >
            <FaFacebook />
          </a>
          <a
            href="https://instagram.com/shameer_sahil"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 hover:scale-125 transition-transform duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 hover:scale-125 transition-transform duration-300"
          >
            <FaTwitter />
          </a>
        </div>

        {/* Club Info */}
        <div className="text-center md:text-right">
          <h3 className="text-lg font-semibold text-white">
            ZYKM Sports Club 2025
          </h3>
          <p className="text-gray-400 text-sm">
            Where passion meets performance 🏆
          </p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ZeeshuNinja Coders — All rights reserved.
      </div>
    </footer>
  );
}
