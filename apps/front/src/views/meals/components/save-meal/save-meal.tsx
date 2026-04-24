import { useEffect, useState } from "react";
import { Button } from "@heroui/react/button";
import { Input } from "@heroui/react/input";

type SaveMealProps = {
    isDisabled: boolean;
    initialName?: string;
    isEditing?: boolean;
    onSave: (name: string) => void;
    onCancel?: () => void;
};

export const SaveMeal = ({
    isDisabled,
    initialName = "",
    isEditing,
    onSave,
    onCancel,
}: SaveMealProps) => {
    const [name, setName] = useState(initialName);

    useEffect(() => {
        setName(initialName);
    }, [initialName]);

    const handleSave = () => {
        if (!name.trim() || isDisabled) return;
        onSave(name.trim());
        setName("");
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <Input
                    placeholder="Nom du repas (ex : Déjeuner)…"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isDisabled}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                />
                <Button onPress={handleSave} isDisabled={isDisabled || !name.trim()}>
                    {isEditing ? "Mettre à jour" : "Sauvegarder"}
                </Button>
                {isEditing && onCancel && (
                    <Button variant="ghost" onPress={onCancel}>
                        Annuler
                    </Button>
                )}
            </div>
        </div>
    );
};
