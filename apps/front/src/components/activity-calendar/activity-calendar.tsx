const DAY_LABELS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const SHOWN_DAY_ROWS = [1, 3, 5];

export type ActivityCalendarCell = {
    date: string;
    level: 0 | 1 | 2 | 3 | 4;
    tooltip?: string;
};

type ActivityCalendarProps = {
    weeks: ActivityCalendarCell[][];
    monthLabels: { weekIndex: number; label: string }[];
    levelColors: Record<0 | 1 | 2 | 3 | 4, string>;
    legend?: { min: string; max: string; note?: string };
};

export const getMonthLabels = (
    weeks: { date: string }[][],
): { weekIndex: number; label: string }[] => {
    const labels: { weekIndex: number; label: string }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, wi) => {
        const firstDay = week.find((d) => d.date !== "");
        if (!firstDay) return;
        const month = new Date(`${firstDay.date}T12:00:00`).getMonth();
        if (month !== lastMonth) {
            labels.push({
                weekIndex: wi,
                label: new Date(`${firstDay.date}T12:00:00`).toLocaleDateString("fr-FR", {
                    month: "short",
                }),
            });
            lastMonth = month;
        }
    });

    return labels;
};

export const ActivityCalendar = ({
    weeks,
    monthLabels,
    levelColors,
    legend,
}: ActivityCalendarProps) => (
    <div className="flex flex-col gap-2 overflow-x-auto">
        <div className="flex pl-8">
            {weeks.map((_, wi) => {
                const label = monthLabels.find((m) => m.weekIndex === wi);
                return (
                    <div key={wi} className="w-4 shrink-0 pr-1">
                        {label && (
                            <span className="whitespace-nowrap text-xs text-muted">
                                {label.label}
                            </span>
                        )}
                    </div>
                );
            })}
        </div>

        <div className="flex gap-1">
            <div className="flex w-7 shrink-0 flex-col gap-1">
                {Array.from({ length: 7 }, (_, d) => (
                    <div key={d} className="flex h-3 items-center">
                        {SHOWN_DAY_ROWS.includes(d) && (
                            <span className="text-[10px] text-muted">{DAY_LABELS[d]}</span>
                        )}
                    </div>
                ))}
            </div>

            {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-1">
                    {week.map((day, di) => (
                        <div
                            key={di}
                            title={day.tooltip}
                            className={`h-3 w-3 rounded-sm transition-opacity hover:opacity-70 ${day.date === "" ? "opacity-0" : levelColors[day.level]}`}
                        />
                    ))}
                </div>
            ))}
        </div>

        {legend && (
            <div className="flex items-center gap-2 pl-8 pt-1">
                <span className="text-xs text-muted">{legend.min}</span>
                {([0, 1, 2, 3, 4] as const).map((level) => (
                    <div key={level} className={`h-3 w-3 rounded-sm ${levelColors[level]}`} />
                ))}
                <span className="text-xs text-muted">{legend.max}</span>
                {legend.note && <span className="ml-2 text-xs text-muted">· {legend.note}</span>}
            </div>
        )}
    </div>
);
