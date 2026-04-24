import { createFileRoute, redirect } from "@tanstack/react-router";
import { getMe } from "../services/auth";
import { HistoryView } from "../views/history/history.view";

export const Route = createFileRoute("/history")({
    beforeLoad: async () => {
        const user = await getMe();
        if (!user) throw redirect({ to: "/login" });
    },
    component: HistoryView,
});
