import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { toast } from "@heroui/react/toast";
import type { CreateBristol } from "@fc/shared";
import { addBristol, removeBristol } from "../services/bristol";

export const useBristol = () => {
    const router = useRouter();
    const invalidate = () => router.invalidate();

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

    return { createBristol, deleteBristol };
};
