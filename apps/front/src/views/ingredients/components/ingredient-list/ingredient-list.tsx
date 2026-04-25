import { Pagination } from "@heroui/react/pagination";
import { SearchField } from "@heroui/react/search-field";
import { toast } from "@heroui/react/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  useDeleteIngredientMutation,
  useIngredientsQuery,
  useUpdateIngredientMutation,
} from "../../../../gql/generated";
import { IngredientTable } from "./ingredient-table/ingredient-table";

const PAGE_SIZE = 20;

export const IngredientList = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: useIngredientsQuery.getKey() });

  const { data } = useIngredientsQuery({
    search: query || undefined,
    page,
    perPage: PAGE_SIZE,
  });

  const { mutate: updateIngredient } = useUpdateIngredientMutation({
    onSuccess: () => {
      invalidate();
      toast.success("Sauvegardé");
    },
    onError: () => toast.danger("Erreur"),
  });

  const { mutate: deleteIngredient } = useDeleteIngredientMutation({
    onSuccess: () => {
      invalidate();
      toast.success("Sauvegardé");
    },
    onError: () => toast.danger("Erreur"),
  });

  const ingredients = data?.ingredients.data ?? [];
  const total = data?.ingredients.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const handleQueryChange = (q: string) => {
    setQuery(q);
    if (page !== 1) setPage(1);
  };

  return (
    <section>
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold text-foreground">
          {total} ingrédient{total !== 1 ? "s" : ""}
        </h2>
        <SearchField value={query} onChange={handleQueryChange}>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      </div>

      <IngredientTable
        ingredients={ingredients}
        onEdit={(id, ingredient) =>
          updateIngredient({ input: { id, ...ingredient } })
        }
        onDelete={(id) => deleteIngredient({ input: { id } })}
      />

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  onPress={() => setPage(safePage - 1)}
                  isDisabled={safePage <= 1}
                >
                  <Pagination.PreviousIcon />
                </Pagination.Previous>
              </Pagination.Item>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Pagination.Item key={p}>
                  <Pagination.Link
                    isActive={p === safePage}
                    onPress={() => setPage(p)}
                  >
                    {p}
                  </Pagination.Link>
                </Pagination.Item>
              ))}
              <Pagination.Item>
                <Pagination.Next
                  onPress={() => setPage(safePage + 1)}
                  isDisabled={safePage >= totalPages}
                >
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>
      )}
    </section>
  );
};
