import { apiUrl } from "./api-client";

export const login = async (username: string, password: string): Promise<void> => {
    const res = await fetch(apiUrl("/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string };
        throw new Error(data.message ?? "Identifiants invalides");
    }
};

export const logout = async (): Promise<void> => {
    await fetch(apiUrl("/auth/logout"), {
        method: "POST",
        credentials: "include",
    });
};

export const getMe = async (): Promise<{ username: string } | null> => {
    const res = await fetch(apiUrl("/auth/me"), {
        credentials: "include",
    }).catch(() => null);
    if (!res?.ok) return null;
    return res.json() as Promise<{ username: string }>;
};
