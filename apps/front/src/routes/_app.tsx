import { useState } from "react";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { ScrollShadow } from "@heroui/react/scroll-shadow";
import { useMealHistory } from "../hooks/use-meal-history";
import { groupMealsByDate } from "../views/history/utils/group-meals-by-date";
import { HistorySidebar } from "../views/home/components/history-sidebar/history-sidebar";
import { SelectedMealContext } from "../views/home/context/selected-meal-context";
import type { SavedMeal } from "../types/meal";

export const Route = createFileRoute("/_app")({
    component: AppLayout,
});

function AppLayout() {
    const navigate = useNavigate();
    const { meals, deleteMeal } = useMealHistory();
    const [selectedMeal, setSelectedMeal] = useState<SavedMeal | null>(null);
    const groups = groupMealsByDate(meals);

    const handleSelectMeal = (meal: SavedMeal) => {
        setSelectedMeal(meal);
        navigate({ to: "/" });
    };

    const handleDeleteMeal = (id: string) => {
        deleteMeal(id);
        if (selectedMeal?.id === id) setSelectedMeal(null);
    };

    return (
        <SelectedMealContext.Provider
            value={{
                selectedMeal,
                selectMeal: setSelectedMeal,
                clearSelectedMeal: () => setSelectedMeal(null),
            }}
        >
            <div className="flex h-[calc(100vh-57px)]">
                <HistorySidebar
                    groups={groups}
                    selectedMealId={selectedMeal?.id ?? null}
                    onSelect={handleSelectMeal}
                    onDelete={handleDeleteMeal}
                />
                <ScrollShadow className="flex-1 overflow-y-auto">
                    <Outlet />
                </ScrollShadow>
            </div>
        </SelectedMealContext.Provider>
    );
}
