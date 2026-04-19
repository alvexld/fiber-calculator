import type { SavedMeal } from '../../../types/meal'

export type DailyFiberPoint = {
    date: string // "YYYY-MM-DD" for sorting
    label: string // formatted for display
    fibers: number
    mealsCount: number
}

export const buildChartData = (meals: SavedMeal[]): DailyFiberPoint[] => {
    const map = new Map<string, { fibers: number; mealsCount: number }>()

    meals.forEach((meal) => {
        const existing = map.get(meal.date) ?? { fibers: 0, mealsCount: 0 }
        map.set(meal.date, {
            fibers: existing.fibers + meal.totalFiberGrams,
            mealsCount: existing.mealsCount + 1,
        })
    })

    return Array.from(map.entries())
        .map(([date, { fibers, mealsCount }]) => ({
            date,
            label: new Date(`${date}T12:00:00`).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
            }),
            fibers: Math.round(fibers * 10) / 10,
            mealsCount,
        }))
        .sort((a, b) => a.date.localeCompare(b.date))
}
