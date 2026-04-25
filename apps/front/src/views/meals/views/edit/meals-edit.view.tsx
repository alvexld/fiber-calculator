import { useNavigate } from "@tanstack/react-router";
import type { SavedMeal } from "@fc/shared";
import { useMenu } from "../../hooks/use-menu";
import { useMealEdit } from "./hooks/use-meal-edit";
import { computeTotalFiber } from "../../utils/compute-total-fiber";
import { MealsEditUI } from "./meals-edit.ui";

type MealsEditViewProps = {
    meal: SavedMeal;
};

export const MealsEditView = ({ meal }: MealsEditViewProps) => {
    const { saveMeal } = useMealEdit(meal.id);
    const navigate = useNavigate();
    const { ingredients, addIngredient, removeIngredient, updateIngredient, resetMenu } = useMenu(
        meal.ingredients,
    );
    const totalFiberGrams = computeTotalFiber(ingredients);

    const handleSave = (name: string) => {
        saveMeal({ name, ingredients, totalFiberGrams });
        resetMenu();
        void navigate({ to: "/meals" });
    };

    const handleCancel = () => {
        resetMenu();
        void navigate({ to: "/meals" });
    };

    return (
        <MealsEditUI
            mealName={meal.name}
            ingredients={ingredients}
            totalFiberGrams={totalFiberGrams}
            onAdd={addIngredient}
            onRemove={removeIngredient}
            onUpdate={updateIngredient}
            onSave={handleSave}
            onCancel={handleCancel}
        />
    );
};
