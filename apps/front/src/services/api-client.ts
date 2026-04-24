const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export const apiUrl = (path: string) => `${BASE}${path}`;

export const request = async <T>(url: string, init?: RequestInit): Promise<T> => {
    const res = await fetch(url, { credentials: "include", ...init });
    if (res.status === 204) return undefined as T;
    if (res.status === 401) {
        window.location.href = "/login";
        return undefined as T;
    }
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return res.json() as Promise<T>;
};

export const jsonBody = (method: string, body: unknown): RequestInit => ({
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
});
