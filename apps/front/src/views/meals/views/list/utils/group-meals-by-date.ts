import { groupBy, sumBy } from "es-toolkit";
import type { SavedMeal } from "../../../../../types/meal";

export type DayGroup = {
    date: string;
    meals: SavedMeal[];
    dailyFiberGrams: number;
};

export const groupMealsByDate = (meals: SavedMeal[]): DayGroup[] =>
    Object.entries(groupBy(meals, (m) => m.date))
        .map(([date, dayMeals]) => ({
            date,
            meals: dayMeals,
            dailyFiberGrams: sumBy(dayMeals, (m) => m.totalFiberGrams),
        }))
        .sort((a, b) => b.date.localeCompare(a.date));
