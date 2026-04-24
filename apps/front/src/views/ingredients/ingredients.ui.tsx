import type { CreateIngredient, Ingredient } from "@fc/shared";
import { SearchField } from "@heroui/react";
import { Card } from "@heroui/react/card";
import { Pagination } from "@heroui/react/pagination";
import { useEffect, useState } from "react";
import { IngredientAddForm } from "./components/ingredient-add-form";
import { IngredientTable } from "./components/ingredient-table";

const PAGE_SIZE = 20;

type IngredientsUIProps = {
    ingredients: Ingredient[];
    query: string;
    page: number;
    onAdd: (data: CreateIngredient) => void;
    onEdit: (id: string, data: CreateIngredient) => void;
    onDelete: (id: string) => void;
    onQueryChange: (q: string) => void;
    onPageChange: (p: number) => void;
};

export const IngredientsUI = ({
    ingredients,
    query,
    page,
    onAdd,
    onEdit,
    onDelete,
    onQueryChange,
    onPageChange,
}: IngredientsUIProps) => {
    const [inputValue, setInputValue] = useState(query);

    useEffect(() => {
        setInputValue(query);
    }, [query]);

    const totalPages = Math.max(1, Math.ceil(ingredients.length / PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * PAGE_SIZE;
    const pageItems = ingredients.slice(start, start + PAGE_SIZE);

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
                    <IngredientAddForm onAdd={onAdd} />
                </Card.Content>
            </Card>

            <section>
                <div className="mb-3 flex items-center justify-between gap-4">
                    <h2 className="text-sm font-semibold text-foreground">
                        {ingredients.length} ingrédient{ingredients.length !== 1 ? "s" : ""}
                    </h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            onQueryChange(inputValue);
                        }}
                    >
                        <SearchField value={inputValue} onChange={(value) => setInputValue(value)}>
                            <SearchField.Group>
                                <SearchField.SearchIcon />
                                <SearchField.Input />
                                <SearchField.ClearButton />
                            </SearchField.Group>
                        </SearchField>
                    </form>
                </div>

                <IngredientTable ingredients={pageItems} onEdit={onEdit} onDelete={onDelete} />

                {totalPages > 1 && (
                    <div className="mt-4 flex justify-center">
                        <Pagination>
                            <Pagination.Content>
                                <Pagination.Item>
                                    <Pagination.Previous
                                        onPress={() => onPageChange(safePage - 1)}
                                        isDisabled={safePage <= 1}
                                    >
                                        <Pagination.PreviousIcon />
                                    </Pagination.Previous>
                                </Pagination.Item>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                    <Pagination.Item key={p}>
                                        <Pagination.Link
                                            isActive={p === safePage}
                                            onPress={() => onPageChange(p)}
                                        >
                                            {p}
                                        </Pagination.Link>
                                    </Pagination.Item>
                                ))}
                                <Pagination.Item>
                                    <Pagination.Next
                                        onPress={() => onPageChange(safePage + 1)}
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
        </main>
    );
};
