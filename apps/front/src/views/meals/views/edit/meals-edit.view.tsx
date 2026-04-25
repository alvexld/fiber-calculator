import { useNavigate } from "@tanstack/react-router";
import type { MenuIngredient } from "@fc/shared";
import { useMealQuery, type MealQuery } from "../../../../gql/generated";
import { useMenu } from "../../hooks/use-menu";
import { useMealEdit } from "./hooks/use-meal-edit";
import { computeTotalFiber } from "../../utils/compute-total-fiber";
import { MealsEditUI } from "./meals-edit.ui";

type MealsEditViewProps = { id: string };

export const MealsEditView = ({ id }: MealsEditViewProps) => {
    const { data } = useMealQuery({ id });
    const meal = data?.meal;

    if (!meal) return null;

    return <MealsEditLoaded meal={meal} id={id} />;
};

type MealData = NonNullable<MealQuery["meal"]>;

const MealsEditLoaded = ({ meal, id }: { meal: MealData; id: string }) => {
    const { saveMeal } = useMealEdit(id);
    const navigate = useNavigate();
    const { ingredients, addIngredient, removeIngredient, updateIngredient, resetMenu } = useMenu(
        meal.ingredients as MenuIngredient[],
    );
    const totalFiberGrams = computeTotalFiber(ingredients);

    const handleSave = (name: string) => {
        saveMeal({
            name,
            ingredients: ingredients.map(({ id, ingredientId, name: ingName, quantity }) => ({
                id,
                ingredientId,
                name: ingName,
                quantity,
            })),
        });
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
