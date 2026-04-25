import { groupBy, sumBy } from "es-toolkit";
import type { ActivityCalendarCell } from "../../../components/activity-calendar/activity-calendar";
import type { SavedMeal } from "../../../types/meal";

const DAILY_GOAL = 25;

const toDateStr = (date: Date): string => date.toISOString().slice(0, 10);

const fiberLevel = (fibers: number): 1 | 2 | 3 | 4 => {
    const pct = fibers / DAILY_GOAL;
    if (pct >= 1) return 4;
    if (pct >= 0.75) return 3;
    if (pct >= 0.5) return 2;
    return 1;
};

export const buildCalendarData = (meals: SavedMeal[], weeks = 20): ActivityCalendarCell[][] => {
    const grouped = groupBy(meals, (m) => m.date);
    const fiberByDate = new Map(
        Object.entries(grouped).map(([date, dayMeals]) => [
            date,
            sumBy(dayMeals, (m) => m.totalFiberGrams),
        ]),
    );

    const today = new Date();
    today.setHours(12, 0, 0, 0);

    const dayOfWeek = today.getDay();
    const lastSunday = new Date(today);
    lastSunday.setDate(today.getDate() - dayOfWeek);

    const startDate = new Date(lastSunday);
    startDate.setDate(lastSunday.getDate() - (weeks - 1) * 7);

    return Array.from({ length: weeks }, (_, w) =>
        Array.from({ length: 7 }, (_, d): ActivityCalendarCell => {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + w * 7 + d);

            if (date > today) return { date: "", level: 0 };

            const dateStr = toDateStr(date);
            const fibers = fiberByDate.get(dateStr) ?? null;
            const goalMet = fibers !== null && fibers >= DAILY_GOAL;

            return {
                date: dateStr,
                level: fibers === null ? 0 : fiberLevel(fibers),
                tooltip:
                    fibers === null
                        ? dateStr
                        : `${dateStr} — ${fibers.toFixed(1)}g de fibres${goalMet ? " ✓" : ` (objectif: ${DAILY_GOAL}g)`}`,
            };
        }),
    );
};
