import type { Ingredient } from "@fc/shared";
import { useIngredientsManager } from "./hooks/use-ingredients-manager";
import { IngredientsUI } from "./ingredients.ui";

type IngredientsViewProps = {
    ingredients: Ingredient[];
    query: string;
    page: number;
    onQueryChange: (q: string) => void;
    onPageChange: (p: number) => void;
};

export const IngredientsView = ({
    ingredients,
    query,
    page,
    onQueryChange,
    onPageChange,
}: IngredientsViewProps) => {
    const { addIngredient, editIngredient, removeIngredient } = useIngredientsManager();

    return (
        <IngredientsUI
            ingredients={ingredients}
            query={query}
            page={page}
            onAdd={addIngredient}
            onEdit={(id, data) => editIngredient({ id, data })}
            onDelete={removeIngredient}
            onQueryChange={onQueryChange}
            onPageChange={onPageChange}
        />
    );
};
