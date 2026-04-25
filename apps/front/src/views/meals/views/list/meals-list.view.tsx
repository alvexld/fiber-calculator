import { useNavigate } from "@tanstack/react-router";
import { useMealsQuery } from "../../../../gql/generated";
import { useMeals } from "../../../../hooks/use-meals";
import { groupMealsByDate } from "./utils/group-meals-by-date";
import { MealsListUI } from "./meals-list.ui";

export const MealsListView = () => {
    const { data } = useMealsQuery();
    const meals = data?.meals ?? [];
    const { deleteMeal } = useMeals();
    const navigate = useNavigate();
    const groups = groupMealsByDate(meals);

    const handleEdit = (id: string) => void navigate({ to: "/meals/$id", params: { id } });

    return <MealsListUI groups={groups} onDelete={deleteMeal} onEdit={handleEdit} />;
};
