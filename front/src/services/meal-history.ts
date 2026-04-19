import type { AppType, SavedMeal, UpdateMeal } from "@fc/shared";
import { hc } from "hono/client";

const client = hc<AppType>(import.meta.env.VITE_API_URL ?? "http://localhost:3001");

export const getMeals = async (): Promise<SavedMeal[]> => {
    const res = await client.meals.$get();
    return res.json();
};

export const addMeal = async (meal: SavedMeal): Promise<SavedMeal> => {
    const res = await client.meals.$post({ json: meal });
    return res.json();
};

export const updateMeal = async (id: string, updates: UpdateMeal): Promise<SavedMeal> => {
    const res = await client.meals[":id"].$put({ param: { id }, json: updates });
    return res.json();
};

export const removeMeal = async (id: string): Promise<void> => {
    await client.meals[":id"].$delete({ param: { id } });
};
