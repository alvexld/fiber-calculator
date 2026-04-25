import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@heroui/react/toast";
import {
    useUpdateMealMutation,
    useMealsQuery,
    useMealQuery,
    type UpdateMealInput,
} from "../../../../../gql/generated";

type EditMealParams = Omit<UpdateMealInput, "id">;

export const useMealEdit = (id: string) => {
    const queryClient = useQueryClient();

    const { mutate: saveMeal } = useUpdateMealMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: useMealsQuery.getKey() });
            queryClient.invalidateQueries({ queryKey: useMealQuery.getKey({ id }) });
            toast.success("Sauvegardé");
        },
        onError: () => toast.danger("Erreur"),
    });

    return {
        saveMeal: (updates: EditMealParams) => saveMeal({ input: { id, ...updates } }),
    };
};
