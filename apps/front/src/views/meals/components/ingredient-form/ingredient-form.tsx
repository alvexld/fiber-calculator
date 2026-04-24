import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { Button } from "@heroui/react/button";
import { Input } from "@heroui/react/input";
import { NumberField } from "@heroui/react/number-field";
import { ComboBox } from "@heroui/react/combo-box";
import { ListBox } from "@heroui/react/list-box";
import { ListBoxItem } from "@heroui/react/list-box-item";
import type { Ingredient } from "@fc/shared";
import { useDebounce } from "../../../../hooks/use-debounce";
import { getIngredients } from "../../../../services/ingredients";
import { formatUnit } from "../../utils/format-unit";
import type { MenuIngredient } from "../../../../types/meal";
import { EmptyState } from "@heroui/react";

type IngredientFormProps = {
    onAdd: (ingredient: Omit<MenuIngredient, "id">) => void;
};

export const IngredientForm = ({ onAdd }: IngredientFormProps) => {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 300);

    const { data: ingredients = [] } = useQuery({
        queryKey: ["ingredients", debouncedSearch],
        queryFn: () => getIngredients(debouncedSearch || undefined),
        placeholderData: keepPreviousData,
        staleTime: 30_000,
    });

    const form = useForm({
        defaultValues: { ingredientId: "", quantity: 1 },
        onSubmit: ({ value }) => {
            const ingredient = ingredients.find((i) => i.id === value.ingredientId);
            if (!ingredient || value.quantity <= 0 || isNaN(value.quantity)) return;
            onAdd({
                ingredientId: ingredient.id,
                name: ingredient.name,
                unit: formatUnit(ingredient),
                quantity: value.quantity,
                fiberPerUnit: ingredient.fiberPerUnit,
                fiberGrams: value.quantity * ingredient.fiberPerUnit,
            });
            form.reset();
            setSearch("");
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
            className="flex flex-col gap-4"
        >
            <form.Field name="ingredientId">
                {(field) => (
                    <ComboBox
                        aria-label="Ingrédient"
                        items={ingredients}
                        inputValue={search}
                        onInputChange={setSearch}
                        selectedKey={field.state.value || null}
                        onSelectionChange={(key) => {
                            field.handleChange(key as string);
                            const found = ingredients.find((i) => i.id === key);
                            if (found) setSearch(found.name);
                        }}
                    >
                        <ComboBox.InputGroup>
                            <Input placeholder="Rechercher un ingrédient…" />
                            <ComboBox.Trigger />
                        </ComboBox.InputGroup>
                        <ComboBox.Popover>
                            <ListBox renderEmptyState={() => <EmptyState />}>
                                {(item) => {
                                    const ingredient = item as Ingredient;
                                    return (
                                        <ListBoxItem id={ingredient.id} textValue={ingredient.name}>
                                            <span>{ingredient.name}</span>
                                            <span className="ml-auto text-sm text-gray-500">
                                                par {formatUnit(ingredient)} ·{" "}
                                                {ingredient.fiberPerUnit}g fibres
                                            </span>
                                        </ListBoxItem>
                                    );
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
                        onChange={(val) => field.handleChange(isNaN(val) ? 0.5 : val)}
                        minValue={0.5}
                        step={0.5}
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
                    const ingredient = ingredients.find((i) => i.id === ingredientId);
                    if (!ingredient) return null;
                    const fiber = (quantity * ingredient.fiberPerUnit).toFixed(1);
                    return (
                        <p className="text-sm text-gray-600">
                            {quantity} × {formatUnit(ingredient)} → <strong>{fiber}g</strong> de
                            fibres
                        </p>
                    );
                }}
            </form.Subscribe>

            <Button type="submit">Ajouter au menu</Button>
        </form>
    );
};
