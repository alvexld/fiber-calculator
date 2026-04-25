import { createFileRoute } from "@tanstack/react-router";
import { IngredientsView } from "../../views/ingredients/ingredients.view";

export const Route = createFileRoute("/_app/ingredients")({
    validateSearch: (search: Record<string, unknown>) => ({
        query: typeof search.query === "string" ? search.query : "",
        page: typeof search.page === "number" ? Math.max(1, search.page) : 1,
    }),
    component: IngredientsView,
});
