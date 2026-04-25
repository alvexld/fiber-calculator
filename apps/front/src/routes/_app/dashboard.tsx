import { createFileRoute } from "@tanstack/react-router";
import { DashboardView } from "../../views/dashboard/dashboard.view";

export const Route = createFileRoute("/_app/dashboard")({
    component: DashboardView,
});
