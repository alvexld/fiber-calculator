import { buildCalendarData, getMonthLabels, DAILY_GOAL } from '../../utils/build-calendar-data'
import type { SavedMeal } from '../../../../types/meal'

type FiberCalendarProps = {
    meals: SavedMeal[]
}

const LEVEL_CLASSES: Record<0 | 1 | 2 | 3 | 4, string> = {
    0: 'bg-gray-100',
    1: 'bg-purple-100',
    2: 'bg-purple-200',
    3: 'bg-purple-400',
    4: 'bg-purple-600',
}

const DAY_LABELS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
const SHOWN_DAY_ROWS = [1, 3, 5] // Mon, Wed, Fri rows only (avoid clutter)

export const FiberCalendar = ({ meals }: FiberCalendarProps) => {
    const weeks = buildCalendarData(meals)
    const monthLabels = getMonthLabels(weeks)

    return (
        <div className="flex flex-col gap-2 overflow-x-auto">
            {/* Month labels */}
            <div className="flex pl-8">
                {weeks.map((_, wi) => {
                    const label = monthLabels.find((m) => m.weekIndex === wi)
                    return (
                        <div key={wi} className="w-4 shrink-0 pr-1">
                            {label && (
                                <span className="whitespace-nowrap text-xs text-gray-400">
                                    {label.label}
                                </span>
                            )}
                        </div>
                    )
                })}
            </div>

            {/* Grid */}
            <div className="flex gap-1">
                {/* Day-of-week labels */}
                <div className="flex w-7 shrink-0 flex-col gap-1">
                    {Array.from({ length: 7 }, (_, d) => (
                        <div key={d} className="flex h-3 items-center">
                            {SHOWN_DAY_ROWS.includes(d) && (
                                <span className="text-[10px] text-gray-400">{DAY_LABELS[d]}</span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Week columns */}
                {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-1">
                        {week.map((day, di) => {
                            const tooltip =
                                day.date === ''
                                    ? undefined
                                    : day.fibers === null
                                      ? day.date
                                      : `${day.date} — ${day.fibers.toFixed(1)}g de fibres${day.goalMet ? ' ✓' : ` (objectif: ${DAILY_GOAL}g)`}`

                            return (
                                <div
                                    key={di}
                                    title={tooltip}
                                    className={`h-3 w-3 rounded-sm transition-opacity hover:opacity-70 ${day.date === '' ? 'opacity-0' : LEVEL_CLASSES[day.level]}`}
                                />
                            )
                        })}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 pl-8 pt-1">
                <span className="text-xs text-gray-400">Moins</span>
                {([0, 1, 2, 3, 4] as const).map((level) => (
                    <div key={level} className={`h-3 w-3 rounded-sm ${LEVEL_CLASSES[level]}`} />
                ))}
                <span className="text-xs text-gray-400">Plus</span>
                <span className="ml-2 text-xs text-gray-400">· Objectif : {DAILY_GOAL}g/jour</span>
            </div>
        </div>
    )
}
