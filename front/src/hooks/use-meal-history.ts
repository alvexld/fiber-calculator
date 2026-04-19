import { useState } from 'react'
import type { SavedMeal } from '../types/meal'
import { getMeals, addMeal, removeMeal, updateMeal } from '../services/meal-history'

type SaveMealParams = Omit<SavedMeal, 'id'>

export const useMealHistory = () => {
    const [meals, setMeals] = useState<SavedMeal[]>(() => getMeals())

    const saveMeal = (params: SaveMealParams) => {
        const meal: SavedMeal = { id: crypto.randomUUID(), ...params }
        addMeal(meal)
        setMeals((prev) => [...prev, meal])
    }

    const editMeal = (id: string, updates: Partial<Omit<SavedMeal, 'id'>>) => {
        updateMeal(id, updates)
        setMeals((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)))
    }

    const deleteMeal = (id: string) => {
        removeMeal(id)
        setMeals((prev) => prev.filter((m) => m.id !== id))
    }

    return { meals, saveMeal, editMeal, deleteMeal }
}
