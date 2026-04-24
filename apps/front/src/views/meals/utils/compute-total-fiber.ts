import type { MenuIngredient } from "../../../types/meal";

export const computeTotalFiber = (ingredients: MenuIngredient[]): number =>
    ingredients.reduce((total, item) => total + item.fiberGrams, 0);
