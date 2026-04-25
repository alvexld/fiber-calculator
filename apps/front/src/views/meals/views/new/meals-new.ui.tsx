import { Card } from "@heroui/react/card";
import { Input } from "@heroui/react/input";
import { Button } from "@heroui/react/button";
import { Label, TextField } from "@heroui/react";
import { FiberKpi } from "../../components/fiber-kpi/fiber-kpi";
import { IngredientForm } from "../../components/ingredient-form/ingredient-form";
import { IngredientList } from "../../components/ingredient-list/ingredient-list";
import type { MenuIngredient } from "../../../../types/meal";

type MealsNewUIProps = {
    ingredients: MenuIngredient[];
    totalFiberGrams: number;
    date: string;
    time: string;
    name: string;
    onDateChange: (v: string) => void;
    onTimeChange: (v: string) => void;
    onNameChange: (v: string) => void;
    onAdd: (ingredient: Omit<MenuIngredient, "id">) => void;
    onRemove: (id: string) => void;
    onUpdate: (id: string, quantity: number) => void;
    onSubmit: () => void;
    canSubmit: boolean;
};

export const MealsNewUI = ({
    ingredients,
    totalFiberGrams,
    date,
    time,
    name,
    onDateChange,
    onTimeChange,
    onNameChange,
    onAdd,
    onRemove,
    onUpdate,
    onSubmit,
    canSubmit,
}: MealsNewUIProps) => (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-8">
        <h1 className="text-2xl font-semibold">Nouveau repas</h1>

        <FiberKpi totalFiberGrams={totalFiberGrams} />

        <Card>
            <Card.Header>
                <Card.Title>Date et heure</Card.Title>
            </Card.Header>
            <Card.Content>
                <div className="grid grid-cols-2 gap-3">
                    <TextField>
                        <Label>Date</Label>
                        <Input
                            type="date"
                            value={date}
                            onChange={(e) => onDateChange(e.target.value)}
                        />
                    </TextField>
                    <TextField>
                        <Label>Heure</Label>
                        <Input
                            type="time"
                            value={time}
                            onChange={(e) => onTimeChange(e.target.value)}
                        />
                    </TextField>
                </div>
            </Card.Content>
        </Card>

        <Card>
            <Card.Header>
                <Card.Title>Ajouter un ingrédient</Card.Title>
            </Card.Header>
            <Card.Content>
                <IngredientForm onAdd={onAdd} />
            </Card.Content>
        </Card>

        {ingredients.length > 0 && (
            <Card>
                <Card.Header>
                    <Card.Title>Menu</Card.Title>
                </Card.Header>
                <Card.Content>
                    <IngredientList
                        ingredients={ingredients}
                        onRemove={onRemove}
                        onUpdate={onUpdate}
                    />
                </Card.Content>
                <Card.Footer>
                    <div className="flex w-full gap-2">
                        <TextField className="flex-1">
                            <Input
                                placeholder="Nom du repas (ex : Déjeuner)…"
                                value={name}
                                onChange={(e) => onNameChange(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && canSubmit) onSubmit();
                                }}
                            />
                        </TextField>
                        <Button onPress={onSubmit} isDisabled={!canSubmit}>
                            Sauvegarder
                        </Button>
                    </div>
                </Card.Footer>
            </Card>
        )}
    </div>
);
