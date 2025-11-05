// ✅ Detect backend API base URL automatically
const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  (window.location.hostname === "localhost"
    ? "http://127.0.0.1:8000" // Local FastAPI backend
    : "https://olympic-booking-backend-f2j5.vercel.app"); // ✅ Deployed backend URL

console.log("🌍 Using API Base:", API_BASE);

// ✅ Helper to handle response errors safely
async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

// ✅ Create booking
export async function createBooking(data) {
  const res = await fetch(`${API_BASE}/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

// ✅ Get all bookings
export async function getBookings() {
  const res = await fetch(`${API_BASE}/api/bookings`);
  return handleResponse(res);
}

// ✅ Check availability
export async function checkAvailability(date, start_min, end_min) {
  const params = new URLSearchParams({
    date,
    start_time: String(start_min),
    end_time: String(end_min),
  });

  const res = await fetch(`${API_BASE}/api/availability?${params.toString()}`);
  return handleResponse(res);
}

// ✅ Delete booking by ID
export async function deleteBooking(booking_id) {
  const res = await fetch(`${API_BASE}/api/bookings/${booking_id}`, {
    method: "DELETE",
  });
  await handleResponse(res);
  return true;
}

// ✅ Toggle booking done status
export async function toggleBookingDone(booking_id, done) {
  const res = await fetch(
    `${API_BASE}/api/bookings/${booking_id}/done?done=${done}`,
    { method: "PATCH" }
  );
  return handleResponse(res);
}
