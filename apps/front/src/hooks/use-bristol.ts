import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@heroui/react/toast";
import type { CreateBristol } from "@fc/shared";
import { getBristols, addBristol, removeBristol } from "../services/bristol";

const BRISTOL_KEY = ["bristol"] as const;

export const useBristol = () => {
    const queryClient = useQueryClient();

    const { data: bristols = [] } = useQuery({
        queryKey: BRISTOL_KEY,
        queryFn: getBristols,
    });

    const invalidate = () => queryClient.invalidateQueries({ queryKey: BRISTOL_KEY });

    const { mutate: createBristol } = useMutation({
        mutationFn: (data: CreateBristol) => addBristol(data),
        onSuccess: () => {
            invalidate();
            toast.success("Bristol enregistré");
        },
        onError: () => toast.danger("Erreur"),
    });

    const { mutate: deleteBristol } = useMutation({
        mutationFn: removeBristol,
        onSuccess: () => {
            invalidate();
            toast.success("Supprimé");
        },
        onError: () => toast.danger("Erreur"),
    });

    return { bristols, createBristol, deleteBristol };
};
