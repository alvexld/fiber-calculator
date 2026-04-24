import { createFileRoute } from "@tanstack/react-router";
import { BristolView } from "../../views/bristol/bristol.view";

export const Route = createFileRoute("/_app/bristol")({
    component: BristolRoute,
});

function BristolRoute() {
    return <BristolView />;
}
