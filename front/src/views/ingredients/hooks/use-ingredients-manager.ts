import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
        onSuccess: invalidate,
    });

    const { mutate: editIngredient } = useMutation({
        mutationFn: ({ id, data }: { id: string; data: CreateIngredient }) =>
            updateIngredient(id, data),
        onSuccess: invalidate,
    });

    const { mutate: removeIngredient } = useMutation({
        mutationFn: deleteIngredient,
        onSuccess: invalidate,
    });

    return { ingredients, isLoading, addIngredient, editIngredient, removeIngredient };
};
