import { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { Button } from "@heroui/react/button";
import { Input } from "@heroui/react/input";
import { NumberField } from "@heroui/react/number-field";
import { Select } from "@heroui/react/select";
import { ListBox } from "@heroui/react/list-box";
import { ListBoxItem } from "@heroui/react/list-box-item";
import type { CreateIngredient, Ingredient, Unit } from "@fc/shared";

type EditState = {
    name: string;
    unit: Unit;
    unitDisplay: string;
    fiberPerUnit: number;
};

type IngredientTableProps = {
    ingredients: Ingredient[];
    onEdit: (id: string, data: CreateIngredient) => void;
    onDelete: (id: string) => void;
};

export const IngredientTable = ({ ingredients, onEdit, onDelete }: IngredientTableProps) => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValues, setEditValues] = useState<EditState | null>(null);

    const startEdit = (ingredient: Ingredient) => {
        setEditingId(ingredient.id);
        setEditValues({
            name: ingredient.name,
            unit: ingredient.unit,
            unitDisplay: ingredient.unitDisplay ?? "",
            fiberPerUnit: ingredient.fiberPerUnit,
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditValues(null);
    };

    const confirmEdit = () => {
        if (!editingId || !editValues) return;
        onEdit(editingId, {
            name: editValues.name.trim(),
            unit: editValues.unit,
            unitDisplay: editValues.unitDisplay.trim() || null,
            fiberPerUnit: editValues.fiberPerUnit,
        });
        cancelEdit();
    };

    if (ingredients.length === 0) {
        return (
            <p className="py-8 text-center text-sm text-gray-400">
                Aucun ingrédient. Ajoutez-en un ci-dessus.
            </p>
        );
    }

    return (
        <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        <th className="px-4 py-3">Nom</th>
                        <th className="px-4 py-3">Unité</th>
                        <th className="px-4 py-3">Affichage</th>
                        <th className="px-4 py-3">Fibres / unité</th>
                        <th className="px-4 py-3" />
                    </tr>
                </thead>
                <tbody>
                    {ingredients.map((ingredient) =>
                        editingId === ingredient.id && editValues ? (
                            <tr key={ingredient.id} className="border-b bg-blue-50">
                                <td className="px-4 py-2">
                                    <Input
                                        value={editValues.name}
                                        onChange={(e) =>
                                            setEditValues(
                                                (v) => v && { ...v, name: e.target.value },
                                            )
                                        }
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <Select
                                        aria-label="Unité"
                                        selectedKey={editValues.unit}
                                        onSelectionChange={(key) =>
                                            setEditValues((v) => v && { ...v, unit: key as Unit })
                                        }
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
                                </td>
                                <td className="px-4 py-2">
                                    <Input
                                        value={editValues.unitDisplay}
                                        placeholder="—"
                                        onChange={(e) =>
                                            setEditValues(
                                                (v) => v && { ...v, unitDisplay: e.target.value },
                                            )
                                        }
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <NumberField
                                        aria-label="Fibres par unité"
                                        value={editValues.fiberPerUnit}
                                        onChange={(val) =>
                                            setEditValues(
                                                (v) =>
                                                    v && {
                                                        ...v,
                                                        fiberPerUnit: isNaN(val) ? 0 : val,
                                                    },
                                            )
                                        }
                                        minValue={0}
                                        step={0.1}
                                    >
                                        <NumberField.Group>
                                            <NumberField.DecrementButton>
                                                −
                                            </NumberField.DecrementButton>
                                            <NumberField.Input />
                                            <NumberField.IncrementButton>
                                                +
                                            </NumberField.IncrementButton>
                                        </NumberField.Group>
                                    </NumberField>
                                </td>
                                <td className="px-4 py-2">
                                    <div className="flex items-center gap-1">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            aria-label="Confirmer"
                                            onPress={confirmEdit}
                                        >
                                            <Check className="h-4 w-4 text-green-600" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            aria-label="Annuler"
                                            onPress={cancelEdit}
                                        >
                                            <X className="h-4 w-4 text-gray-500" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            <tr
                                key={ingredient.id}
                                className="group border-b transition-colors hover:bg-gray-50"
                            >
                                <td className="px-4 py-3 font-medium">{ingredient.name}</td>
                                <td className="px-4 py-3 text-gray-500">
                                    {ingredient.unit === "HUNDRED_G" ? "100g" : "Pièce"}
                                </td>
                                <td className="px-4 py-3 text-gray-500">
                                    {ingredient.unitDisplay ?? (
                                        <span className="text-gray-300">—</span>
                                    )}
                                </td>
                                <td className="px-4 py-3">{ingredient.fiberPerUnit}g</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            aria-label="Modifier"
                                            onPress={() => startEdit(ingredient)}
                                        >
                                            <Pencil className="h-3.5 w-3.5 text-gray-400" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            aria-label="Supprimer"
                                            onPress={() => onDelete(ingredient.id)}
                                        >
                                            <Trash2 className="h-3.5 w-3.5 text-gray-400 hover:text-red-500" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ),
                    )}
                </tbody>
            </table>
        </div>
    );
};
