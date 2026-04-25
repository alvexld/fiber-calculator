import { useForm } from "@tanstack/react-form";
import { Card } from "@heroui/react/card";
import { Input } from "@heroui/react/input";
import { Button } from "@heroui/react/button";
import { NumberField } from "@heroui/react/number-field";
import { Label, TextField } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { FiberKpi } from "../../components/fiber-kpi/fiber-kpi";
import { IngredientForm } from "../../components/ingredient-form/ingredient-form";
import type { MenuIngredient } from "../../../../types/meal";
import type { MealFormValues } from "./meals-new.view";

const nowDate = () => new Date().toISOString().slice(0, 10);
const nowTime = () => new Date().toTimeString().slice(0, 5);

type MealsNewUIProps = {
    onSubmit: (value: MealFormValues) => void;
};

export const MealsNewUI = ({ onSubmit }: MealsNewUIProps) => {
    const form = useForm({
        defaultValues: {
            date: nowDate(),
            time: nowTime(),
            name: "",
            ingredients: [] as MenuIngredient[],
        },
        onSubmit: ({ value }) => onSubmit(value),
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
            className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-8"
        >
            <h1 className="text-2xl font-semibold">Nouveau repas</h1>

            <form.Subscribe
                selector={(s) =>
                    s.values.ingredients.reduce(
                        (acc, ing) => acc + ing.quantity * ing.fiberPerUnit,
                        0,
                    )
                }
            >
                {(totalFiber) => <FiberKpi totalFiberGrams={totalFiber} />}
            </form.Subscribe>

            <Card>
                <Card.Header>
                    <Card.Title>Date et heure</Card.Title>
                </Card.Header>
                <Card.Content>
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
                </Card.Content>
            </Card>

            <form.Field name="ingredients" mode="array">
                {(field) => (
                    <>
                        <Card>
                            <Card.Header>
                                <Card.Title>Ajouter un ingrédient</Card.Title>
                            </Card.Header>
                            <Card.Content>
                                <IngredientForm
                                    onAdd={(ingredient) =>
                                        field.pushValue({
                                            id: crypto.randomUUID(),
                                            ...ingredient,
                                        })
                                    }
                                />
                            </Card.Content>
                        </Card>

                        {field.state.value.length > 0 && (
                            <Card>
                                <Card.Header>
                                    <Card.Title>Menu</Card.Title>
                                    <Card.Description>
                                        {field.state.value.length} ingrédient(s)
                                    </Card.Description>
                                </Card.Header>
                                <Card.Content className="flex flex-col divide-y">
                                    {field.state.value.map((ingredient, i) => (
                                        <form.Field
                                            key={ingredient.id}
                                            name={`ingredients[${i}].quantity`}
                                        >
                                            {(subField) => (
                                                <div className="flex items-center justify-between gap-4 py-3">
                                                    <div className="flex min-w-0 flex-col">
                                                        <span className="truncate font-medium">
                                                            {ingredient.name}
                                                        </span>
                                                        <span className="text-sm text-muted">
                                                            {(
                                                                subField.state.value *
                                                                ingredient.fiberPerUnit
                                                            ).toFixed(1)}
                                                            g de fibres
                                                        </span>
                                                    </div>
                                                    <div className="flex shrink-0 items-center gap-2">
                                                        <NumberField
                                                            aria-label="Quantité"
                                                            value={subField.state.value}
                                                            onChange={(val) =>
                                                                subField.handleChange(
                                                                    isNaN(val) ? 0.5 : val,
                                                                )
                                                            }
                                                            minValue={0.5}
                                                            step={0.5}
                                                        >
                                                            <NumberField.Group>
                                                                <NumberField.DecrementButton>
                                                                    −
                                                                </NumberField.DecrementButton>
                                                                <NumberField.Input />
                                                                <NumberField.IncrementButton>
                                                                    +
                                                                </NumberField.IncrementButton>
                                                            </NumberField.Group>
                                                        </NumberField>
                                                        <Button
                                                            isIconOnly
                                                            variant="ghost"
                                                            size="sm"
                                                            aria-label="Retirer"
                                                            onPress={() => field.removeValue(i)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </form.Field>
                                    ))}
                                </Card.Content>
                                <Card.Footer>
                                    <form.Field name="name">
                                        {(nameField) => (
                                            <div className="flex w-full gap-2">
                                                <TextField className="flex-1">
                                                    <Input
                                                        placeholder="Nom du repas (ex : Déjeuner)…"
                                                        value={nameField.state.value}
                                                        onChange={(e) =>
                                                            nameField.handleChange(e.target.value)
                                                        }
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter")
                                                                form.handleSubmit();
                                                        }}
                                                    />
                                                </TextField>
                                                <form.Subscribe
                                                    selector={(s) =>
                                                        s.values.name.trim().length > 0 &&
                                                        s.values.ingredients.length > 0
                                                    }
                                                >
                                                    {(canSubmit) => (
                                                        <Button
                                                            type="submit"
                                                            isDisabled={!canSubmit}
                                                        >
                                                            Sauvegarder
                                                        </Button>
                                                    )}
                                                </form.Subscribe>
                                            </div>
                                        )}
                                    </form.Field>
                                </Card.Footer>
                            </Card>
                        )}
                    </>
                )}
            </form.Field>
        </form>
    );
};
