import { createFileRoute } from "@tanstack/react-router";
import { getMeals } from "../../../services/meal-history";
import { MealsListView } from "../../../views/meals/list/meals-list.view";

export const Route = createFileRoute("/_app/meals/")({
    loader: () => getMeals(),
    component: MealsListRoute,
});

function MealsListRoute() {
    const meals = Route.useLoaderData();
    return <MealsListView meals={meals} />;
}
