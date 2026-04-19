import { useState } from 'react'
import type { MenuIngredient } from '../menu-calculator.types'

type AddIngredientParams = Omit<MenuIngredient, 'id'>

export const useMenu = () => {
    const [ingredients, setIngredients] = useState<MenuIngredient[]>([])

    const addIngredient = (params: AddIngredientParams) => {
        setIngredients((prev) => [...prev, { id: crypto.randomUUID(), ...params }])
    }

    const removeIngredient = (id: string) => {
        setIngredients((prev) => prev.filter((item) => item.id !== id))
    }

    const loadIngredients = (items: MenuIngredient[]) => setIngredients(items)

    const resetMenu = () => setIngredients([])

    return { ingredients, addIngredient, removeIngredient, loadIngredients, resetMenu }
}
