import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { toast } from "@heroui/react/toast";
import type { CreateMeal, UpdateMeal } from "@fc/shared";
import { addMeal, removeMeal, updateMeal } from "../services/meals";

type SaveMealParams = Omit<CreateMeal, "id">;

export const useMeals = () => {
    const router = useRouter();
    const invalidate = () => router.invalidate();

    const { mutate: saveMeal } = useMutation({
        mutationFn: (params: SaveMealParams) => addMeal({ id: crypto.randomUUID(), ...params }),
        onSuccess: () => {
            invalidate();
            toast.success("Sauvegardé");
        },
        onError: () => toast.danger("Erreur"),
    });

    const { mutate: editMeal } = useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: UpdateMeal }) =>
            updateMeal(id, updates),
        onSuccess: () => {
            invalidate();
            toast.success("Sauvegardé");
        },
        onError: () => toast.danger("Erreur"),
    });

    const { mutate: deleteMeal } = useMutation({
        mutationFn: removeMeal,
        onSuccess: () => {
            invalidate();
            toast.success("Sauvegardé");
        },
        onError: () => toast.danger("Erreur"),
    });

    return {
        saveMeal: (params: SaveMealParams) => saveMeal(params),
        editMeal: (id: string, updates: UpdateMeal) => editMeal({ id, updates }),
        deleteMeal,
    };
};
