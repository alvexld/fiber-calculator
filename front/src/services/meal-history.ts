import type { SavedMeal } from '../types/meal'

const STORAGE_KEY = 'fiber-calculator-meals'

const readStorage = (): SavedMeal[] => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? (JSON.parse(raw) as SavedMeal[]) : []
    } catch {
        return []
    }
}

const writeStorage = (meals: SavedMeal[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(meals))
}

export const getMeals = (): SavedMeal[] => readStorage()

export const addMeal = (meal: SavedMeal): void => {
    writeStorage([...readStorage(), meal])
}

export const removeMeal = (id: string): void => {
    writeStorage(readStorage().filter((m) => m.id !== id))
}

export const updateMeal = (id: string, updates: Partial<Omit<SavedMeal, 'id'>>): void => {
    writeStorage(readStorage().map((m) => (m.id === id ? { ...m, ...updates } : m)))
}
