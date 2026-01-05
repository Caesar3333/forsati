import { apiPost } from "@/lib/api/client";

export async function login(payload: { email: string; password: string }) {
  return apiPost("/auth/login", payload, () => ({
    accessToken: "demo-token",
    refreshToken: "demo-refresh"
  }));
}

export async function register(payload: {
  name: string;
  email: string;
  password: string;
}) {
  return apiPost("/auth/register", payload, () => ({
    id: "demo-user",
    email: payload.email
  }));
}

export async function forgotPassword(payload: { email: string }) {
  return apiPost("/auth/forgot-password", payload, () => ({
    ok: true
  }));
}
