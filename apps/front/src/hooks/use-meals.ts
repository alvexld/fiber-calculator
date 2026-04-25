import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@heroui/react/toast";
import {
    useCreateMealMutation,
    useUpdateMealMutation,
    useDeleteMealMutation,
    useMealsQuery,
    type CreateMealInput,
    type UpdateMealInput,
} from "../gql/generated";

type SaveMealParams = Omit<CreateMealInput, "id">;
type EditMealParams = Omit<UpdateMealInput, "id">;

export const useMeals = () => {
    const queryClient = useQueryClient();
    const invalidate = () => queryClient.invalidateQueries({ queryKey: useMealsQuery.getKey() });

    const { mutate: createMealMutate } = useCreateMealMutation({
        onSuccess: () => {
            invalidate();
            toast.success("Sauvegardé");
        },
        onError: () => toast.danger("Erreur"),
    });

    const { mutate: updateMealMutate } = useUpdateMealMutation({
        onSuccess: () => {
            invalidate();
            toast.success("Sauvegardé");
        },
        onError: () => toast.danger("Erreur"),
    });

    const { mutate: deleteMealMutate } = useDeleteMealMutation({
        onSuccess: () => {
            invalidate();
            toast.success("Supprimé");
        },
        onError: () => toast.danger("Erreur"),
    });

    return {
        saveMeal: (params: SaveMealParams) =>
            createMealMutate({ input: { id: crypto.randomUUID(), ...params } }),
        editMeal: (id: string, updates: EditMealParams) =>
            updateMealMutate({ input: { id, ...updates } }),
        deleteMeal: (id: string) => deleteMealMutate({ input: { id } }),
    };
};
