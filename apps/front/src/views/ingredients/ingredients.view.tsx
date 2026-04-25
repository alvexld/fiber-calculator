import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@heroui/react/toast";
import { Card } from "@heroui/react/card";
import { useCreateIngredientMutation, useIngredientsQuery } from "../../gql/generated";
import { IngredientAddForm } from "./components/ingredient-add-form/ingredient-add-form";
import { IngredientList } from "./components/ingredient-list/ingredient-list";

export const IngredientsView = () => {
    const queryClient = useQueryClient();
    const invalidate = () =>
        queryClient.invalidateQueries({ queryKey: useIngredientsQuery.getKey() });

    const { mutate: createIngredient } = useCreateIngredientMutation({
        onSuccess: () => {
            invalidate();
            toast.success("Sauvegardé");
        },
        onError: () => toast.danger("Erreur"),
    });

    return (
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
                    <IngredientAddForm onAdd={(input) => createIngredient({ input })} />
                </Card.Content>
            </Card>

            <IngredientList />
        </main>
    );
};
