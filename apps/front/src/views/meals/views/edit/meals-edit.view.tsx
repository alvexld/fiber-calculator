import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@heroui/react/toast";
import type { MenuIngredient } from "@fc/shared";
import {
    useMealQuery,
    useMealsQuery,
    useUpdateMealMutation,
    type MealQuery,
} from "../../../../gql/generated";
import { useMenu } from "../../hooks/use-menu";
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
    const queryClient = useQueryClient();
    const invalidate = () => {
        queryClient.invalidateQueries({ queryKey: useMealsQuery.getKey() });
        queryClient.invalidateQueries({ queryKey: useMealQuery.getKey({ id }) });
    };

    const { mutate: updateMeal } = useUpdateMealMutation({
        onSuccess: () => {
            invalidate();
            toast.success("Sauvegardé");
        },
        onError: () => toast.danger("Erreur"),
    });

    const navigate = useNavigate();
    const { ingredients, addIngredient, removeIngredient, updateIngredient, resetMenu } = useMenu(
        meal.ingredients as MenuIngredient[],
    );
    const totalFiberGrams = computeTotalFiber(ingredients);

    const handleSave = (name: string) => {
        updateMeal({
            input: {
                id,
                name,
                ingredients: ingredients.map(
                    ({ id: ingId, ingredientId, name: ingName, quantity }) => ({
                        id: ingId,
                        ingredientId,
                        name: ingName,
                        quantity,
                    }),
                ),
            },
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
