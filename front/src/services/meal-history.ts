import type { SavedMeal, UpdateMeal } from "@fc/shared";

const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

const request = async <T>(url: string, init?: RequestInit): Promise<T> => {
    const res = await fetch(url, init);
    if (res.status === 204) return undefined as T;
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return res.json() as Promise<T>;
};

const jsonBody = (method: string, body: unknown): RequestInit => ({
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
});

export const getMeals = (): Promise<SavedMeal[]> => request(`${BASE}/meals`);

export const addMeal = (meal: SavedMeal): Promise<SavedMeal> =>
    request(`${BASE}/meals`, jsonBody("POST", meal));

export const updateMeal = (id: string, updates: UpdateMeal): Promise<SavedMeal> =>
    request(`${BASE}/meals/${id}`, jsonBody("PUT", updates));

export const removeMeal = (id: string): Promise<void> =>
    request(`${BASE}/meals/${id}`, { method: "DELETE" });
