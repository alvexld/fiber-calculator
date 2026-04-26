import type { Ingredient } from "../../../gql/generated";

export const formatUnit = (ingredient: Pick<Ingredient, "unit" | "unitDisplay">): string =>
    ingredient.unit === "HUNDRED_G" ? "100g" : (ingredient.unitDisplay ?? "pièce");
