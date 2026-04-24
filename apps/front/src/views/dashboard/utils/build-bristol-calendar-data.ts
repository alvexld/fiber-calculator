import { groupBy } from "es-toolkit";
import type { ActivityCalendarCell } from "../../../components/activity-calendar";
import type { Bristol } from "@fc/shared";

const toDateStr = (date: Date): string => date.toISOString().slice(0, 10);

const bristolLevel = (avg: number): 1 | 2 | 3 | 4 => {
    const dist = Math.abs(avg - 3.5);
    if (dist <= 0.5) return 4; // 3.0–4.0 ideal
    if (dist <= 1.0) return 3; // 2.5–3.0 or 4.0–4.5
    if (dist <= 1.5) return 2; // 2.0–2.5 or 4.5–5.0
    return 1; // < 2.0 or > 5.0
};

export const buildBristolCalendarData = (
    bristols: Bristol[],
    weeks = 20,
): ActivityCalendarCell[][] => {
    const grouped = groupBy(bristols, (b) => b.date);
    const avgByDate = new Map(
        Object.entries(grouped).map(([date, entries]) => [
            date,
            entries.reduce((s, b) => s + b.value, 0) / entries.length,
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
            const avg = avgByDate.get(dateStr) ?? null;

            return {
                date: dateStr,
                level: avg === null ? 0 : bristolLevel(avg),
                tooltip:
                    avg === null
                        ? dateStr
                        : `${dateStr} — Bristol moyen : ${avg.toFixed(1)} (${grouped[dateStr]!.length} entrée${grouped[dateStr]!.length > 1 ? "s" : ""})`,
            };
        }),
    );
};
