// ✅ Detect backend API base URL automatically
const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  (window.location.hostname === "localhost"
    ? "http://127.0.0.1:8000" // local FastAPI
    : "https://your-backend-name.vercel.app"); // 🔹 replace with your actual deployed backend URL

console.log("🌍 Using API Base:", API_BASE);

// ✅ Create booking
export async function createBooking(data) {
  const res = await fetch(`${API_BASE}/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// ✅ Get all bookings
export async function getBookings() {
  const res = await fetch(`${API_BASE}/api/bookings`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// ✅ Delete booking by ID
export async function deleteBooking(booking_id) {
  const res = await fetch(`${API_BASE}/api/bookings/${booking_id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(await res.text());
  return true;
}

// ✅ Toggle booking done status (PATCH with query param)
export async function toggleBookingDone(booking_id, done) {
  const res = await fetch(
    `${API_BASE}/api/bookings/${booking_id}/done?done=${done}`,
    { method: "PATCH" }
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
