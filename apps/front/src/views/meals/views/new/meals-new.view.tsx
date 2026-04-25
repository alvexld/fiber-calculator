import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@heroui/react/toast";
import { useCreateMealMutation, useMealsQuery } from "../../../../gql/generated";
import type { MenuIngredient } from "../../../../types/meal";
import { MealsNewUI } from "./meals-new.ui";

type MealFormValues = {
    date: string;
    time: string;
    name: string;
    ingredients: MenuIngredient[];
};

export type { MealFormValues };

export const MealsNewView = () => {
    const queryClient = useQueryClient();
    const invalidate = () => queryClient.invalidateQueries({ queryKey: useMealsQuery.getKey() });

    const { mutate: createMeal } = useCreateMealMutation({
        onSuccess: () => {
            invalidate();
            toast.success("Sauvegardé");
        },
        onError: () => toast.danger("Erreur"),
    });

    const navigate = useNavigate();

    const handleSubmit = (value: MealFormValues) => {
        createMeal({
            input: {
                id: crypto.randomUUID(),
                date: value.date,
                name: value.name,
                ingredients: value.ingredients.map(({ id, ingredientId, name, quantity }) => ({
                    id,
                    ingredientId,
                    name,
                    quantity,
                })),
            },
        });
        void navigate({ to: "/meals" });
    };

    return <MealsNewUI onSubmit={handleSubmit} />;
};
