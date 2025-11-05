import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ onBookNow }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600/90 backdrop-blur-md text-white shadow-md z-40">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* 🏅 Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          ZYKM Sports Club  🏅
        </Link>

        {/* 🍔 Hamburger Button (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* 💻 Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-yellow-300">
            Home
          </Link>
          <Link to="/sports" className="hover:text-yellow-300">
            Sports
          </Link>
          <Link to="/bookings" className="hover:text-yellow-300">
            Bookings
          </Link>
          <Link to="/contact" className="hover:text-yellow-300">
            Contact
          </Link>

          {/* 🟡 Book Now Button (opens modal) */}
          <button
            onClick={onBookNow}
            className="ml-4 bg-yellow-400 text-blue-800 font-semibold px-4 py-2 rounded-lg shadow-lg 
                     hover:bg-yellow-300 transition-all duration-300 
                     animate-pulse hover:scale-105"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* 📱 Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-500 px-6 pb-4 space-y-3">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block hover:text-yellow-300"
          >
            Home
          </Link>
          <Link
            to="/sports"
            onClick={() => setIsOpen(false)}
            className="block hover:text-yellow-300"
          >
            Sports
          </Link>
          <Link
            to="/bookings"
            onClick={() => setIsOpen(false)}
            className="block hover:text-yellow-300"
          >
            Bookings
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block hover:text-yellow-300"
          >
            Contact
          </Link>

          {/* 📲 Mobile Book Now Button (opens same modal) */}
          <button
            onClick={() => {
              setIsOpen(false);
              onBookNow();
            }}
            className="block w-full bg-yellow-400 text-blue-800 font-semibold px-4 py-2 rounded-lg shadow-lg 
                     hover:bg-yellow-300 transition-all duration-300 animate-pulse"
          >
            Book Now
          </button>
        </div>
      )}
    </nav>
  );
}
