import { memo } from "react";
import { EmptyState } from "@heroui/react/empty-state";
import type { Ingredient } from "../../../../../gql/generated";
import { IngredientRow } from "./ingredient-row";

type IngredientTableProps = {
    ingredients: Ingredient[];
    onStartEdit: (ingredient: Ingredient) => void;
    onDelete: (id: string) => void;
};

export const IngredientTable = memo(
    ({ ingredients, onStartEdit, onDelete }: IngredientTableProps) => {
        if (ingredients.length === 0) {
            return (
                <EmptyState className="flex w-full flex-col items-center justify-center py-8 text-center">
                    <span className="text-sm text-muted">
                        Aucun ingrédient. Ajoutez-en un ci-dessus.
                    </span>
                </EmptyState>
            );
        }

        return (
            <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border bg-surface-secondary">
                            <th className="px-4 py-2.5 text-left font-medium text-muted">Nom</th>
                            <th className="px-4 py-2.5 text-left font-medium text-muted">Unité</th>
                            <th className="px-4 py-2.5 text-left font-medium text-muted">
                                Affichage
                            </th>
                            <th className="px-4 py-2.5 text-left font-medium text-muted">
                                Fibres / unité
                            </th>
                            <th className="px-4 py-2.5 text-left font-medium text-muted">
                                Qté défaut
                            </th>
                            <th className="px-4 py-2.5" />
                        </tr>
                    </thead>
                    <tbody>
                        {ingredients.map((ingredient) => (
                            <IngredientRow
                                key={ingredient.id}
                                ingredient={ingredient}
                                onStartEdit={onStartEdit}
                                onDelete={onDelete}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    },
);
