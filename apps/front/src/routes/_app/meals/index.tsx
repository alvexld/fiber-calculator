import { createFileRoute } from "@tanstack/react-router";
import { MealsListView } from "../../../views/meals/list/meals-list.view";

export const Route = createFileRoute("/_app/meals/")({
    component: MealsListView,
});
