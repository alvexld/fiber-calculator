import { useNavigate } from "@tanstack/react-router";
import { useMenu } from "../hooks/use-menu";
import { useMeals } from "../../../hooks/use-meals";
import { computeTotalFiber } from "../utils/compute-total-fiber";
import { MealsNewUI } from "./meals-new.ui";

export const MealsNewView = () => {
    const { ingredients, addIngredient, removeIngredient, updateIngredient, resetMenu } = useMenu();
    const { saveMeal } = useMeals();
    const navigate = useNavigate();
    const totalFiberGrams = computeTotalFiber(ingredients);

    const handleSave = (name: string) => {
        saveMeal({
            date: new Date().toISOString().slice(0, 10),
            name,
            ingredients,
            totalFiberGrams,
        });
        resetMenu();
        void navigate({ to: "/meals" });
    };

    return (
        <MealsNewUI
            ingredients={ingredients}
            totalFiberGrams={totalFiberGrams}
            onAdd={addIngredient}
            onRemove={removeIngredient}
            onUpdate={updateIngredient}
            onSave={handleSave}
        />
    );
};
