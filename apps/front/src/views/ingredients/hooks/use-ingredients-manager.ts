import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@heroui/react/toast";
import type { CreateIngredient } from "@fc/shared";
import {
    createIngredient,
    deleteIngredient,
    getIngredients,
    updateIngredient,
} from "../../../services/ingredients";

export const useIngredientsManager = () => {
    const queryClient = useQueryClient();
    const invalidate = () => queryClient.invalidateQueries({ queryKey: ["ingredients"] });

    const { data: ingredients = [], isLoading } = useQuery({
        queryKey: ["ingredients"],
        queryFn: () => getIngredients(),
    });

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

    return { ingredients, isLoading, addIngredient, editIngredient, removeIngredient };
};
