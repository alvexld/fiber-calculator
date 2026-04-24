import { createFileRoute } from "@tanstack/react-router";
import { useMealHistory } from "../hooks/use-meal-history";
import { DashboardView } from "../views/dashboard/dashboard.view";

export const Route = createFileRoute("/_app/dashboard")({
    component: DashboardRoute,
});

function DashboardRoute() {
    const { meals } = useMealHistory();
    return <DashboardView meals={meals} />;
}
