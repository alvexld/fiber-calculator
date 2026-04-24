import { Trash2, Pencil } from "lucide-react";
import { Button } from "@heroui/react/button";
import { Card } from "@heroui/react/card";
import type { SavedMeal } from "../../../../../types/meal";

type MealCardProps = {
    meal: SavedMeal;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
};

export const MealCard = ({ meal, onDelete, onEdit }: MealCardProps) => (
    <Card className="group">
        <Card.Header>
            <Card.Title className="text-base">{meal.name}</Card.Title>
            <span className="ml-auto flex items-center gap-2">
                <span className="tabular-nums text-sm font-semibold">
                    {meal.totalFiberGrams.toFixed(1)}g de fibres
                </span>
                <Button
                    variant="ghost"
                    size="sm"
                    aria-label="Modifier ce repas"
                    onPress={() => onEdit(meal.id)}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                >
                    <Pencil className="h-4 w-4 text-gray-400 hover:text-blue-600" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    aria-label="Supprimer ce repas"
                    onPress={() => onDelete(meal.id)}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                >
                    <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                </Button>
            </span>
        </Card.Header>
        <Card.Content>
            <ul className="flex flex-col gap-1">
                {meal.ingredients.map((ingredient) => (
                    <li key={ingredient.id} className="flex justify-between text-sm text-gray-600">
                        <span>
                            {ingredient.name} — {ingredient.quantity} {ingredient.unit}
                        </span>
                        <span className="tabular-nums">{ingredient.fiberGrams.toFixed(1)}g</span>
                    </li>
                ))}
            </ul>
        </Card.Content>
    </Card>
);
