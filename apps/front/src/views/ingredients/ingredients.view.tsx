import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@heroui/react/toast";
import { useCreateIngredientMutation, useIngredientsQuery } from "../../gql/generated";
import { IngredientsUI } from "./ingredients.ui";

export const IngredientsView = () => {
    const queryClient = useQueryClient();
    const invalidate = () =>
        queryClient.invalidateQueries({ queryKey: useIngredientsQuery.getKey() });

    const { mutate: createIngredient } = useCreateIngredientMutation({
        onSuccess: () => {
            invalidate();
            toast.success("Sauvegardé");
        },
        onError: () => toast.danger("Erreur"),
    });

    return <IngredientsUI onAdd={(input) => createIngredient({ input })} />;
};
