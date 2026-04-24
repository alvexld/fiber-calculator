import type { CreateIngredient, Ingredient } from "@fc/shared";
import { apiUrl, jsonBody, request } from "./api-client";

export const getIngredients = (search?: string): Promise<Ingredient[]> => {
    const url = new URL(apiUrl("/ingredients"));
    if (search) url.searchParams.set("search", search);
    return request(url.toString());
};

export const createIngredient = (data: CreateIngredient): Promise<Ingredient> =>
    request(apiUrl("/ingredients"), jsonBody("POST", data));

export const updateIngredient = (id: string, data: CreateIngredient): Promise<Ingredient> =>
    request(apiUrl(`/ingredients/${id}`), jsonBody("PUT", data));

export const deleteIngredient = (id: string): Promise<void> =>
    request(apiUrl(`/ingredients/${id}`), { method: "DELETE" });
