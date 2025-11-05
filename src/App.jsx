import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Sports from "./pages/Sports";
import Bookings from "./pages/Bookings";
import Contact from "./pages/Contact";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar onBookNow={() => setShowForm(true)} />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/sports"
            element={<Sports onBookNow={() => setShowForm(true)} />}
          />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/contact" element={<Contact />} />
          {/* ✅ New route for Home page "Book Now" button */}
          <Route path="/book" element={<BookingForm />} />
        </Routes>
      </main>

      {showForm && <BookingForm onClose={() => setShowForm(false)} />}
      <Footer />
    </div>
  );
}

export default App;
