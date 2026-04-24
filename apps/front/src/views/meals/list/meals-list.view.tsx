import { useNavigate } from "@tanstack/react-router";
import { useMealHistory } from "../../../hooks/use-meal-history";
import { groupMealsByDate } from "./utils/group-meals-by-date";
import { MealsListUI } from "./meals-list.ui";

export const MealsListView = () => {
    const { meals, deleteMeal } = useMealHistory();
    const navigate = useNavigate();
    const groups = groupMealsByDate(meals);

    const handleEdit = (id: string) => void navigate({ to: "/meals/$id", params: { id } });

    return <MealsListUI groups={groups} onDelete={deleteMeal} onEdit={handleEdit} />;
};
