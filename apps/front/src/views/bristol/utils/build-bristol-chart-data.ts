import { groupBy } from "es-toolkit";
import type { Bristol } from "@fc/shared";

export type DailyBristolPoint = {
    date: string;
    label: string;
    average: number;
    count: number;
};

export const buildBristolChartData = (bristols: Bristol[]): DailyBristolPoint[] =>
    Object.entries(groupBy(bristols, (b) => b.date))
        .map(([date, dayEntries]) => ({
            date,
            label: new Date(`${date}T12:00:00`).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "short",
            }),
            average:
                Math.round(
                    (dayEntries.reduce((sum, b) => sum + b.value, 0) / dayEntries.length) * 10,
                ) / 10,
            count: dayEntries.length,
        }))
        .sort((a, b) => a.date.localeCompare(b.date));
