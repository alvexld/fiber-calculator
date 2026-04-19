import { useMenu } from './hooks/use-menu'
import { useMealHistory } from '../../hooks/use-meal-history'
import { computeTotalFiber } from './utils/compute-total-fiber'
import { MenuCalculatorUI } from './menu-calculator.ui'

export const MenuCalculatorView = () => {
    const { ingredients, addIngredient, removeIngredient, resetMenu } = useMenu()
    const { saveMeal } = useMealHistory()
    const totalFiberGrams = computeTotalFiber(ingredients)

    const handleSave = (name: string) => {
        saveMeal({
            date: new Date().toISOString().slice(0, 10),
            name,
            ingredients,
            totalFiberGrams,
        })
        resetMenu()
    }

    return (
        <MenuCalculatorUI
            ingredients={ingredients}
            totalFiberGrams={totalFiberGrams}
            onAdd={addIngredient}
            onRemove={removeIngredient}
            onSave={handleSave}
        />
    )
}
