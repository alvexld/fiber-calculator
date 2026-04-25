import type { CreateIngredient, Ingredient } from "@fc/shared";
import { apiUrl, jsonBody, request } from "./api-client";

export const getIngredients = ({
    search,
    orderBy,
    page,
    perPage,
}: {
    search?: string;
    orderBy?: "name" | "usage";
    page?: number;
    perPage?: number;
} = {}): Promise<Ingredient[]> => {
    const url = new URL(apiUrl("/ingredients"));
    if (search) url.searchParams.set("search", search);
    if (orderBy) url.searchParams.set("orderBy", orderBy);
    if (page !== undefined) url.searchParams.set("page", String(page));
    if (perPage !== undefined) url.searchParams.set("perPage", String(perPage));
    return request(url.toString());
};

export const createIngredient = (data: CreateIngredient): Promise<Ingredient> =>
    request(apiUrl("/ingredients"), jsonBody("POST", data));

export const updateIngredient = (id: string, data: CreateIngredient): Promise<Ingredient> =>
    request(apiUrl(`/ingredients/${id}`), jsonBody("PUT", data));

export const deleteIngredient = (id: string): Promise<void> =>
    request(apiUrl(`/ingredients/${id}`), { method: "DELETE" });
