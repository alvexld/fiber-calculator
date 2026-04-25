import { useNavigate } from "@tanstack/react-router";
import type { MenuIngredient } from "../../../../types/meal";
import { useMeals } from "../../../../hooks/use-meals";
import { MealsNewUI } from "./meals-new.ui";

type MealFormValues = {
    date: string;
    time: string;
    name: string;
    ingredients: MenuIngredient[];
};

export type { MealFormValues };

export const MealsNewView = () => {
    const { saveMeal } = useMeals();
    const navigate = useNavigate();

    const handleSubmit = (value: MealFormValues) => {
        saveMeal({
            date: value.date,
            time: value.time,
            name: value.name,
            ingredients: value.ingredients.map(({ id, ingredientId, name, quantity }) => ({
                id,
                ingredientId,
                name,
                quantity,
            })),
        });
        void navigate({ to: "/meals" });
    };

    return <MealsNewUI onSubmit={handleSubmit} />;
};
