import { useMealHistory } from "../../hooks/use-meal-history";
import { groupMealsByDate } from "./utils/group-meals-by-date";
import { HistoryUI } from "./history.ui";

export const HistoryView = () => {
    const { meals, deleteMeal } = useMealHistory();
    const groups = groupMealsByDate(meals);

    return <HistoryUI groups={groups} onDelete={deleteMeal} />;
};
