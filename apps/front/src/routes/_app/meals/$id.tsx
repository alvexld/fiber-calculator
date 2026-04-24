import { createFileRoute, notFound } from "@tanstack/react-router";
import { MealsEditView } from "../../../views/meals/edit/meals-edit.view";
import { getMeal } from "../../../services/meals";

export const Route = createFileRoute("/_app/meals/$id")({
    loader: async ({ params }) => {
        const meal = await getMeal(params.id).catch(() => {
            throw notFound();
        });
        return { meal };
    },
    component: MealsEditRoute,
});

function MealsEditRoute() {
    const { meal } = Route.useLoaderData();
    return <MealsEditView meal={meal} />;
}
