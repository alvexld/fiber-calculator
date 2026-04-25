import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { Button } from "@heroui/react/button";
import { Card } from "@heroui/react/card";
import { Input } from "@heroui/react/input";
import { login } from "../../services/auth";

export const LoginView = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        defaultValues: { username: "", password: "" },
        onSubmit: async ({ value }) => {
            setError(null);
            setIsLoading(true);
            try {
                await login(value.username, value.password);
                await router.navigate({ to: "/" });
            } catch (err) {
                setError(err instanceof Error ? err.message : "Erreur de connexion");
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <div className="flex min-h-screen items-center justify-center bg-default-50">
            <Card className="w-full max-w-sm">
                <Card.Header className="flex flex-col gap-1">
                    <Card.Title>Calculateur de fibres</Card.Title>
                    <Card.Description>Connectez-vous pour accéder à l'application</Card.Description>
                </Card.Header>
                <Card.Content>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            void form.handleSubmit();
                        }}
                        className="flex flex-col gap-4"
                    >
                        <form.Field name="username">
                            {(field) => (
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="username" className="text-sm font-medium">
                                        Nom d'utilisateur
                                    </label>
                                    <Input
                                        id="username"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        autoComplete="username"
                                        disabled={isLoading}
                                        required
                                    />
                                </div>
                            )}
                        </form.Field>

                        <form.Field name="password">
                            {(field) => (
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="password" className="text-sm font-medium">
                                        Mot de passe
                                    </label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        autoComplete="current-password"
                                        disabled={isLoading}
                                        required
                                    />
                                </div>
                            )}
                        </form.Field>

                        {error && <p className="text-sm text-danger">{error}</p>}

                        <Button type="submit" variant="primary" isDisabled={isLoading} fullWidth>
                            {isLoading ? "Connexion…" : "Se connecter"}
                        </Button>
                    </form>
                </Card.Content>
            </Card>
        </div>
    );
};
