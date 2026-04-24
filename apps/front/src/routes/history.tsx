import { createFileRoute } from "@tanstack/react-router";
import { HistoryView } from "../views/history/history.view";

export const Route = createFileRoute("/history")({
    component: HistoryView,
});
