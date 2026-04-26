import { useForm } from "@tanstack/react-form";
import { Button } from "@heroui/react/button";
import { Input } from "@heroui/react/input";
import { NumberField } from "@heroui/react/number-field";
import { Select } from "@heroui/react/select";
import { ListBox } from "@heroui/react/list-box";
import { ListBoxItem } from "@heroui/react/list-box-item";
import type { CreateIngredientInput, Unit } from "../../../../gql/generated";

type IngredientAddFormProps = {
    onAdd: (data: CreateIngredientInput) => void;
};

export const IngredientAddForm = ({ onAdd }: IngredientAddFormProps) => {
    const form = useForm({
        defaultValues: {
            name: "",
            unit: "PIECE" as Unit,
            unitDisplay: "",
            fiberPerUnit: 1,
            defaultQuantity: 1,
        },
        onSubmit: ({ value }) => {
            onAdd({
                name: value.name.trim(),
                unit: value.unit,
                unitDisplay: value.unitDisplay.trim() || null,
                fiberPerUnit: value.fiberPerUnit,
                defaultQuantity: value.defaultQuantity,
            });
            form.reset();
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
            className="grid grid-cols-2 gap-4"
        >
            <form.Field name="name">
                {(field) => (
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-foreground">Nom</label>
                        <Input
                            placeholder="Ex: Avocat demi"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            required
                        />
                    </div>
                )}
            </form.Field>

            <form.Field name="unit">
                {(field) => (
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-foreground">Unité</label>
                        <Select
                            aria-label="Unité"
                            selectedKey={field.state.value}
                            onSelectionChange={(key) => field.handleChange(key as Unit)}
                        >
                            <Select.Trigger>
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover>
                                <ListBox>
                                    <ListBoxItem id="PIECE" textValue="Pièce">
                                        Pièce
                                    </ListBoxItem>
                                    <ListBoxItem id="HUNDRED_G" textValue="100g">
                                        100g
                                    </ListBoxItem>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>
                )}
            </form.Field>

            <form.Field name="unitDisplay">
                {(field) => (
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-foreground">
                            Affichage unité{" "}
                            <span className="font-normal text-muted">(optionnel)</span>
                        </label>
                        <Input
                            placeholder="Ex: demi, tranche…"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                    </div>
                )}
            </form.Field>

            <form.Field name="fiberPerUnit">
                {(field) => (
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-foreground">
                            Fibres / unité (g)
                        </label>
                        <NumberField
                            aria-label="Fibres par unité"
                            value={field.state.value}
                            onChange={(val) => field.handleChange(isNaN(val) ? 0 : val)}
                            minValue={0}
                            step={0.1}
                        >
                            <NumberField.Group>
                                <NumberField.DecrementButton>−</NumberField.DecrementButton>
                                <NumberField.Input />
                                <NumberField.IncrementButton>+</NumberField.IncrementButton>
                            </NumberField.Group>
                        </NumberField>
                    </div>
                )}
            </form.Field>

            <form.Field name="defaultQuantity">
                {(field) => (
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-foreground">
                            Quantité par défaut
                        </label>
                        <NumberField
                            aria-label="Quantité par défaut"
                            value={field.state.value}
                            onChange={(val) => field.handleChange(isNaN(val) ? 1 : val)}
                            minValue={0.5}
                            step={0.5}
                        >
                            <NumberField.Group>
                                <NumberField.DecrementButton>−</NumberField.DecrementButton>
                                <NumberField.Input />
                                <NumberField.IncrementButton>+</NumberField.IncrementButton>
                            </NumberField.Group>
                        </NumberField>
                    </div>
                )}
            </form.Field>

            <div className="col-span-2 flex justify-end">
                <Button type="submit">Ajouter l'ingrédient</Button>
            </div>
        </form>
    );
};
