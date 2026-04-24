import type { Ingredient } from "@fc/shared";
import { useIngredientsManager } from "./hooks/use-ingredients-manager";
import { IngredientsUI } from "./ingredients.ui";

type IngredientsViewProps = { ingredients: Ingredient[] };

export const IngredientsView = ({ ingredients }: IngredientsViewProps) => {
    const { addIngredient, editIngredient, removeIngredient } = useIngredientsManager();

    return (
        <IngredientsUI
            ingredients={ingredients}
            onAdd={addIngredient}
            onEdit={(id, data) => editIngredient({ id, data })}
            onDelete={removeIngredient}
        />
    );
};
