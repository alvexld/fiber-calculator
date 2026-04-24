import { createFileRoute } from "@tanstack/react-router";
import { MealsEditView } from "../../../views/meals/edit/meals-edit.view";

export const Route = createFileRoute("/_app/meals/$id")({
    component: MealsEditRoute,
});

function MealsEditRoute() {
    const { id } = Route.useParams();
    return <MealsEditView mealId={id} />;
}
