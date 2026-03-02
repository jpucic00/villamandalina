// In Next.js, API routes are same-origin — no base URL needed
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(endpoint, { ...options, headers });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || "Request failed");
  }

  return response.json();
};

export const logInWithEmailAndPassword = async (email: string, password: string) => {
  const data = await apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem("token", data.token);
  return data.user;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const verifyToken = async () => {
  try {
    const data = await apiRequest("/api/auth/verify");
    return data.user;
  } catch {
    localStorage.removeItem("token");
    return null;
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token");
};

export const getBookedDates = async () => apiRequest("/api/booked-dates");

export const createBookedDate = async (startDate: string, endDate: string) =>
  apiRequest("/api/booked-dates", {
    method: "POST",
    body: JSON.stringify({ startDate, endDate }),
  });

export const deleteBookedDate = async (id: number) =>
  apiRequest(`/api/booked-dates/${id}`, { method: "DELETE" });

export const getPrices = async () => apiRequest("/api/prices");

export const createPrice = async (startDate: string, endDate: string, price: string) =>
  apiRequest("/api/prices", {
    method: "POST",
    body: JSON.stringify({ startDate, endDate, price }),
  });

export const updatePrice = async (
  id: number,
  startDate: string,
  endDate: string,
  price: string
) =>
  apiRequest(`/api/prices/${id}`, {
    method: "PUT",
    body: JSON.stringify({ startDate, endDate, price }),
  });

export const deletePrice = async (id: number) =>
  apiRequest(`/api/prices/${id}`, { method: "DELETE" });
