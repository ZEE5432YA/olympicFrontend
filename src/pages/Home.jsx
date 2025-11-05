import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Local image imports (make sure these files exist in src/assets/)
import bg1 from "../assets/enternance.jpg";
import bg2 from "../assets/circket.jpg";
import bg3 from "../assets/ourgroup.jpg";
import bg4 from "../assets/football.jpg";
import bg5 from "../assets/volleyball.jpg";
import bg6 from "../assets/fotbal.jpg";

export default function Home() {
  const navigate = useNavigate();

  // ✅ Images array
  const images = [bg1, bg2, bg3, bg4, bg5,bg6];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // ✅ Auto change background with fade every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade-out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setFade(true); // fade-in next image
      }, 500); // fade duration
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleBookNow = () => {
    navigate("/book");
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-center text-white transition-opacity duration-700 ease-in-out ${
        fade ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Center content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to ZYKM Sports Club Skardu 🏆
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 mb-8">
          Book your favorite sports arenas with ease and play like a champion!
        </p>

        <button
          onClick={handleBookNow}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-transform duration-300 hover:scale-110"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
