import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@heroui/react/toast";
import { useMealsQuery, useDeleteMealMutation } from "../../../../gql/generated";
import { groupMealsByDate } from "./utils/group-meals-by-date";
import { MealsListUI } from "./meals-list.ui";

export const MealsListView = () => {
    const queryClient = useQueryClient();
    const invalidate = () => queryClient.invalidateQueries({ queryKey: useMealsQuery.getKey() });

    const { data } = useMealsQuery();
    const meals = data?.meals ?? [];

    const { mutate: deleteMealMutate } = useDeleteMealMutation({
        onSuccess: () => {
            invalidate();
            toast.success("Supprimé");
        },
        onError: () => toast.danger("Erreur"),
    });

    const navigate = useNavigate();
    const groups = groupMealsByDate(meals);

    const handleEdit = (id: string) => void navigate({ to: "/meals/$id", params: { id } });
    const handleDelete = (id: string) => deleteMealMutate({ input: { id } });

    return <MealsListUI groups={groups} onDelete={handleDelete} onEdit={handleEdit} />;
};
