import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBooking, checkAvailability } from "../api";

function timeToMinutes(t) {
  // t is "HH:MM" string (24-hour)
  if (!t) return null;
  const [hh, mm] = t.split(":").map(Number);
  return hh * 60 + mm;
}

function minutesToTimeStr(min) {
  const hh = Math.floor(min / 60);
  const mm = min % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(hh)}:${pad(mm)}`;
}

export default function BookingForm({ onClose }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    game: "",
    start_time: "", // "HH:MM"
    end_time: "",   // "HH:MM"
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [conflicts, setConflicts] = useState([]); // bookings overlapping selected range

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // clear conflicts when user edits time/date/game so they can re-check
    if (["start_time", "end_time", "date"].includes(name)) {
      setConflicts([]);
    }
  };

  const handleClose = () => {
    if (onClose) onClose();
    else navigate(-1);
  };

  const validateForm = () => {
    const { name, contact, game, start_time, end_time, date } = formData;
    if (!name.trim() || !contact.trim() || !game.trim() || !date)
      return "Please fill all required fields.";

    const start = timeToMinutes(start_time);
    const end = timeToMinutes(end_time);
    if (start === null || end === null) return "Start and end time required.";
    if (start < 0 || start > 1439 || end < 0 || end > 1439) return "Times out of range.";
    if (start >= end) return "Start time must be less than end time.";
    return null;
  };

  // call availability endpoint and set conflicts
  const checkForConflicts = async () => {
    const { date, start_time, end_time } = formData;
    const start = timeToMinutes(start_time);
    const end = timeToMinutes(end_time);
    if (!date || start == null || end == null) {
      setConflicts([]);
      return [];
    }
    try {
      const results = await checkAvailability(date, start, end);
      setConflicts(results || []);
      return results || [];
    } catch (err) {
      console.error("Failed to check availability:", err);
      setConflicts([]);
      return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) return alert(`❌ ${validationError}`);

    // check conflicts first
    setLoading(true);
    try {
      const overlapping = await checkForConflicts();
      if (overlapping && overlapping.length > 0) {
        // show a human-friendly summary and let user decide
        const msg = overlapping
          .map(
            (b) =>
              `${b.game} — ${minutesToTimeStr(b.start_time)} to ${minutesToTimeStr(
                b.end_time
              )}`
          )
          .join("\n");
        const proceed = window.confirm(
          `⚠️ The following bookings overlap your chosen time:\n\n${msg}\n\nDo you want to continue anyway?`
        );
        if (!proceed) {
          setLoading(false);
          return;
        }
      }

      // prepare payload: convert times to minutes
      const payload = {
        name: formData.name.trim(),
        contact: formData.contact.trim(),
        game: formData.game.trim(),
        start_time: timeToMinutes(formData.start_time),
        end_time: timeToMinutes(formData.end_time),
        date: formData.date,
      };

      const data = await createBooking(payload);
      alert(`✅ Booking successful! Your booking ID is ${data.booking_id}`);

      // reset
      setFormData({
        name: "",
        contact: "",
        game: "",
        start_time: "",
        end_time: "",
        date: "",
      });
      setConflicts([]);
      if (onClose) onClose();
    } catch (err) {
      console.error("Booking failed:", err);
      alert(`❌ ${err.message || "Failed to connect to backend."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button onClick={handleClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl">✖</button>

        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Book Your Sport</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium">Your Name</label>
            <input name="name" type="text" value={formData.name} onChange={handleChange} required className="w-full border rounded-lg p-2 mt-1" placeholder="Enter your name" />
          </div>

          <div>
            <label className="block font-medium">Contact</label>
            <input name="contact" type="text" value={formData.contact} onChange={handleChange} required className="w-full border rounded-lg p-2 mt-1" placeholder="Enter your contact number" />
          </div>

          <div>
            <label className="block font-medium">Sport Name</label>
            <select name="game" value={formData.game} onChange={handleChange} required className="w-full border rounded-lg p-2 mt-1">
              <option value="">Select sport</option>
              <option value="football">Football</option>
              <option value="cricket">Cricket</option>
              <option value="tennis">Tennis</option>
              <option value="badminton">Badminton</option>
              <option value="basketball">Basketball</option>
              <option value="snooker">Snooker</option>
              <option value="volleyball">Volleyball</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Date</label>
            <input name="date" type="date" value={formData.date} onChange={handleChange} required className="w-full border rounded-lg p-2 mt-1" />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block font-medium">Start Time</label>
              <input name="start_time" type="time" value={formData.start_time} onChange={handleChange} required className="w-full border rounded-lg p-2 mt-1" />
            </div>
            <div className="flex-1">
              <label className="block font-medium">End Time</label>
              <input name="end_time" type="time" value={formData.end_time} onChange={handleChange} required className="w-full border rounded-lg p-2 mt-1" />
            </div>
          </div>

          {conflicts.length > 0 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-300 p-3 rounded">
              <strong className="block">Conflicting bookings:</strong>
              <ul className="mt-2 text-sm">
                {conflicts.map((b) => (
                  <li key={b.booking_id}>
                    {b.game} — {minutesToTimeStr(b.start_time)} to {minutesToTimeStr(b.end_time)}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-gray-600">You can change times or continue to attempt booking (you will be warned if the backend rejects it).</p>
            </div>
          )}

          <div className="flex gap-2">
            <button type="button" onClick={checkForConflicts} disabled={loading} className="flex-1 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
              Check Availability
            </button>
            <button type="submit" disabled={loading} className={`flex-1 py-2 rounded-lg transition-all ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
