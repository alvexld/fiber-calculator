import { createFileRoute } from "@tanstack/react-router";
import { getMeals } from "../../services/meal-history";
import { getBristols } from "../../services/bristol";
import { DashboardView } from "../../views/dashboard/dashboard.view";

export const Route = createFileRoute("/_app/dashboard")({
    loader: async () => {
        const [meals, bristols] = await Promise.all([getMeals(), getBristols()]);
        return { meals, bristols };
    },
    component: DashboardRoute,
});

function DashboardRoute() {
    const { meals, bristols } = Route.useLoaderData();
    return <DashboardView meals={meals} bristols={bristols} />;
}
