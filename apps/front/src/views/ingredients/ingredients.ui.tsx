import type { CreateIngredient } from "@fc/shared";
import { Card } from "@heroui/react/card";
import { IngredientAddForm } from "./components/ingredient-add-form";
import { IngredientList } from "./components/ingredient-list";

type IngredientsUIProps = {
    onAdd: (data: CreateIngredient) => void;
};

export const IngredientsUI = ({ onAdd }: IngredientsUIProps) => (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-10">
        <div>
            <h1 className="text-xl font-semibold">Ingrédients</h1>
            <p className="mt-1 text-sm text-muted">
                Gérez la base d'ingrédients utilisée dans le calculateur.
            </p>
        </div>

        <Card>
            <Card.Header>
                <Card.Title>Ajouter un ingrédient</Card.Title>
            </Card.Header>
            <Card.Content>
                <IngredientAddForm onAdd={onAdd} />
            </Card.Content>
        </Card>

        <IngredientList />
    </main>
);
