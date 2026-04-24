import { createFileRoute } from "@tanstack/react-router";
import { HomeView } from "../views/home/home.view";

export const Route = createFileRoute("/_app/")({
    component: HomeView,
});
