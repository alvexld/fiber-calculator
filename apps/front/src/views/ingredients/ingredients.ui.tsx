import type { CreateIngredient, Ingredient } from "@fc/shared";
import { Card } from "@heroui/react/card";
import { IngredientAddForm } from "./components/ingredient-add-form";
import { IngredientTable } from "./components/ingredient-table";

type IngredientsUIProps = {
    ingredients: Ingredient[];
    onAdd: (data: CreateIngredient) => void;
    onEdit: (id: string, data: CreateIngredient) => void;
    onDelete: (id: string) => void;
};

export const IngredientsUI = ({ ingredients, onAdd, onEdit, onDelete }: IngredientsUIProps) => (
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

        <section>
            <h2 className="mb-3 text-sm font-semibold text-foreground">
                {ingredients.length} ingrédient{ingredients.length !== 1 ? "s" : ""}
            </h2>
            <IngredientTable ingredients={ingredients} onEdit={onEdit} onDelete={onDelete} />
        </section>
    </main>
);
