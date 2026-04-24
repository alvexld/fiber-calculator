import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { login } from "../../services/auth";
import { LoginUi } from "./login.ui";

export const LoginView = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (values: { username: string; password: string }) => {
        setError(null);
        setIsLoading(true);
        try {
            await login(values.username, values.password);
            await router.navigate({ to: "/" });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erreur de connexion");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LoginUi
            onSubmit={(values) => void handleSubmit(values)}
            error={error}
            isLoading={isLoading}
        />
    );
};
