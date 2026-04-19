export type MenuIngredient = {
    id: string
    ingredientId: string
    name: string
    unit: string
    quantity: number
    fiberGrams: number // quantity × fiberPerUnit
}

export type SavedMeal = {
    id: string
    date: string // "YYYY-MM-DD"
    name: string
    ingredients: MenuIngredient[]
    totalFiberGrams: number
}
