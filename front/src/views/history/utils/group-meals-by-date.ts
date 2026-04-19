import type { SavedMeal } from '../../../types/meal'

export type DayGroup = {
    date: string
    meals: SavedMeal[]
    dailyFiberGrams: number
}

export const groupMealsByDate = (meals: SavedMeal[]): DayGroup[] => {
    const map = new Map<string, SavedMeal[]>()

    meals.forEach((meal) => {
        const existing = map.get(meal.date) ?? []
        map.set(meal.date, [...existing, meal])
    })

    return Array.from(map.entries())
        .map(([date, dayMeals]) => ({
            date,
            meals: dayMeals,
            dailyFiberGrams: dayMeals.reduce((sum, m) => sum + m.totalFiberGrams, 0),
        }))
        .sort((a, b) => b.date.localeCompare(a.date))
}
