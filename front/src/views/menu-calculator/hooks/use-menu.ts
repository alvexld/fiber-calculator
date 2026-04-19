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

  return { ingredients, addIngredient, removeIngredient }
}
