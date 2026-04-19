import type { Ingredient } from "@fc/shared";

const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export const getIngredients = async (search?: string): Promise<Ingredient[]> => {
    const url = new URL(`${BASE}/ingredients`);
    if (search) url.searchParams.set("search", search);
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return res.json() as Promise<Ingredient[]>;
};
