import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Button } from '@heroui/react/button'
import { Input } from '@heroui/react/input'
import { NumberField } from '@heroui/react/number-field'
import { ComboBox } from '@heroui/react/combo-box'
import { ListBox } from '@heroui/react/list-box'
import { ListBoxItem } from '@heroui/react/list-box-item'
import { INGREDIENTS, type Ingredient } from '../../data/ingredients'
import type { MenuIngredient } from '../../menu-calculator.types'

type IngredientFormProps = {
    onAdd: (ingredient: Omit<MenuIngredient, 'id'>) => void
}

export const IngredientForm = ({ onAdd }: IngredientFormProps) => {
    const [search, setSearch] = useState('')

    const filteredIngredients = INGREDIENTS.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase()),
    )

    const form = useForm({
        defaultValues: { ingredientId: '', quantity: 1 },
        onSubmit: ({ value }) => {
            const ingredient = INGREDIENTS.find((i) => i.id === value.ingredientId)
            if (!ingredient || value.quantity <= 0) return
            onAdd({
                ingredientId: ingredient.id,
                name: ingredient.name,
                unit: ingredient.unit,
                quantity: value.quantity,
                fiberGrams: value.quantity * ingredient.fiberPerUnit,
            })
            form.reset()
            setSearch('')
        },
    })

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
            }}
            className="flex flex-col gap-4"
        >
            <form.Field name="ingredientId">
                {(field) => (
                    <ComboBox
                        aria-label="Ingrédient"
                        items={filteredIngredients}
                        inputValue={search}
                        onInputChange={setSearch}
                        selectedKey={field.state.value || null}
                        onSelectionChange={(key) => {
                            field.handleChange(key as string)
                            const found = INGREDIENTS.find((i) => i.id === key)
                            if (found) setSearch(found.name)
                        }}
                        menuTrigger="focus"
                    >
                        <ComboBox.InputGroup>
                            <Input placeholder="Rechercher un ingrédient…" />
                            <ComboBox.Trigger>▾</ComboBox.Trigger>
                        </ComboBox.InputGroup>
                        <ComboBox.Popover>
                            <ListBox>
                                {(item) => {
                                    const { id, name, unit, fiberPerUnit } = item as Ingredient
                                    return (
                                        <ListBoxItem id={id} textValue={name}>
                                            <span>{name}</span>
                                            <span className="ml-auto text-sm text-gray-500">
                                                par {unit} · {fiberPerUnit}g fibres
                                            </span>
                                        </ListBoxItem>
                                    )
                                }}
                            </ListBox>
                        </ComboBox.Popover>
                    </ComboBox>
                )}
            </form.Field>

            <form.Field name="quantity">
                {(field) => (
                    <NumberField
                        aria-label="Quantité"
                        value={field.state.value}
                        onChange={(val) => field.handleChange(isNaN(val) ? 1 : val)}
                        minValue={0.1}
                        step={0.5}
                        formatOptions={{ style: 'decimal', minimumFractionDigits: 1 }}
                    >
                        <NumberField.Group>
                            <NumberField.DecrementButton>−</NumberField.DecrementButton>
                            <NumberField.Input placeholder="Quantité" />
                            <NumberField.IncrementButton>+</NumberField.IncrementButton>
                        </NumberField.Group>
                    </NumberField>
                )}
            </form.Field>

            <form.Subscribe
                selector={(s) => ({
                    ingredientId: s.values.ingredientId,
                    quantity: s.values.quantity,
                })}
            >
                {({ ingredientId, quantity }) => {
                    const ingredient = INGREDIENTS.find((i) => i.id === ingredientId)
                    if (!ingredient) return null
                    const fiber = (quantity * ingredient.fiberPerUnit).toFixed(1)
                    return (
                        <p className="text-sm text-gray-600">
                            {quantity} × {ingredient.unit} → <strong>{fiber}g</strong> de fibres
                        </p>
                    )
                }}
            </form.Subscribe>

            <Button type="submit">Ajouter au menu</Button>
        </form>
    )
}
