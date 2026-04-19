import { Card } from '@heroui/react/card'
import { FiberKpi } from './components/fiber-kpi'
import { IngredientForm } from './components/ingredient-form'
import { IngredientList } from './components/ingredient-list'
import type { MenuIngredient } from './menu-calculator.types'

type MenuCalculatorUIProps = {
    ingredients: MenuIngredient[]
    totalFiberGrams: number
    onAdd: (ingredient: Omit<MenuIngredient, 'id'>) => void
    onRemove: (id: string) => void
}

export const MenuCalculatorUI = ({
    ingredients,
    totalFiberGrams,
    onAdd,
    onRemove,
}: MenuCalculatorUIProps) => (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10">
        <h1 className="text-2xl font-semibold">Calculateur de fibres</h1>

        <FiberKpi totalFiberGrams={totalFiberGrams} />

        <Card>
            <Card.Header>
                <Card.Title>Ajouter un ingrédient</Card.Title>
            </Card.Header>
            <Card.Content>
                <IngredientForm onAdd={onAdd} />
            </Card.Content>
        </Card>

        <Card>
            <Card.Header>
                <Card.Title>Menu</Card.Title>
                <Card.Description>{ingredients.length} ingrédient(s)</Card.Description>
            </Card.Header>
            <Card.Content>
                <IngredientList ingredients={ingredients} onRemove={onRemove} />
            </Card.Content>
        </Card>
    </main>
)
