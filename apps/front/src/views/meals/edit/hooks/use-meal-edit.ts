import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@heroui/react/toast";
import type { UpdateMeal } from "@fc/shared";
import { getMeal, updateMeal } from "../../../../services/meal-history";

export const useMealEdit = (id: string) => {
    const queryClient = useQueryClient();

    const { data: meal, isLoading } = useQuery({
        queryKey: ["meals", id],
        queryFn: () => getMeal(id),
    });

    const { mutate: saveMeal } = useMutation({
        mutationFn: (updates: UpdateMeal) => updateMeal(id, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["meals"] });
            toast.success("Sauvegardé");
        },
        onError: () => toast.danger("Erreur"),
    });

    return { meal, isLoading, saveMeal };
};
