import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFootballBall,
  FaBasketballBall,
  FaVolleyballBall,
} from "react-icons/fa";
import {
  GiCricketBat,
  GiTennisRacket,
  GiShuttlecock,
  GiPoolTriangle,
} from "react-icons/gi";

const sportsList = [
  {
    name: "Football",
    fee: 1500,
    icon: <FaFootballBall className="text-6xl text-blue-500" />,
  },
  {
    name: "Cricket",
    fee: 1000,
    icon: <GiCricketBat className="text-6xl text-green-600" />,
  },
  {
    name: "Tennis",
    fee: 400,
    icon: <GiTennisRacket className="text-6xl text-yellow-500" />,
  },
  {
    name: "Badminton",
    fee: 500,
    icon: <GiShuttlecock className="text-6xl text-pink-500" />,
  },
  {
    name: "Basketball",
    fee: 1200,
    icon: <FaBasketballBall className="text-6xl text-orange-500" />,
  },
  {
    name: "Snooker",
    fee: 1250,
    icon: <GiPoolTriangle className="text-6xl text-purple-500" />,
  },
  {
    name: "Volleyball",
    fee: 800,
    icon: <FaVolleyballBall className="text-6xl text-yellow-600" />,
  },
];

export default function Sports() {
  const navigate = useNavigate();

  const handleBookNow = (sport) => {
    navigate("/book", { state: { game: sport.name, fee: sport.fee } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white pt-24 pb-16 px-4 sm:px-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-700 mb-10 drop-shadow-sm">
        Our Sports & Fee Structure 🏅
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {sportsList.map((sport, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 
                       transform hover:-translate-y-2 hover:scale-105 p-6 text-center"
          >
            <div className="text-6xl mb-4 flex justify-center">{sport.icon}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {sport.name}
            </h2>
            <p className="text-gray-700 text-lg font-semibold">
              PKR {sport.fee} / hour
            </p>

            <button
              onClick={() => handleBookNow(sport)}
              className="mt-5 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium
                         hover:bg-blue-700 transition-all duration-300 w-full sm:w-auto"
            >
              Go for Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
