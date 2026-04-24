import { createFileRoute, redirect } from "@tanstack/react-router";
import { getMe } from "../services/auth";
import { LoginView } from "../views/login";

export const Route = createFileRoute("/login")({
    beforeLoad: async () => {
        const user = await getMe();
        if (user) throw redirect({ to: "/" });
    },
    component: LoginView,
});
