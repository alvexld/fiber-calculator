import { useIngredientsManager } from "./hooks/use-ingredients-manager";
import { IngredientsUI } from "./ingredients.ui";

export const IngredientsView = () => {
    const { addIngredient } = useIngredientsManager();
    return <IngredientsUI onAdd={addIngredient} />;
};
