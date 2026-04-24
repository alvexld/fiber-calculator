import { createFileRoute } from "@tanstack/react-router";
import { getBristols } from "../../services/bristol";
import { BristolView } from "../../views/bristol/bristol.view";

export const Route = createFileRoute("/_app/bristol")({
    loader: () => getBristols(),
    component: BristolRoute,
});

function BristolRoute() {
    const bristols = Route.useLoaderData();
    return <BristolView bristols={bristols} />;
}
