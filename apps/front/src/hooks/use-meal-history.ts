import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@heroui/react/toast";
import type { SavedMeal, UpdateMeal } from "@fc/shared";
import { getMeals, addMeal, removeMeal, updateMeal } from "../services/meal-history";

const MEALS_KEY = ["meals"] as const;

type SaveMealParams = Omit<SavedMeal, "id">;

export const useMealHistory = () => {
    const queryClient = useQueryClient();

    const { data: meals = [] } = useQuery({
        queryKey: MEALS_KEY,
        queryFn: getMeals,
    });

    const invalidate = () => queryClient.invalidateQueries({ queryKey: MEALS_KEY });

    const { mutate: saveMeal } = useMutation({
        mutationFn: (params: SaveMealParams) => addMeal({ id: crypto.randomUUID(), ...params }),
        onSuccess: () => { invalidate(); toast.success("Sauvegardé"); },
        onError: () => toast.danger("Erreur"),
    });

    const { mutate: editMeal } = useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: UpdateMeal }) =>
            updateMeal(id, updates),
        onSuccess: () => { invalidate(); toast.success("Sauvegardé"); },
        onError: () => toast.danger("Erreur"),
    });

    const { mutate: deleteMeal } = useMutation({
        mutationFn: removeMeal,
        onSuccess: () => { invalidate(); toast.success("Sauvegardé"); },
        onError: () => toast.danger("Erreur"),
    });

    return {
        meals,
        saveMeal: (params: SaveMealParams) => saveMeal(params),
        editMeal: (id: string, updates: UpdateMeal) => editMeal({ id, updates }),
        deleteMeal,
    };
};
