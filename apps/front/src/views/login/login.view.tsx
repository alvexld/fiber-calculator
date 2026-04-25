import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { Card } from "@heroui/react/card";
import { login } from "../../services/auth";
import { LoginForm } from "./components/login-form/login-form";

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
        <div className="flex min-h-screen items-center justify-center bg-default-50">
            <Card className="w-full max-w-sm">
                <Card.Header className="flex flex-col gap-1">
                    <Card.Title>Calculateur de fibres</Card.Title>
                    <Card.Description>Connectez-vous pour accéder à l'application</Card.Description>
                </Card.Header>
                <Card.Content>
                    <LoginForm
                        onSubmit={(values) => void handleSubmit(values)}
                        error={error}
                        isLoading={isLoading}
                    />
                </Card.Content>
            </Card>
        </div>
    );
};
