import { memo } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@heroui/react/button";
import type { Ingredient } from "../../../../../gql/generated";

type IngredientRowProps = {
    ingredient: Ingredient;
    onStartEdit: (ingredient: Ingredient) => void;
    onDelete: (id: string) => void;
};

export const IngredientRow = memo(({ ingredient, onStartEdit, onDelete }: IngredientRowProps) => (
    <tr
        className="group cursor-pointer border-b border-border transition-colors last:border-0 hover:bg-surface-secondary"
        onClick={() => onStartEdit(ingredient)}
    >
        <td className="px-4 py-3 font-medium">{ingredient.name}</td>
        <td className="px-4 py-3 text-muted">
            {ingredient.unit === "HUNDRED_G" ? "100g" : "Pièce"}
        </td>
        <td className="px-4 py-3 text-muted">{ingredient.unitDisplay ?? "—"}</td>
        <td className="px-4 py-3">{ingredient.fiberPerUnit}g</td>
        <td className="px-4 py-3">{ingredient.defaultQuantity}</td>
        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-end opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                    size="sm"
                    variant="ghost"
                    aria-label="Supprimer"
                    onPress={() => onDelete(ingredient.id)}
                >
                    <Trash2 className="h-3.5 w-3.5 text-muted" />
                </Button>
            </div>
        </td>
    </tr>
));
