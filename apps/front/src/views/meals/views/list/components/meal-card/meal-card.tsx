import { Trash2, Pencil } from "lucide-react";
import { Button } from "@heroui/react/button";
import { Card } from "@heroui/react/card";
import type { SavedMeal } from "../../../../../../types/meal";
import { Label, ListBox, ListBoxItem } from "@heroui/react";

type MealCardProps = {
    meal: SavedMeal;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
};

export const MealCard = ({ meal, onDelete, onEdit }: MealCardProps) => (
    <Card className="group">
        <Card.Header>
            <Card.Title className="flex items-center justify-between">
                {meal.name}

                <span className="ml-auto flex items-center gap-2">
                    <Button
                        isIconOnly
                        variant="ghost"
                        size="sm"
                        aria-label="Modifier ce repas"
                        onPress={() => onEdit(meal.id)}
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                    >
                        <Pencil className="h-4 w-4 text-muted hover:text-accent" />
                    </Button>
                    <Button
                        isIconOnly
                        variant="ghost"
                        size="sm"
                        aria-label="Supprimer ce repas"
                        onPress={() => onDelete(meal.id)}
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                    >
                        <Trash2 className="h-4 w-4 text-muted hover:text-danger" />
                    </Button>
                </span>
            </Card.Title>
            <Card.Description className="tabular-nums text-sm font-semibold">
                {meal.totalFiberGrams.toFixed(1)}g de fibres
            </Card.Description>
        </Card.Header>
        <Card.Content>
            <ListBox>
                {meal.ingredients.map((ingredient) => (
                    <ListBoxItem key={ingredient.id}>
                        <Label>
                            {ingredient.name} — {ingredient.quantity} {ingredient.unit}
                        </Label>
                        <ListBox.ItemIndicator>
                            {ingredient.fiberGrams.toFixed(1)}g
                        </ListBox.ItemIndicator>
                    </ListBoxItem>
                ))}
            </ListBox>
        </Card.Content>
    </Card>
);
