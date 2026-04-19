import type { MenuIngredient } from '../menu-calculator.types'

export const computeTotalFiber = (ingredients: MenuIngredient[]): number =>
  ingredients.reduce((total, item) => total + item.fiberGrams, 0)
