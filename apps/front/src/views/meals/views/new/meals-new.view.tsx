import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import type { MenuIngredient } from "../../../../types/meal";
import { useMeals } from "../../../../hooks/use-meals";
import { computeTotalFiber } from "../../utils/compute-total-fiber";
import { MealsNewUI } from "./meals-new.ui";

const MAX_INGREDIENTS = 15;

const nowDate = () => new Date().toISOString().slice(0, 10);
const nowTime = () => new Date().toTimeString().slice(0, 5);

export const MealsNewView = () => {
    const { saveMeal } = useMeals();
    const navigate = useNavigate();

    const form = useForm({
        defaultValues: {
            date: nowDate(),
            time: nowTime(),
            name: "",
            ingredients: [] as MenuIngredient[],
        },
        onSubmit: ({ value }) => {
            saveMeal({
                date: value.date,
                time: value.time,
                name: value.name,
                ingredients: value.ingredients,
                totalFiberGrams: computeTotalFiber(value.ingredients),
            });
            void navigate({ to: "/meals" });
        },
    });

    const addIngredient = (params: Omit<MenuIngredient, "id">) => {
        const current = form.state.values.ingredients;
        if (current.length >= MAX_INGREDIENTS) return;
        form.setFieldValue("ingredients", [
            ...current,
            { id: crypto.randomUUID(), ...params },
        ]);
    };

    const removeIngredient = (id: string) => {
        form.setFieldValue(
            "ingredients",
            form.state.values.ingredients.filter((i) => i.id !== id),
        );
    };

    const updateIngredient = (id: string, quantity: number) => {
        form.setFieldValue(
            "ingredients",
            form.state.values.ingredients.map((i) =>
                i.id === id ? { ...i, quantity, fiberGrams: quantity * i.fiberPerUnit } : i,
            ),
        );
    };

    return (
        <form.Subscribe selector={(s) => s.values}>
            {({ date, time, name, ingredients }) => (
                <MealsNewUI
                    date={date}
                    time={time}
                    name={name}
                    ingredients={ingredients}
                    totalFiberGrams={computeTotalFiber(ingredients)}
                    maxIngredients={MAX_INGREDIENTS}
                    onDateChange={(v) => form.setFieldValue("date", v)}
                    onTimeChange={(v) => form.setFieldValue("time", v)}
                    onNameChange={(v) => form.setFieldValue("name", v)}
                    onAdd={addIngredient}
                    onRemove={removeIngredient}
                    onUpdate={updateIngredient}
                    onSubmit={() => form.handleSubmit()}
                    canSubmit={name.trim().length > 0 && ingredients.length > 0}
                />
            )}
        </form.Subscribe>
    );
};
