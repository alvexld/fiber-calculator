import { createFileRoute } from "@tanstack/react-router";
import { IngredientsView } from "../../views/ingredients/ingredients.view";

export const Route = createFileRoute("/_app/ingredients")({
    component: IngredientsView,
});
