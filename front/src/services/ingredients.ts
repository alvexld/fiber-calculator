import type { Ingredient } from "@fc/shared";

const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export const getIngredients = async (): Promise<Ingredient[]> => {
    const res = await fetch(`${BASE}/ingredients`);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return res.json() as Promise<Ingredient[]>;
};
