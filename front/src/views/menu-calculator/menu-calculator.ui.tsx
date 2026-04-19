import { Card } from '@heroui/react/card'
import { FiberKpi } from './components/fiber-kpi'
import { IngredientForm } from './components/ingredient-form'
import { IngredientList } from './components/ingredient-list'
import { SaveMeal } from './components/save-meal'
import type { MenuIngredient } from './menu-calculator.types'

type MenuCalculatorUIProps = {
    ingredients: MenuIngredient[]
    totalFiberGrams: number
    isEditing: boolean
    editingMealName?: string
    onAdd: (ingredient: Omit<MenuIngredient, 'id'>) => void
    onRemove: (id: string) => void
    onSave: (name: string) => void
    onNewMenu: () => void
}

export const MenuCalculatorUI = ({
    ingredients,
    totalFiberGrams,
    isEditing,
    editingMealName,
    onAdd,
    onRemove,
    onSave,
    onNewMenu,
}: MenuCalculatorUIProps) => (
    <div className="flex flex-col gap-6 px-6 py-8">
        <h1 className="text-2xl font-semibold">{isEditing ? editingMealName : 'Nouveau menu'}</h1>

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
            {ingredients.length > 0 && (
                <Card.Footer>
                    <SaveMeal
                        isDisabled={ingredients.length === 0}
                        isEditing={isEditing}
                        initialName={isEditing ? editingMealName : ''}
                        onSave={onSave}
                        onNewMenu={onNewMenu}
                    />
                </Card.Footer>
            )}
        </Card>
    </div>
)
