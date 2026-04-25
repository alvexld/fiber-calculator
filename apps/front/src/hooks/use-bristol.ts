import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@heroui/react/toast";
import {
    useCreateBristolMutation,
    useDeleteBristolMutation,
    useBristolsQuery,
    type CreateBristolInput,
} from "../gql/generated";

export const useBristol = () => {
    const queryClient = useQueryClient();
    const invalidate = () => queryClient.invalidateQueries({ queryKey: useBristolsQuery.getKey() });

    const { mutate: createBristolMutate } = useCreateBristolMutation({
        onSuccess: () => {
            invalidate();
            toast.success("Bristol enregistré");
        },
        onError: () => toast.danger("Erreur"),
    });

    const { mutate: deleteBristolMutate } = useDeleteBristolMutation({
        onSuccess: () => {
            invalidate();
            toast.success("Supprimé");
        },
        onError: () => toast.danger("Erreur"),
    });

    return {
        createBristol: (input: CreateBristolInput, options?: { onSuccess?: () => void }) =>
            createBristolMutate({ input }, options),
        deleteBristol: (id: string) => deleteBristolMutate({ input: { id } }),
    };
};
