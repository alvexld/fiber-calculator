import { Trash2 } from 'lucide-react'
import { Button } from '@heroui/react/button'
import { ListBox } from '@heroui/react/list-box'
import { ListBoxItem } from '@heroui/react/list-box-item'
import type { MenuIngredient } from '../../menu-calculator.types'

type IngredientListProps = {
    ingredients: MenuIngredient[]
    onRemove: (id: string) => void
}

export const IngredientList = ({ ingredients, onRemove }: IngredientListProps) => {
    if (ingredients.length === 0) {
        return (
            <p className="py-6 text-center text-sm text-gray-500">
                Aucun ingrédient. Ajoutez-en un ci-dessus.
            </p>
        )
    }

    return (
        <ListBox aria-label="Ingrédients du menu" items={ingredients} selectionMode="none">
            {(ingredient) => (
                <ListBoxItem
                    id={ingredient.id}
                    textValue={ingredient.name}
                    className="group flex items-center justify-between rounded-lg px-4 py-3"
                >
                    <div className="flex flex-col">
                        <span className="font-medium">{ingredient.name}</span>
                        <span className="text-sm text-gray-500">
                            {ingredient.quantity} {ingredient.unit}
                        </span>
                    </div>
                    <span className="flex items-center gap-4">
                        <span className="tabular-nums text-sm font-semibold">
                            {ingredient.fiberGrams.toFixed(1)}g de fibres
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            aria-label="Retirer"
                            onPress={() => onRemove(ingredient.id)}
                            className="opacity-0 transition-opacity group-hover:opacity-100"
                        >
                            <Trash2 className="h-4 w-4 text-gray-400 transition-colors hover:text-red-500" />
                        </Button>
                    </span>
                </ListBoxItem>
            )}
        </ListBox>
    )
}
