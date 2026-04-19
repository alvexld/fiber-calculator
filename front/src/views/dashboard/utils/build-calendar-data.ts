import type { SavedMeal } from '../../../types/meal'

export const DAILY_GOAL = 25

export type CalendarDay = {
    date: string // YYYY-MM-DD, empty string = future/padding
    fibers: number | null
    goalMet: boolean
    level: 0 | 1 | 2 | 3 | 4 // 0=no data, 1–4 intensity
}

export type CalendarWeek = CalendarDay[]

const toDateStr = (date: Date): string => date.toISOString().slice(0, 10)

const fiberLevel = (fibers: number): 1 | 2 | 3 | 4 => {
    const pct = fibers / DAILY_GOAL
    if (pct >= 1) return 4
    if (pct >= 0.75) return 3
    if (pct >= 0.5) return 2
    return 1
}

export const buildCalendarData = (meals: SavedMeal[], weeks = 20): CalendarWeek[] => {
    const fiberByDate = new Map<string, number>()
    meals.forEach((meal) => {
        fiberByDate.set(meal.date, (fiberByDate.get(meal.date) ?? 0) + meal.totalFiberGrams)
    })

    const today = new Date()
    today.setHours(12, 0, 0, 0)

    // Align to last Sunday (GitHub style: weeks start Sunday)
    const dayOfWeek = today.getDay() // 0=Sun
    const lastSunday = new Date(today)
    lastSunday.setDate(today.getDate() - dayOfWeek)

    // Start N-1 weeks before last Sunday
    const startDate = new Date(lastSunday)
    startDate.setDate(lastSunday.getDate() - (weeks - 1) * 7)

    return Array.from({ length: weeks }, (_, w) =>
        Array.from({ length: 7 }, (_, d): CalendarDay => {
            const date = new Date(startDate)
            date.setDate(startDate.getDate() + w * 7 + d)

            if (date > today) return { date: '', fibers: null, goalMet: false, level: 0 }

            const dateStr = toDateStr(date)
            const fibers = fiberByDate.get(dateStr) ?? null

            return {
                date: dateStr,
                fibers,
                goalMet: fibers !== null && fibers >= DAILY_GOAL,
                level: fibers === null ? 0 : fiberLevel(fibers),
            }
        }),
    )
}

export const getMonthLabels = (weeks: CalendarWeek[]): { weekIndex: number; label: string }[] => {
    const labels: { weekIndex: number; label: string }[] = []
    let lastMonth = -1

    weeks.forEach((week, wi) => {
        const firstDay = week.find((d) => d.date !== '')
        if (!firstDay) return
        const month = new Date(`${firstDay.date}T12:00:00`).getMonth()
        if (month !== lastMonth) {
            labels.push({
                weekIndex: wi,
                label: new Date(`${firstDay.date}T12:00:00`).toLocaleDateString('fr-FR', {
                    month: 'short',
                }),
            })
            lastMonth = month
        }
    })

    return labels
}
