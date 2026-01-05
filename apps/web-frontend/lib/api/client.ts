type ApiResult<T> = {
  data: T;
  demo: boolean;
  error?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "/api";
const AI_BASE = process.env.NEXT_PUBLIC_AI_BASE || "/ai";

async function request<T>({
  url,
  method,
  body,
  fallback
}: {
  url: string;
  method: "GET" | "POST" | "PATCH";
  body?: unknown;
  fallback?: () => T;
}): Promise<ApiResult<T>> {
  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined
    });

    if (!res.ok) {
      if (fallback) {
        return { data: fallback(), demo: true, error: res.statusText };
      }
      throw new Error(res.statusText);
    }

    const json = (await res.json()) as T;
    return { data: json, demo: false };
  } catch (error) {
    if (fallback) {
      return {
        data: fallback(),
        demo: true,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
    throw error;
  }
}

export function apiGet<T>(path: string, fallback?: () => T) {
  return request<T>({
    url: `${API_BASE}${path}`,
    method: "GET",
    fallback
  });
}

export function apiPost<T>(path: string, body?: unknown, fallback?: () => T) {
  return request<T>({
    url: `${API_BASE}${path}`,
    method: "POST",
    body,
    fallback
  });
}

export function apiPatch<T>(path: string, body?: unknown, fallback?: () => T) {
  return request<T>({
    url: `${API_BASE}${path}`,
    method: "PATCH",
    body,
    fallback
  });
}

export function aiPost<T>(path: string, body?: unknown, fallback?: () => T) {
  return request<T>({
    url: `${AI_BASE}${path}`,
    method: "POST",
    body,
    fallback
  });
}
