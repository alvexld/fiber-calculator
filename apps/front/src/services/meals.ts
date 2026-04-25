import type { CreateMeal, SavedMeal, UpdateMeal } from "@fc/shared";
import { apiUrl, jsonBody, request } from "./api-client";

export const getMeals = (): Promise<SavedMeal[]> => request(apiUrl("/meals"));

export const getMeal = (id: string): Promise<SavedMeal> => request(apiUrl(`/meals/${id}`));

export const addMeal = (meal: CreateMeal): Promise<SavedMeal> =>
    request(apiUrl("/meals"), jsonBody("POST", meal));

export const updateMeal = (id: string, updates: UpdateMeal): Promise<SavedMeal> =>
    request(apiUrl(`/meals/${id}`), jsonBody("PUT", updates));

export const removeMeal = (id: string): Promise<void> =>
    request(apiUrl(`/meals/${id}`), { method: "DELETE" });
