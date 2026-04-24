import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { toast } from "@heroui/react/toast";
import type { CreateIngredient } from "@fc/shared";
import {
    createIngredient,
    deleteIngredient,
    updateIngredient,
} from "../../../services/ingredients";

export const useIngredientsManager = () => {
    const router = useRouter();
    const invalidate = () => router.invalidate();

    const { mutate: addIngredient } = useMutation({
        mutationFn: createIngredient,
        onSuccess: () => {
            invalidate();
            toast.success("Sauvegardé");
        },
        onError: () => toast.danger("Erreur"),
    });

    const { mutate: editIngredient } = useMutation({
        mutationFn: ({ id, data }: { id: string; data: CreateIngredient }) =>
            updateIngredient(id, data),
        onSuccess: () => {
            invalidate();
            toast.success("Sauvegardé");
        },
        onError: () => toast.danger("Erreur"),
    });

    const { mutate: removeIngredient } = useMutation({
        mutationFn: deleteIngredient,
        onSuccess: () => {
            invalidate();
            toast.success("Sauvegardé");
        },
        onError: () => toast.danger("Erreur"),
    });

    return { addIngredient, editIngredient, removeIngredient };
};
