import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { getIngredients } from "../../services/ingredients";
import { IngredientsView } from "../../views/ingredients/ingredients.view";
import { IngredientsSkeleton } from "../../views/ingredients/ingredients.skeleton";

export const Route = createFileRoute("/_app/ingredients")({
    validateSearch: (search: Record<string, unknown>) => ({
        query: typeof search.query === "string" ? search.query : "",
        page: typeof search.page === "number" ? Math.max(1, search.page) : 1,
    }),
    loaderDeps: ({ search: { query } }) => ({ query }),
    loader: ({ deps }) => getIngredients(deps.query),
    pendingComponent: IngredientsSkeleton,
    component: IngredientsRoute,
});

function IngredientsRoute() {
    const ingredients = Route.useLoaderData();
    const { query, page } = Route.useSearch();
    const navigate = useNavigate({ from: Route.fullPath });

    const setQuery = (q: string) => void navigate({ search: { query: q, page: 1 } });
    const setPage = (p: number) => void navigate({ search: (prev) => ({ ...prev, page: p }) });

    return (
        <IngredientsView
            ingredients={ingredients}
            query={query}
            page={page}
            onQueryChange={setQuery}
            onPageChange={setPage}
        />
    );
}
