import React, { useEffect, useState } from "react";
import { getBookings, deleteBooking, toggleBookingDone } from "../api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // fetch bookings
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await getBookings();
      setBookings(data);
      setError("");
    } catch (err) {
      setError("❌ Failed to load bookings: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm("⚠️ Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;
    try {
      await deleteBooking(id);
      setBookings((prev) => prev.filter((b) => b.booking_id !== id));
      alert("✅ Booking cancelled successfully");
    } catch (err) {
      alert("❌ Failed to cancel booking: " + err.message);
    }
  };

  const handleMarkDone = async (id, currentStatus) => {
    try {
      await toggleBookingDone(id, !currentStatus);
      setBookings((prev) =>
        prev.map((b) =>
          b.booking_id === id ? { ...b, done: !currentStatus } : b
        )
      );
    } catch (err) {
      alert("❌ Failed to update match status: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 pt-20">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-4 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6 text-center">
          All Bookings
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {loading && <p className="text-gray-600 text-center">Loading bookings...</p>}

        {/* ✅ Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Game</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Fee</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.length > 0 ? (
                bookings.map((b) => (
                  <tr
                    key={b.booking_id}
                    className={`border-b hover:bg-gray-50 transition ${
                      b.done ? "opacity-60" : ""
                    }`}
                  >
                    <td className="p-3 font-semibold">{b.booking_id}</td>
                    <td className={`p-3 ${b.done ? "line-through text-gray-500" : ""}`}>
                      {b.name}
                    </td>
                    <td className={`p-3 capitalize ${b.done ? "line-through text-gray-500" : ""}`}>
                      {b.game}
                    </td>
                    <td className="p-3">{b.date}</td>
                    <td className="p-3">
                      {b.start_time} - {b.end_time}
                    </td>
                    <td className="p-3">Rs. {b.fee}</td>
                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() => handleMarkDone(b.booking_id, b.done)}
                        className={`px-3 py-1 rounded-md text-white text-sm ${
                          b.done
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-400 hover:bg-gray-500"
                        }`}
                      >
                        {b.done ? "Undo" : "Match Done"}
                      </button>

                      <button
                        onClick={() => handleCancel(b.booking_id)}
                        className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 py-6">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ✅ Mobile Card View */}
        <div className="sm:hidden space-y-4">
          {bookings.length > 0 ? (
            bookings.map((b) => (
              <div
                key={b.booking_id}
                className={`border rounded-lg p-4 shadow-sm ${
                  b.done ? "bg-gray-100 opacity-70" : "bg-white"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-blue-700">
                    {b.name}
                  </h3>
                  <span className="text-sm text-gray-500">#{b.booking_id}</span>
                </div>

                <p className="text-sm text-gray-600 capitalize">
                  <span className="font-medium text-gray-800">Game:</span> {b.game}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">Date:</span> {b.date}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">Time:</span>{" "}
                  {b.start_time} - {b.end_time}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium text-gray-800">Fee:</span> Rs. {b.fee}
                </p>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleMarkDone(b.booking_id, b.done)}
                    className={`py-2 rounded-md text-white text-sm ${
                      b.done
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-400 hover:bg-gray-500"
                    }`}
                  >
                    {b.done ? "Undo" : "Match Done"}
                  </button>

                  <button
                    onClick={() => handleCancel(b.booking_id)}
                    className="py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No bookings found</p>
          )}
        </div>
      </div>
    </div>
  );
}
