import { groupBy, sumBy } from "es-toolkit";
import type { SavedMeal } from "../../../types/meal";

export type DailyFiberPoint = {
    date: string; // "YYYY-MM-DD" for sorting
    label: string; // formatted for display
    fibers: number;
    mealsCount: number;
};

export const buildChartData = (meals: SavedMeal[]): DailyFiberPoint[] =>
    Object.entries(groupBy(meals, (m) => m.date))
        .map(([date, dayMeals]) => ({
            date,
            label: new Date(`${date}T12:00:00`).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "short",
            }),
            fibers: Math.round(sumBy(dayMeals, (m) => m.totalFiberGrams) * 10) / 10,
            mealsCount: dayMeals.length,
        }))
        .sort((a, b) => a.date.localeCompare(b.date));
