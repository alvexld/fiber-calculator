import { useForm } from "@tanstack/react-form";
import { Button } from "@heroui/react/button";
import { Input } from "@heroui/react/input";
import { Card } from "@heroui/react/card";
import { Tooltip } from "@heroui/react/tooltip";
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

const nowDate = () => new Date().toISOString().slice(0, 10);
const nowTime = () => new Date().toTimeString().slice(0, 5);

type BristolFormValues = {
    date: string;
    time: string;
    value: number;
};

type BristolFormProps = {
    onSubmit: (values: BristolFormValues) => void;
};

export const BristolForm = ({ onSubmit }: BristolFormProps) => {
    const form = useForm({
        defaultValues: {
            date: nowDate(),
            time: nowTime(),
            value: null as number | null,
        },
        onSubmit: ({ value }) => {
            if (!value.value) return;
            onSubmit({ date: value.date, time: value.time, value: value.value });
            form.reset();
        },
    });

    return (
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
                            <form.Field name="date">
                                {(field) => (
                                    <TextField>
                                        <Label>Date</Label>
                                        <Input
                                            type="date"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                    </TextField>
                                )}
                            </form.Field>
                            <form.Field name="time">
                                {(field) => (
                                    <TextField>
                                        <Label>Heure</Label>
                                        <Input
                                            type="time"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                    </TextField>
                                )}
                            </form.Field>
                        </div>

                        <form.Field name="value">
                            {(field) => (
                                <TextField>
                                    <Label>Type</Label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5, 6, 7].map((v) => (
                                            <Tooltip key={v}>
                                                <Tooltip.Trigger>
                                                    <Button
                                                        isIconOnly
                                                        type="button"
                                                        onClick={() => field.handleChange(v)}
                                                        className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold ${field.state.value === v ? VALUE_COLORS[v] : VALUE_UNSELECTED}`}
                                                    >
                                                        {v}
                                                    </Button>
                                                </Tooltip.Trigger>
                                                <Tooltip.Content>
                                                    {BRISTOL_LABELS[v]}
                                                </Tooltip.Content>
                                            </Tooltip>
                                        ))}
                                    </div>
                                    {field.state.value !== null && (
                                        <Description>
                                            Type {field.state.value} —{" "}
                                            {BRISTOL_LABELS[field.state.value]}
                                        </Description>
                                    )}
                                </TextField>
                            )}
                        </form.Field>

                        <form.Subscribe selector={(s) => s.values.value}>
                            {(value) => (
                                <Fieldset.Actions>
                                    <Button
                                        isDisabled={value === null}
                                        onPress={() => form.handleSubmit()}
                                        className="w-full"
                                    >
                                        Enregistrer
                                    </Button>
                                </Fieldset.Actions>
                            )}
                        </form.Subscribe>
                    </div>
                </Fieldset.Group>
            </Card>
        </div>
    );
};
