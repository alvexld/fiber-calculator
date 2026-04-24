import type { CreateIngredient, Ingredient } from "@fc/shared";

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

export const getIngredients = async (search?: string): Promise<Ingredient[]> => {
    const url = new URL(`${BASE}/ingredients`);
    if (search) url.searchParams.set("search", search);
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return res.json() as Promise<Ingredient[]>;
};

export const createIngredient = (data: CreateIngredient): Promise<Ingredient> =>
    request(`${BASE}/ingredients`, jsonBody("POST", data));

export const updateIngredient = (id: string, data: CreateIngredient): Promise<Ingredient> =>
    request(`${BASE}/ingredients/${id}`, jsonBody("PUT", data));

export const deleteIngredient = (id: string): Promise<void> =>
    request(`${BASE}/ingredients/${id}`, { method: "DELETE" });
