import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@heroui/react/button";
import { ListBox } from "@heroui/react/list-box";
import { ListBoxItem } from "@heroui/react/list-box-item";
import type { MenuIngredient } from "../../../../types/meal";

type IngredientListProps = {
    ingredients: MenuIngredient[];
    onRemove: (id: string) => void;
    onUpdate: (id: string, quantity: number) => void;
};

const formatUnit = (quantity: number, unit: string): string => {
    const match = unit.match(/^(\d+)g$/);
    if (match) return `${quantity * parseInt(match[1], 10)}g`;
    return `${quantity} ${unit}`;
};

const IngredientRow = ({
    ingredient,
    onRemove,
    onUpdate,
}: {
    ingredient: MenuIngredient;
    onRemove: (id: string) => void;
    onUpdate: (id: string, quantity: number) => void;
}) => {
    const [inputValue, setInputValue] = useState(String(ingredient.quantity));

    useEffect(() => {
        setInputValue(String(ingredient.quantity));
    }, [ingredient.quantity]);

    const commit = (raw: string) => {
        const val = parseFloat(raw);
        if (!isNaN(val) && val > 0) onUpdate(ingredient.id, val);
        else setInputValue(String(ingredient.quantity));
    };

    return (
        <ListBoxItem
            id={ingredient.id}
            textValue={ingredient.name}
            className="group flex items-center justify-between rounded-lg px-4 py-3"
        >
            <div className="flex flex-col">
                <span className="font-medium">{ingredient.name}</span>
                <span className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                    <input
                        type="number"
                        aria-label="Quantité"
                        value={inputValue}
                        min={0.1}
                        step={0.5}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={(e) => commit(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && commit(inputValue)}
                        className="w-14 rounded border border-gray-200 bg-transparent px-1.5 py-0.5 text-xs focus:border-gray-400 focus:outline-none"
                    />
                    <span>{formatUnit(ingredient.quantity, ingredient.unit)}</span>
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
    );
};

export const IngredientList = ({ ingredients, onRemove, onUpdate }: IngredientListProps) => {
    if (ingredients.length === 0) {
        return (
            <p className="py-6 text-center text-sm text-gray-500">
                Aucun ingrédient. Ajoutez-en un ci-dessus.
            </p>
        );
    }

    return (
        <ListBox aria-label="Ingrédients du menu" items={ingredients} selectionMode="none">
            {(ingredient) => (
                <IngredientRow ingredient={ingredient} onRemove={onRemove} onUpdate={onUpdate} />
            )}
        </ListBox>
    );
};
