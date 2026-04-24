import { LayoutDashboard, Utensils, Salad, Trash2, Activity } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@heroui/react/button";
import { ScrollShadow } from "@heroui/react/scroll-shadow";
import type { DayGroup } from "../../../history/utils/group-meals-by-date";
import type { SavedMeal } from "../../../../types/meal";

type HistorySidebarProps = {
    groups: DayGroup[];
    selectedMealId: string | null;
    onSelect: (meal: SavedMeal) => void;
    onDelete: (id: string) => void;
};

const NAV_BASE = "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors";
const NAV_INACTIVE = `${NAV_BASE} text-slate-500 hover:bg-blue-50 hover:text-blue-800`;
const NAV_ACTIVE = `${NAV_BASE} bg-blue-800 text-white font-semibold shadow-sm`;

const formatDate = (dateStr: string): string =>
    new Date(`${dateStr}T12:00:00`).toLocaleDateString("fr-FR", {
        weekday: "short",
        day: "numeric",
        month: "short",
    });

export const HistorySidebar = ({
    groups,
    selectedMealId,
    onSelect,
    onDelete,
}: HistorySidebarProps) => (
    <aside className="flex h-full w-64 shrink-0 flex-col bg-white border-r border-slate-200">
        <div className="flex flex-col gap-0.5 border-b border-slate-100 px-3 py-3">
            <Link to="/dashboard" className={NAV_INACTIVE} activeProps={{ className: NAV_ACTIVE }}>
                <LayoutDashboard className="h-4 w-4 shrink-0" />
                Tableau de bord
            </Link>

            <p className="mt-2 px-3 pb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Saisie
            </p>
            <Link
                to="/"
                activeOptions={{ exact: true }}
                className={NAV_INACTIVE}
                activeProps={{ className: NAV_ACTIVE }}
            >
                <Utensils className="h-4 w-4 shrink-0" />
                Repas
            </Link>
            <Link to="/bristol" className={NAV_INACTIVE} activeProps={{ className: NAV_ACTIVE }}>
                <Activity className="h-4 w-4 shrink-0" />
                Bristol
            </Link>

            <p className="mt-2 px-3 pb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                Admin
            </p>
            <Link
                to="/ingredients"
                className={NAV_INACTIVE}
                activeProps={{ className: NAV_ACTIVE }}
            >
                <Salad className="h-4 w-4 shrink-0" />
                Ingrédients
            </Link>
        </div>

        <div className="border-b border-slate-100 px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Historique
            </p>
        </div>

        <ScrollShadow className="flex-1 overflow-y-auto">
            {groups.length === 0 ? (
                <p className="px-4 py-6 text-center text-xs text-slate-400">
                    Aucun repas sauvegardé.
                </p>
            ) : (
                <div className="flex flex-col py-2">
                    {groups.map((group) => (
                        <div key={group.date}>
                            <div className="flex items-baseline justify-between px-4 py-2">
                                <span className="text-xs font-semibold capitalize text-slate-400">
                                    {formatDate(group.date)}
                                </span>
                                <span className="text-xs text-slate-500">
                                    {group.dailyFiberGrams.toFixed(0)}g
                                </span>
                            </div>
                            {group.meals.map((meal) => (
                                <div
                                    key={meal.id}
                                    className={`group flex cursor-pointer items-center justify-between px-4 py-2 transition-colors hover:bg-slate-50 ${selectedMealId === meal.id ? "bg-slate-100 font-medium" : ""}`}
                                    onClick={() => onSelect(meal)}
                                >
                                    <div className="flex min-w-0 flex-col">
                                        <span className="truncate text-sm text-slate-700">
                                            {meal.name}
                                        </span>
                                        <span className="text-xs text-slate-400">
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
                                        <Trash2 className="h-3 w-3 text-slate-400 hover:text-red-500" />
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
