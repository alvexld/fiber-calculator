import { useMutation } from "@tanstack/react-query";
import { toast } from "@heroui/react/toast";
import type { UpdateMeal } from "@fc/shared";
import { updateMeal } from "../../../../../services/meals";

export const useMealEdit = (id: string) => {
    const { mutate: saveMeal } = useMutation({
        mutationFn: (updates: UpdateMeal) => updateMeal(id, updates),
        onSuccess: () => toast.success("Sauvegardé"),
        onError: () => toast.danger("Erreur"),
    });

    return { saveMeal };
};
