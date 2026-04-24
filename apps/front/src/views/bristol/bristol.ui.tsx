import { Trash2 } from "lucide-react";
import { Button } from "@heroui/react/button";
import { Input } from "@heroui/react/input";
import { Card } from "@heroui/react/card";
import { Tooltip } from "@heroui/react/tooltip";
import { ListBox } from "@heroui/react/list-box";
import { Header } from "@heroui/react/header";
import { Separator } from "@heroui/react/separator";
import type { Bristol } from "@fc/shared";
import { Description, Fieldset, Label, TextField } from "@heroui/react";

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
    1: "bg-amber-700 text-white",
    2: "bg-amber-500 text-white",
    3: "bg-green-500 text-white",
    4: "bg-green-600 text-white",
    5: "bg-yellow-500 text-white",
    6: "bg-orange-500 text-white",
    7: "bg-red-500 text-white",
};

const VALUE_UNSELECTED =
    "border border-border bg-surface text-foreground hover:border-muted transition-colors";

const formatTime = (time: string) => time.slice(0, 5);

const formatDateHeader = (dateStr: string): string => {
    const d = new Date(dateStr + "T00:00:00");
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (d.toDateString() === today.toDateString()) return "Aujourd'hui";
    if (d.toDateString() === yesterday.toDateString()) return "Hier";

    return d.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });
};

const groupByDate = (items: Bristol[]): [string, Bristol[]][] => {
    const groups: Record<string, Bristol[]> = {};
    for (const item of items) {
        (groups[item.date] ??= []).push(item);
    }
    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
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
}: BristolUIProps) => {
    const grouped = groupByDate(bristols);

    return (
        <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10 lg:flex-row lg:items-start lg:gap-8">
            {/* Left column — form */}
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-xl font-semibold">Échelle de Bristol</h1>
                    <Description className="mt-1 text-sm text-muted">
                        1 = très dure · 7 = liquide
                    </Description>
                </div>

                <Card className="min-w-md">
                    <Fieldset>
                        <Fieldset.Legend>Nouvelle entrée</Fieldset.Legend>
                    </Fieldset>
                    <Fieldset.Group>
                        <div className="flex flex-col gap-5">
                            <div className="grid grid-cols-2 gap-3">
                                <TextField>
                                    <Label>Date</Label>
                                    <Input
                                        type="date"
                                        value={date}
                                        onChange={(e) => onDateChange(e.target.value)}
                                    />
                                </TextField>
                                <TextField>
                                    <Label>Heure</Label>
                                    <Input
                                        type="time"
                                        value={time}
                                        onChange={(e) => onTimeChange(e.target.value)}
                                    />
                                </TextField>
                            </div>

                            <TextField>
                                <Label>Type</Label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5, 6, 7].map((v) => (
                                        <Tooltip key={v}>
                                            <Tooltip.Trigger>
                                                <Button
                                                    isIconOnly
                                                    type="button"
                                                    onClick={() => onValueChange(v)}
                                                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold ${value === v ? VALUE_COLORS[v] : VALUE_UNSELECTED}`}
                                                >
                                                    {v}
                                                </Button>
                                            </Tooltip.Trigger>
                                            <Tooltip.Content>{BRISTOL_LABELS[v]}</Tooltip.Content>
                                        </Tooltip>
                                    ))}
                                </div>
                                {value !== null && (
                                    <Description>
                                        Type {value} — {BRISTOL_LABELS[value]}
                                    </Description>
                                )}
                            </TextField>

                            <Fieldset.Actions>
                                <Button
                                    isDisabled={value === null}
                                    onPress={onSubmit}
                                    className="w-full"
                                >
                                    Enregistrer
                                </Button>
                            </Fieldset.Actions>
                        </div>
                    </Fieldset.Group>
                </Card>
            </div>

            {/* Right column — history */}
            <div className="flex flex-1 flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-foreground">Historique</h2>
                    <span className="text-xs text-muted">
                        {bristols.length} entrée{bristols.length !== 1 ? "s" : ""}
                    </span>
                </div>

                {bristols.length === 0 ? (
                    <Card>
                        <Card.Content>
                            <p className="py-6 text-center text-sm text-muted">
                                Aucune entrée. Commencez par enregistrer votre première selle.
                            </p>
                        </Card.Content>
                    </Card>
                ) : (
                    <Card>
                        <Card.Content className="p-0">
                            <ListBox
                                aria-label="Historique des entrées Bristol"
                                selectionMode="none"
                                className="max-h-[600px] overflow-y-auto"
                            >
                                {grouped.map(([dateKey, entries], groupIndex) => (
                                    <>
                                        {groupIndex > 0 && <Separator key={`sep-${dateKey}`} />}
                                        <ListBox.Section key={dateKey}>
                                            <Header>{formatDateHeader(dateKey)}</Header>
                                            {entries
                                                .slice()
                                                .sort((a, b) => b.time.localeCompare(a.time))
                                                .map((b) => (
                                                    <ListBox.Item
                                                        key={b.id}
                                                        id={b.id}
                                                        textValue={BRISTOL_LABELS[b.value]}
                                                    >
                                                        <span
                                                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${VALUE_COLORS[b.value]}`}
                                                        >
                                                            {b.value}
                                                        </span>
                                                        <Label>{BRISTOL_LABELS[b.value]}</Label>
                                                        <span className="ml-auto text-xs tabular-nums text-muted">
                                                            {formatTime(b.time)}
                                                        </span>
                                                        <Tooltip>
                                                            <Tooltip.Trigger>
                                                                <Button
                                                                    isIconOnly
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    aria-label="Supprimer"
                                                                    onPress={() => onDelete(b.id)}
                                                                    className="opacity-0 transition-opacity group-hover:opacity-100"
                                                                >
                                                                    <Trash2 className="h-4 w-4 text-muted" />
                                                                </Button>
                                                            </Tooltip.Trigger>
                                                            <Tooltip.Content>
                                                                Supprimer
                                                            </Tooltip.Content>
                                                        </Tooltip>
                                                    </ListBox.Item>
                                                ))}
                                        </ListBox.Section>
                                    </>
                                ))}
                            </ListBox>
                        </Card.Content>
                    </Card>
                )}
            </div>
        </main>
    );
};
