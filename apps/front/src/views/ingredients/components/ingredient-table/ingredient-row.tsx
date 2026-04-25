import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Trash2, Check, X } from "lucide-react";
import { Button } from "@heroui/react/button";
import { Input } from "@heroui/react/input";
import { NumberField } from "@heroui/react/number-field";
import { Select } from "@heroui/react/select";
import { Table } from "@heroui/react/table";
import { ListBox } from "@heroui/react/list-box";
import { ListBoxItem } from "@heroui/react/list-box-item";
import type { CreateIngredient, Ingredient, Unit } from "@fc/shared";

type IngredientRowProps = {
    ingredient: Ingredient;
    onEdit: (id: string, data: CreateIngredient) => void;
    onDelete: (id: string) => void;
};

export const IngredientRow = ({ ingredient, onEdit, onDelete }: IngredientRowProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm({
        defaultValues: {
            name: ingredient.name,
            unit: ingredient.unit as Unit,
            unitDisplay: ingredient.unitDisplay ?? "",
            fiberPerUnit: ingredient.fiberPerUnit,
            defaultQuantity: ingredient.defaultQuantity,
        },
        onSubmit: ({ value }) => {
            onEdit(ingredient.id, {
                name: value.name.trim(),
                unit: value.unit,
                unitDisplay: value.unitDisplay.trim() || null,
                fiberPerUnit: value.fiberPerUnit,
                defaultQuantity: value.defaultQuantity,
            });
            setIsEditing(false);
        },
    });

    const cancelEdit = () => {
        form.reset();
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") form.handleSubmit();
        if (e.key === "Escape") cancelEdit();
    };

    if (isEditing) {
        return (
            <Table.Row id={ingredient.id} className="bg-surface-secondary">
                <Table.Cell>
                    <form.Field name="name">
                        {(field) => (
                            <Input
                                autoFocus
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        )}
                    </form.Field>
                </Table.Cell>
                <Table.Cell>
                    <form.Field name="unit">
                        {(field) => (
                            <Select
                                aria-label="Unité"
                                selectedKey={field.state.value}
                                onSelectionChange={(key) => field.handleChange(key as Unit)}
                            >
                                <Select.Trigger>
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox>
                                        <ListBoxItem id="PIECE" textValue="Pièce">
                                            Pièce
                                        </ListBoxItem>
                                        <ListBoxItem id="HUNDRED_G" textValue="100g">
                                            100g
                                        </ListBoxItem>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        )}
                    </form.Field>
                </Table.Cell>
                <Table.Cell>
                    <form.Field name="unitDisplay">
                        {(field) => (
                            <Input
                                value={field.state.value}
                                placeholder="—"
                                onChange={(e) => field.handleChange(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        )}
                    </form.Field>
                </Table.Cell>
                <Table.Cell>
                    <form.Field name="fiberPerUnit">
                        {(field) => (
                            <NumberField
                                aria-label="Fibres par unité"
                                value={field.state.value}
                                onChange={(val) => field.handleChange(isNaN(val) ? 0 : val)}
                                minValue={0}
                                step={0.1}
                            >
                                <NumberField.Group>
                                    <NumberField.DecrementButton>−</NumberField.DecrementButton>
                                    <NumberField.Input />
                                    <NumberField.IncrementButton>+</NumberField.IncrementButton>
                                </NumberField.Group>
                            </NumberField>
                        )}
                    </form.Field>
                </Table.Cell>
                <Table.Cell>
                    <form.Field name="defaultQuantity">
                        {(field) => (
                            <NumberField
                                aria-label="Quantité par défaut"
                                value={field.state.value}
                                onChange={(val) => field.handleChange(isNaN(val) ? 1 : val)}
                                minValue={0.5}
                                step={0.5}
                            >
                                <NumberField.Group>
                                    <NumberField.DecrementButton>−</NumberField.DecrementButton>
                                    <NumberField.Input />
                                    <NumberField.IncrementButton>+</NumberField.IncrementButton>
                                </NumberField.Group>
                            </NumberField>
                        )}
                    </form.Field>
                </Table.Cell>
                <Table.Cell>
                    <div className="flex items-center gap-1">
                        <Button
                            size="sm"
                            variant="ghost"
                            aria-label="Confirmer"
                            onPress={() => form.handleSubmit()}
                        >
                            <Check className="h-4 w-4 text-success" />
                        </Button>
                        <Button size="sm" variant="ghost" aria-label="Annuler" onPress={cancelEdit}>
                            <X className="h-4 w-4 text-muted" />
                        </Button>
                    </div>
                </Table.Cell>
            </Table.Row>
        );
    }

    return (
        <Table.Row
            id={ingredient.id}
            className="group cursor-pointer transition-colors hover:bg-surface-secondary"
            onAction={() => setIsEditing(true)}
        >
            <Table.Cell>
                <span className="font-medium">{ingredient.name}</span>
            </Table.Cell>
            <Table.Cell>
                <span className="text-muted">
                    {ingredient.unit === "HUNDRED_G" ? "100g" : "Pièce"}
                </span>
            </Table.Cell>
            <Table.Cell>
                <span className="text-muted">{ingredient.unitDisplay ?? "—"}</span>
            </Table.Cell>
            <Table.Cell>
                <span>{ingredient.fiberPerUnit}g</span>
            </Table.Cell>
            <Table.Cell>
                <span>{ingredient.defaultQuantity}</span>
            </Table.Cell>
            <Table.Cell>
                <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                        size="sm"
                        variant="ghost"
                        aria-label="Supprimer"
                        onPress={() => onDelete(ingredient.id)}
                    >
                        <Trash2 className="h-3.5 w-3.5 text-muted" />
                    </Button>
                </div>
            </Table.Cell>
        </Table.Row>
    );
};
