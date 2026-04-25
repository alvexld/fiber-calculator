import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@heroui/react/toast";
import {
    useCreateIngredientMutation,
    useUpdateIngredientMutation,
    useDeleteIngredientMutation,
    useIngredientsQuery,
    type CreateIngredientInput,
} from "../../../gql/generated";

export const useIngredientsManager = () => {
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

    const { mutate: updateIngredient } = useUpdateIngredientMutation({
        onSuccess: () => {
            invalidate();
            toast.success("Sauvegardé");
        },
        onError: () => toast.danger("Erreur"),
    });

    const { mutate: deleteIngredient } = useDeleteIngredientMutation({
        onSuccess: () => {
            invalidate();
            toast.success("Sauvegardé");
        },
        onError: () => toast.danger("Erreur"),
    });

    return {
        addIngredient: (input: CreateIngredientInput) => createIngredient({ input }),
        editIngredient: ({ id, data }: { id: string; data: CreateIngredientInput }) =>
            updateIngredient({ input: { id, ...data } }),
        removeIngredient: (id: string) => deleteIngredient({ input: { id } }),
    };
};
