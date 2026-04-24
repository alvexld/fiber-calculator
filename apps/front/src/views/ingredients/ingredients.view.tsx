import { useIngredientsManager } from "./hooks/use-ingredients-manager";
import { IngredientsUI } from "./ingredients.ui";

export const IngredientsView = () => {
    const { ingredients, addIngredient, editIngredient, removeIngredient } =
        useIngredientsManager();

    return (
        <IngredientsUI
            ingredients={ingredients}
            onAdd={addIngredient}
            onEdit={(id, data) => editIngredient({ id, data })}
            onDelete={removeIngredient}
        />
    );
};
