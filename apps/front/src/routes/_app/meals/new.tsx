import { createFileRoute } from "@tanstack/react-router";
import { MealsNewView } from "../../../views/meals/new/meals-new.view";

export const Route = createFileRoute("/_app/meals/new")({
    component: MealsNewView,
});
