import { Trash2 } from "lucide-react";
import { Button } from "@heroui/react/button";
import { Input } from "@heroui/react/input";
import { Card } from "@heroui/react/card";
import type { Bristol } from "@fc/shared";

const BRISTOL_LABELS: Record<number, string> = {
    1: "Boules dures",
    2: "Boudin bosselé",
    3: "Boudin fissuré",
    4: "Boudin lisse",
    5: "Fragments mous",
    6: "Boue",
    7: "Liquide",
};

const VALUE_COLORS: Record<number, string> = {
    1: "bg-amber-700 text-white border-amber-700",
    2: "bg-amber-500 text-white border-amber-500",
    3: "bg-green-500 text-white border-green-500",
    4: "bg-green-600 text-white border-green-600",
    5: "bg-yellow-500 text-white border-yellow-500",
    6: "bg-orange-500 text-white border-orange-500",
    7: "bg-red-500 text-white border-red-500",
};

const VALUE_UNSELECTED =
    "border border-border bg-surface text-foreground hover:border-muted transition-colors";

const formatDateTime = (date: string, time: string): string => {
    const d = new Date(`${date}T${time}`);
    return (
        d.toLocaleDateString("fr-FR", {
            weekday: "short",
            day: "numeric",
            month: "short",
        }) + ` · ${time}`
    );
};

type BristolUIProps = {
    bristols: Bristol[];
    date: string;
    time: string;
    value: number | null;
    onDateChange: (v: string) => void;
    onTimeChange: (v: string) => void;
    onValueChange: (v: number) => void;
    onSubmit: () => void;
    onDelete: (id: string) => void;
};

export const BristolUI = ({
    bristols,
    date,
    time,
    value,
    onDateChange,
    onTimeChange,
    onValueChange,
    onSubmit,
    onDelete,
}: BristolUIProps) => (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-10">
        <div>
            <h1 className="text-xl font-semibold">Échelle de Bristol</h1>
            <p className="mt-1 text-sm text-muted">
                Enregistrez vos selles selon l'échelle de Bristol (1 = très dure · 7 = liquide).
            </p>
        </div>

        <Card>
            <Card.Header>
                <Card.Title>Nouvelle entrée</Card.Title>
            </Card.Header>
            <Card.Content>
                <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-foreground">Date</label>
                            <Input
                                type="date"
                                value={date}
                                onChange={(e) => onDateChange(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-foreground">Heure</label>
                            <Input
                                type="time"
                                value={time}
                                onChange={(e) => onTimeChange(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-foreground">Type</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5, 6, 7].map((v) => (
                                <button
                                    key={v}
                                    type="button"
                                    onClick={() => onValueChange(v)}
                                    className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-semibold ${value === v ? VALUE_COLORS[v] : VALUE_UNSELECTED}`}
                                    title={BRISTOL_LABELS[v]}
                                >
                                    {v}
                                </button>
                            ))}
                        </div>
                        {value !== null && (
                            <p className="text-sm text-muted">
                                Type {value} — {BRISTOL_LABELS[value]}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <Button isDisabled={value === null} onPress={onSubmit}>
                            Enregistrer
                        </Button>
                    </div>
                </div>
            </Card.Content>
        </Card>

        <section>
            <h2 className="mb-3 text-sm font-semibold text-foreground">
                {bristols.length} entrée{bristols.length !== 1 ? "s" : ""}
            </h2>

            {bristols.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted">
                    Aucune entrée. Commencez par enregistrer votre première selle.
                </p>
            ) : (
                <div className="flex flex-col gap-2">
                    {bristols.map((b) => (
                        <Card key={b.id}>
                            <Card.Content className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold ${VALUE_COLORS[b.value]}`}
                                    >
                                        {b.value}
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium">
                                            {BRISTOL_LABELS[b.value]}
                                        </p>
                                        <p className="text-xs text-muted">
                                            {formatDateTime(b.date, b.time)}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    aria-label="Supprimer"
                                    onPress={() => onDelete(b.id)}
                                >
                                    <Trash2 className="h-4 w-4 text-muted hover:text-danger" />
                                </Button>
                            </Card.Content>
                        </Card>
                    ))}
                </div>
            )}
        </section>
    </main>
);
