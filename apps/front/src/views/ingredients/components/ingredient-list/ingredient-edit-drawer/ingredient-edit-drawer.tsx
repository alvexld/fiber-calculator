import { useForm } from "@tanstack/react-form";
import { Drawer } from "@heroui/react/drawer";
import { Button } from "@heroui/react/button";
import { Input } from "@heroui/react/input";
import { NumberField } from "@heroui/react/number-field";
import { Select } from "@heroui/react/select";
import { ListBox } from "@heroui/react/list-box";
import { ListBoxItem } from "@heroui/react/list-box-item";
import type { CreateIngredientInput, Ingredient, Unit } from "../../../../../gql/generated";

type Props = {
    ingredient: Ingredient | null;
    onSave: (id: string, data: CreateIngredientInput) => void;
    onClose: () => void;
};

type FormProps = {
    ingredient: Ingredient;
    onSave: (id: string, data: CreateIngredientInput) => void;
    onClose: () => void;
};

const IngredientEditForm = ({ ingredient, onSave, onClose }: FormProps) => {
    const form = useForm({
        defaultValues: {
            name: ingredient.name,
            unit: ingredient.unit as Unit,
            unitDisplay: ingredient.unitDisplay ?? "",
            fiberPerUnit: ingredient.fiberPerUnit,
            defaultQuantity: ingredient.defaultQuantity,
        },
        onSubmit: ({ value }) => {
            onSave(ingredient.id, {
                name: value.name.trim(),
                unit: value.unit,
                unitDisplay: value.unitDisplay.trim() || null,
                fiberPerUnit: value.fiberPerUnit,
                defaultQuantity: value.defaultQuantity,
            });
            onClose();
        },
    });

    return (
        <>
            <Drawer.Body className="flex flex-col gap-4">
                <form.Field name="name">
                    {(field) => (
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium">Nom</span>
                            <Input
                                autoFocus
                                variant="secondary"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                        </div>
                    )}
                </form.Field>
                <form.Field name="unit">
                    {(field) => (
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium">Unité</span>
                            <Select
                                aria-label="Unité"
                                value={field.state.value}
                                onChange={(key) => field.handleChange(key as Unit)}
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
                            <span className="text-sm font-medium">Affichage</span>
                            <Input
                                variant="secondary"
                                placeholder="—"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                        </div>
                    )}
                </form.Field>
                <form.Field name="fiberPerUnit">
                    {(field) => (
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium">Fibres / unité</span>
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
                            <span className="text-sm font-medium">Qté défaut</span>
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
            </Drawer.Body>
            <Drawer.Footer>
                <Button slot="close" variant="secondary">
                    Annuler
                </Button>
                <Button onPress={() => form.handleSubmit()}>Sauvegarder</Button>
            </Drawer.Footer>
        </>
    );
};

export const IngredientEditDrawer = ({ ingredient, onSave, onClose }: Props) => (
    <Drawer.Backdrop
        isOpen={ingredient !== null}
        onOpenChange={(open) => {
            if (!open) onClose();
        }}
    >
        <Drawer.Content placement="right">
            <Drawer.Dialog>
                <Drawer.CloseTrigger />
                <Drawer.Header>
                    <Drawer.Heading>Modifier l'ingrédient</Drawer.Heading>
                </Drawer.Header>
                {ingredient && (
                    <IngredientEditForm
                        key={ingredient.id}
                        ingredient={ingredient}
                        onSave={onSave}
                        onClose={onClose}
                    />
                )}
            </Drawer.Dialog>
        </Drawer.Content>
    </Drawer.Backdrop>
);
