import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@heroui/react/toast";
import { useCreateMealMutation, useMealsQuery } from "../../../../gql/generated";
import { MealForm } from "./components/meal-form/meal-form";

export const MealsNewView = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: createMeal } = useCreateMealMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: useMealsQuery.getKey() });
            toast.success("Sauvegardé");
        },
        onError: () => toast.danger("Erreur"),
    });

    return (
        <MealForm
            onSubmit={(value) => {
                createMeal({
                    input: {
                        id: crypto.randomUUID(),
                        date: value.date,
                        name: value.name,
                        ingredients: value.ingredients.map(
                            ({ id, ingredientId, name, quantity }) => ({
                                id,
                                ingredientId,
                                name,
                                quantity,
                            }),
                        ),
                    },
                });
                void navigate({ to: "/meals" });
            }}
        />
    );
};
