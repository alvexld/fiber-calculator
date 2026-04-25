const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export const login = async (username: string, password: string): Promise<void> => {
    const res = await fetch(`${BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("Invalid credentials");
};

export const logout = async (): Promise<void> => {
    await fetch(`${BASE}/auth/logout`, { method: "POST", credentials: "include" });
};

export const getMe = async (): Promise<{ username: string } | null> => {
    const res = await fetch(`${BASE}/auth/me`, { credentials: "include" });
    if (!res.ok) return null;
    return res.json() as Promise<{ username: string }>;
};
