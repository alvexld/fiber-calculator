import { Card } from "@heroui/react/card";
import { FiberKpi } from "../components/fiber-kpi/fiber-kpi";
import { IngredientForm } from "../components/ingredient-form/ingredient-form";
import { IngredientList } from "../components/ingredient-list/ingredient-list";
import { SaveMeal } from "../components/save-meal/save-meal";
import type { MenuIngredient } from "../../../types/meal";

type MealsEditUIProps = {
    mealName: string;
    ingredients: MenuIngredient[];
    totalFiberGrams: number;
    onAdd: (ingredient: Omit<MenuIngredient, "id">) => void;
    onRemove: (id: string) => void;
    onUpdate: (id: string, quantity: number) => void;
    onSave: (name: string) => void;
    onCancel: () => void;
};

export const MealsEditUI = ({
    mealName,
    ingredients,
    totalFiberGrams,
    onAdd,
    onRemove,
    onUpdate,
    onSave,
    onCancel,
}: MealsEditUIProps) => (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-8">
        <h1 className="text-2xl font-semibold">{mealName}</h1>

        <FiberKpi totalFiberGrams={totalFiberGrams} />

        <Card>
            <Card.Header>
                <Card.Title>Ajouter un ingrédient</Card.Title>
            </Card.Header>
            <Card.Content>
                <IngredientForm onAdd={onAdd} />
            </Card.Content>
        </Card>

        <Card>
            <Card.Header>
                <Card.Title>Menu</Card.Title>
                <Card.Description>{ingredients.length} ingrédient(s)</Card.Description>
            </Card.Header>
            <Card.Content>
                <IngredientList ingredients={ingredients} onRemove={onRemove} onUpdate={onUpdate} />
            </Card.Content>
            <Card.Footer>
                <SaveMeal
                    isDisabled={ingredients.length === 0}
                    isEditing={true}
                    initialName={mealName}
                    onSave={onSave}
                    onCancel={onCancel}
                />
            </Card.Footer>
        </Card>
    </div>
);
