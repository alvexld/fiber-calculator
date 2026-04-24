import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMenu } from "../hooks/use-menu";
import { useMealHistory } from "../../../hooks/use-meal-history";
import { computeTotalFiber } from "../utils/compute-total-fiber";
import { MealsEditUI } from "./meals-edit.ui";

type MealsEditViewProps = {
    mealId: string;
};

export const MealsEditView = ({ mealId }: MealsEditViewProps) => {
    const { meals, editMeal } = useMealHistory();
    const meal = meals.find((m) => m.id === mealId);
    const navigate = useNavigate();
    const {
        ingredients,
        addIngredient,
        removeIngredient,
        updateIngredient,
        loadIngredients,
        resetMenu,
    } = useMenu();
    const totalFiberGrams = computeTotalFiber(ingredients);

    useEffect(() => {
        if (meal) loadIngredients(meal.ingredients);
    }, [mealId]);

    const handleSave = (name: string) => {
        if (!meal) return;
        editMeal(meal.id, { name, ingredients, totalFiberGrams });
        resetMenu();
        void navigate({ to: "/meals" });
    };

    const handleCancel = () => {
        resetMenu();
        void navigate({ to: "/meals" });
    };

    if (!meal)
        return (
            <div className="mx-auto max-w-2xl px-6 py-8">
                <p className="text-gray-500">Repas introuvable.</p>
            </div>
        );

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
