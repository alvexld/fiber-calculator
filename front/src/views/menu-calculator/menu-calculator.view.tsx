import { useMenu } from './hooks/use-menu'
import { computeTotalFiber } from './utils/compute-total-fiber'
import { MenuCalculatorUI } from './menu-calculator.ui'

export const MenuCalculatorView = () => {
    const { ingredients, addIngredient, removeIngredient } = useMenu()
    const totalFiberGrams = computeTotalFiber(ingredients)

    return (
        <MenuCalculatorUI
            ingredients={ingredients}
            totalFiberGrams={totalFiberGrams}
            onAdd={addIngredient}
            onRemove={removeIngredient}
        />
    )
}
