import { LayoutDashboard, Trash2 } from "lucide-react";
import { Button } from "@heroui/react/button";
import { ScrollShadow } from "@heroui/react/scroll-shadow";
import type { DayGroup } from "../../../history/utils/group-meals-by-date";
import type { SavedMeal } from "../../../../types/meal";

type ActiveView = "calculator" | "dashboard";

type HistorySidebarProps = {
    groups: DayGroup[];
    selectedMealId: string | null;
    activeView: ActiveView;
    onViewChange: (view: ActiveView) => void;
    onSelect: (meal: SavedMeal) => void;
    onDelete: (id: string) => void;
};

const formatDate = (dateStr: string): string =>
    new Date(`${dateStr}T12:00:00`).toLocaleDateString("fr-FR", {
        weekday: "short",
        day: "numeric",
        month: "short",
    });

export const HistorySidebar = ({
    groups,
    selectedMealId,
    activeView,
    onViewChange,
    onSelect,
    onDelete,
}: HistorySidebarProps) => (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r">
        <div className="border-b px-3 py-3">
            <button
                onClick={() => onViewChange("dashboard")}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-gray-100 ${activeView === "dashboard" ? "bg-gray-100 font-semibold" : "text-gray-600"}`}
            >
                <LayoutDashboard className="h-4 w-4 shrink-0" />
                Tableau de bord
            </button>
        </div>

        <div className="border-b px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Historique
            </p>
        </div>

        <ScrollShadow className="flex-1 overflow-y-auto">
            {groups.length === 0 ? (
                <p className="px-4 py-6 text-center text-xs text-gray-400">
                    Aucun repas sauvegardé.
                </p>
            ) : (
                <div className="flex flex-col py-2">
                    {groups.map((group) => (
                        <div key={group.date}>
                            <div className="flex items-baseline justify-between px-4 py-2">
                                <span className="text-xs font-semibold capitalize text-gray-500">
                                    {formatDate(group.date)}
                                </span>
                                <span className="text-xs text-gray-400">
                                    {group.dailyFiberGrams.toFixed(0)}g
                                </span>
                            </div>
                            {group.meals.map((meal) => (
                                <div
                                    key={meal.id}
                                    className={`group flex cursor-pointer items-center justify-between px-4 py-2 transition-colors hover:bg-gray-50 ${activeView === "calculator" && selectedMealId === meal.id ? "bg-gray-100 font-medium" : ""}`}
                                    onClick={() => {
                                        onViewChange("calculator");
                                        onSelect(meal);
                                    }}
                                >
                                    <div className="flex min-w-0 flex-col">
                                        <span className="truncate text-sm">{meal.name}</span>
                                        <span className="text-xs text-gray-400">
                                            {meal.totalFiberGrams.toFixed(1)}g fibres
                                        </span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        aria-label="Supprimer"
                                        onPress={(e) => {
                                            e.continuePropagation();
                                            onDelete(meal.id);
                                        }}
                                        className="ml-1 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                                    >
                                        <Trash2 className="h-3 w-3 text-gray-400 hover:text-red-500" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </ScrollShadow>
    </aside>
);
