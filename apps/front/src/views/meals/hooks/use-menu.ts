import { useState } from "react";
import type { MenuIngredient } from "../../../types/meal";

type AddIngredientParams = Omit<MenuIngredient, "id">;

export const useMenu = (initialIngredients: MenuIngredient[] = []) => {
    const [ingredients, setIngredients] = useState<MenuIngredient[]>(initialIngredients);

    const addIngredient = (params: AddIngredientParams) => {
        setIngredients((prev) => [...prev, { id: crypto.randomUUID(), ...params }]);
    };

    const removeIngredient = (id: string) => {
        setIngredients((prev) => prev.filter((item) => item.id !== id));
    };

    const updateIngredient = (id: string, quantity: number) => {
        setIngredients((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity, fiberGrams: quantity * item.fiberPerUnit }
                    : item,
            ),
        );
    };

    const resetMenu = () => setIngredients([]);

    return {
        ingredients,
        addIngredient,
        removeIngredient,
        updateIngredient,
        resetMenu,
    };
};
