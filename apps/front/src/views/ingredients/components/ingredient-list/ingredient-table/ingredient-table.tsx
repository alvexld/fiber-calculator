import { Table } from "@heroui/react/table";
import { EmptyState } from "@heroui/react/empty-state";
import type { CreateIngredient, Ingredient } from "@fc/shared";
import { IngredientRow } from "./ingredient-row";

type IngredientTableProps = {
  ingredients: Ingredient[];
  onEdit: (id: string, data: CreateIngredient) => void;
  onDelete: (id: string) => void;
};

export const IngredientTable = ({
  ingredients,
  onEdit,
  onDelete,
}: IngredientTableProps) => (
  <Table variant="primary">
    <Table.ScrollContainer>
      <Table.Content aria-label="Ingrédients" selectionMode="none">
        <Table.Header>
          <Table.Column isRowHeader>Nom</Table.Column>
          <Table.Column>Unité</Table.Column>
          <Table.Column>Affichage</Table.Column>
          <Table.Column>Fibres / unité</Table.Column>
          <Table.Column>Qté défaut</Table.Column>
          <Table.Column>{""}</Table.Column>
        </Table.Header>
        <Table.Body
          renderEmptyState={() => (
            <EmptyState className="flex w-full flex-col items-center justify-center py-8 text-center">
              <span className="text-sm text-muted">
                Aucun ingrédient. Ajoutez-en un ci-dessus.
              </span>
            </EmptyState>
          )}
        >
          {ingredients.map((ingredient) => (
            <IngredientRow
              key={ingredient.id}
              ingredient={ingredient}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </Table.Body>
      </Table.Content>
    </Table.ScrollContainer>
  </Table>
);
