const API = "http://localhost:8080";

export const requestOtp = async (identifier: string) => {
  const res = await fetch(`${API}/auth/request-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier }),
  });
  return res.json();
};

export const verifyOtp = async (identifier: string, otp: string) => {
  const res = await fetch(`${API}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, otp }),
  });
  return res.json();
};

export const getMe = async (token: string) => {
  const res = await fetch(`${API}/auth/me`, {
    headers: { Authorization: token },
  });
  return res.json();
};
