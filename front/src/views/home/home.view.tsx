import { useState } from 'react'
import { useMenu } from '../menu-calculator/hooks/use-menu'
import { useMealHistory } from '../../hooks/use-meal-history'
import { computeTotalFiber } from '../menu-calculator/utils/compute-total-fiber'
import { groupMealsByDate } from '../history/utils/group-meals-by-date'
import { HomeUI } from './home.ui'
import type { SavedMeal } from '../../types/meal'

type ActiveView = 'calculator' | 'dashboard'

export const HomeView = () => {
    const { ingredients, addIngredient, removeIngredient, loadIngredients, resetMenu } = useMenu()
    const { meals, saveMeal, editMeal, deleteMeal } = useMealHistory()
    const [selectedMeal, setSelectedMeal] = useState<SavedMeal | null>(null)
    const [activeView, setActiveView] = useState<ActiveView>('calculator')

    const totalFiberGrams = computeTotalFiber(ingredients)
    const groups = groupMealsByDate(meals)

    const handleSelectMeal = (meal: SavedMeal) => {
        setSelectedMeal(meal)
        loadIngredients(meal.ingredients)
    }

    const handleSave = (name: string) => {
        if (selectedMeal) {
            editMeal(selectedMeal.id, { name, ingredients, totalFiberGrams })
        } else {
            saveMeal({
                date: new Date().toISOString().slice(0, 10),
                name,
                ingredients,
                totalFiberGrams,
            })
        }
        resetMenu()
        setSelectedMeal(null)
    }

    const handleNewMenu = () => {
        resetMenu()
        setSelectedMeal(null)
    }

    const handleDeleteMeal = (id: string) => {
        deleteMeal(id)
        if (selectedMeal?.id === id) handleNewMenu()
    }

    return (
        <HomeUI
            activeView={activeView}
            onViewChange={setActiveView}
            groups={groups}
            selectedMealId={selectedMeal?.id ?? null}
            onSelectMeal={handleSelectMeal}
            onDeleteMeal={handleDeleteMeal}
            meals={meals}
            ingredients={ingredients}
            totalFiberGrams={totalFiberGrams}
            isEditing={selectedMeal !== null}
            editingMealName={selectedMeal?.name}
            onAdd={addIngredient}
            onRemove={removeIngredient}
            onSave={handleSave}
            onNewMenu={handleNewMenu}
        />
    )
}
