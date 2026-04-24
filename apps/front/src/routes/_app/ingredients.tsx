import { createFileRoute } from "@tanstack/react-router";
import { getIngredients } from "../../services/ingredients";
import { IngredientsView } from "../../views/ingredients/ingredients.view";

export const Route = createFileRoute("/_app/ingredients")({
    loader: () => getIngredients(),
    component: IngredientsRoute,
});

function IngredientsRoute() {
    const ingredients = Route.useLoaderData();
    return <IngredientsView ingredients={ingredients} />;
}
