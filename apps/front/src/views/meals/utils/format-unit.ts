import type { Ingredient } from "@fc/shared";

export const formatUnit = (ingredient: Pick<Ingredient, "unit" | "unitDisplay">): string =>
    ingredient.unit === "HUNDRED_G" ? "100g" : (ingredient.unitDisplay ?? "pièce");
