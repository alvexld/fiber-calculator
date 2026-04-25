import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { SearchField } from "@heroui/react/search-field";
import { ListBox } from "@heroui/react/list-box";
import { ListBoxItem } from "@heroui/react/list-box-item";
import { useDebounce } from "../../../../hooks/use-debounce";
import { getIngredients } from "../../../../services/ingredients";
import { formatUnit } from "../../utils/format-unit";
import type { MenuIngredient } from "../../../../types/meal";

type IngredientFormProps = {
  onAdd: (ingredient: Omit<MenuIngredient, "id">) => void;
};

export const IngredientForm = ({ onAdd }: IngredientFormProps) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const { data: ingredients = [] } = useQuery({
    queryKey: ["ingredients", debouncedSearch],
    queryFn: () =>
      getIngredients({
        search: debouncedSearch || undefined,
        orderBy: "usage",
        perPage: 30,
      }),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });

  const handleSelect = (ingredientId: string) => {
    const ingredient = ingredients.find((i) => i.id === ingredientId);
    if (!ingredient) return;
    onAdd({
      ingredientId: ingredient.id,
      name: ingredient.name,
      unit: formatUnit(ingredient),
      quantity: ingredient.defaultQuantity,
      fiberPerUnit: ingredient.fiberPerUnit,
      fiberGrams: ingredient.defaultQuantity * ingredient.fiberPerUnit,
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <SearchField
        aria-label="Rechercher un ingrédient"
        value={search}
        onChange={setSearch}
      >
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input placeholder="Rechercher un ingrédient…" />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>
      <ListBox
        aria-label="Ingrédients"
        items={ingredients}
        selectionMode="none"
        className="max-h-64 overflow-y-auto rounded-lg"
        renderEmptyState={() => (
          <p className="py-6 text-center text-sm text-muted">Aucun résultat</p>
        )}
      >
        {(ingredient) => (
          <ListBoxItem
            id={ingredient.id}
            textValue={ingredient.name}
            onAction={() => handleSelect(ingredient.id)}
            className="cursor-pointer px-4 py-2.5 hover:bg-surface-secondary"
          >
            <span className="font-medium">{ingredient.name}</span>
            <span className="ml-auto text-sm text-muted">
              {ingredient.defaultQuantity} {formatUnit(ingredient)} ·{" "}
              {(ingredient.defaultQuantity * ingredient.fiberPerUnit).toFixed(
                1,
              )}
              g fibres
            </span>
          </ListBoxItem>
        )}
      </ListBox>
    </div>
  );
};
