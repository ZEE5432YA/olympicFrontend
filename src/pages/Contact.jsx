import { FaWhatsapp, FaGithub } from "react-icons/fa";
import bgImage from "../assets/cdipic.jpg"; // ✅ make sure path is correct

export default function Contact() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-center relative p-10"
      style={{
        backgroundImage: `linear-gradient(
          rgba(0, 0, 0, 0.6),
          rgba(0, 0, 0, 0.6)
        ), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content Overlay */}
      <div className="relative z-10 text-white">
        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-4 drop-shadow-lg">
          Contact Us 📞
        </h1>

        {/* Email */}
        <p className="text-lg mb-8 text-gray-200">
          Need help? Reach us at{" "}
          <span className="text-green-400 font-semibold">
            saleemzee68@gmail.com
          </span>
        </p>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/923554595792"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-3 bg-green-500 hover:bg-green-600 text-white 
                     px-6 py-3 rounded-full shadow-lg text-xl font-semibold transition-all duration-300 
                     transform hover:scale-110 hover:shadow-2xl mb-6"
        >
          <FaWhatsapp size={32} className="text-white" />
          <span>Chat on WhatsApp</span>
        </a>

        {/* GitHub Button */}
        <a
          href="https://github.com/ZEESHANSALEEM51"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-3 bg-gray-800 hover:bg-gray-900 text-white 
                     px-6 py-3 rounded-full shadow-lg text-xl font-semibold transition-all duration-300 
                     transform hover:scale-110 hover:shadow-2xl"
        >
          <FaGithub size={32} className="text-white" />
          <span>Visit My GitHub</span>
        </a>
      </div>

      {/* Optional dark overlay for extra contrast */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>
    </div>
  );
}
