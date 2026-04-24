import { useNavigate } from "@tanstack/react-router";
import type { SavedMeal } from "@fc/shared";
import { useMealHistory } from "../../../hooks/use-meal-history";
import { groupMealsByDate } from "./utils/group-meals-by-date";
import { MealsListUI } from "./meals-list.ui";

type MealsListViewProps = { meals: SavedMeal[] };

export const MealsListView = ({ meals }: MealsListViewProps) => {
    const { deleteMeal } = useMealHistory();
    const navigate = useNavigate();
    const groups = groupMealsByDate(meals);

    const handleEdit = (id: string) => void navigate({ to: "/meals/$id", params: { id } });

    return <MealsListUI groups={groups} onDelete={deleteMeal} onEdit={handleEdit} />;
};
