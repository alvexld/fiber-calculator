import type { SavedMeal, UpdateMeal } from "@fc/shared";
import { apiUrl, jsonBody, request } from "./api-client";

export const getMeals = (): Promise<SavedMeal[]> => request(apiUrl("/meals"));

export const addMeal = (meal: SavedMeal): Promise<SavedMeal> =>
    request(apiUrl("/meals"), jsonBody("POST", meal));

export const updateMeal = (id: string, updates: UpdateMeal): Promise<SavedMeal> =>
    request(apiUrl(`/meals/${id}`), jsonBody("PUT", updates));

export const removeMeal = (id: string): Promise<void> =>
    request(apiUrl(`/meals/${id}`), { method: "DELETE" });
