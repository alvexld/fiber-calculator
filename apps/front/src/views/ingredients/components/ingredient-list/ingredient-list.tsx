import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { SearchField } from "@heroui/react/search-field";
import { Pagination } from "@heroui/react/pagination";
import { Route } from "../../../../routes/_app/ingredients";
import { useIngredients } from "../../hooks/use-ingredients";
import { useIngredientsManager } from "../../hooks/use-ingredients-manager";
import { IngredientTable } from "../ingredient-table";

const PAGE_SIZE = 20;

export const IngredientList = () => {
    const { query, page } = Route.useSearch();
    const navigate = useNavigate({ from: Route.fullPath });
    const [inputValue, setInputValue] = useState(query);

    const { data } = useIngredients({ query, page });
    const { editIngredient, removeIngredient } = useIngredientsManager();

    const ingredients = data?.ingredients.data ?? [];
    const total = data?.ingredients.total ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const safePage = Math.min(page, totalPages);

    const setQuery = (q: string) => void navigate({ search: { query: q, page: 1 } });
    const setPage = (p: number) => void navigate({ search: (prev) => ({ ...prev, page: p }) });

    return (
        <section>
            <div className="mb-3 flex items-center justify-between gap-4">
                <h2 className="text-sm font-semibold text-foreground">
                    {total} ingrédient{total !== 1 ? "s" : ""}
                </h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setQuery(inputValue);
                    }}
                >
                    <SearchField value={inputValue} onChange={setInputValue}>
                        <SearchField.Group>
                            <SearchField.SearchIcon />
                            <SearchField.Input />
                            <SearchField.ClearButton />
                        </SearchField.Group>
                    </SearchField>
                </form>
            </div>

            <IngredientTable
                ingredients={ingredients}
                onEdit={(id, ingredient) => editIngredient({ id, data: ingredient })}
                onDelete={removeIngredient}
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
