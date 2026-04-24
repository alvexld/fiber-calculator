import { useEffect } from "react";
import { useMenu } from "../menu-calculator/hooks/use-menu";
import { useMealHistory } from "../../hooks/use-meal-history";
import { computeTotalFiber } from "../menu-calculator/utils/compute-total-fiber";
import { useSelectedMeal } from "./context/selected-meal-context";
import { HomeUI } from "./home.ui";

export const HomeView = () => {
    const {
        ingredients,
        addIngredient,
        removeIngredient,
        updateIngredient,
        loadIngredients,
        resetMenu,
    } = useMenu();
    const { saveMeal, editMeal } = useMealHistory();
    const { selectedMeal, clearSelectedMeal } = useSelectedMeal();

    const totalFiberGrams = computeTotalFiber(ingredients);

    useEffect(() => {
        if (selectedMeal) loadIngredients(selectedMeal.ingredients);
    }, [selectedMeal]);

    const handleSave = (name: string) => {
        if (selectedMeal) {
            editMeal(selectedMeal.id, { name, ingredients, totalFiberGrams });
        } else {
            saveMeal({
                date: new Date().toISOString().slice(0, 10),
                name,
                ingredients,
                totalFiberGrams,
            });
        }
        resetMenu();
        clearSelectedMeal();
    };

    const handleNewMenu = () => {
        resetMenu();
        clearSelectedMeal();
    };

    return (
        <HomeUI
            ingredients={ingredients}
            totalFiberGrams={totalFiberGrams}
            isEditing={selectedMeal !== null}
            editingMealName={selectedMeal?.name}
            onAdd={addIngredient}
            onRemove={removeIngredient}
            onUpdate={updateIngredient}
            onSave={handleSave}
            onNewMenu={handleNewMenu}
        />
    );
};
