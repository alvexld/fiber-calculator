import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMenu } from "../../hooks/use-menu";
import { useMeals } from "../../../../hooks/use-meals";
import { computeTotalFiber } from "../../utils/compute-total-fiber";
import { MealsNewUI } from "./meals-new.ui";

const nowDate = () => new Date().toISOString().slice(0, 10);
const nowTime = () => new Date().toTimeString().slice(0, 5);

export const MealsNewView = () => {
    const { ingredients, addIngredient, removeIngredient, updateIngredient, resetMenu } = useMenu();
    const { saveMeal } = useMeals();
    const navigate = useNavigate();
    const totalFiberGrams = computeTotalFiber(ingredients);
    const [date, setDate] = useState(nowDate);
    const [time, setTime] = useState(nowTime);

    const handleSave = (name: string) => {
        saveMeal({
            date,
            time,
            name,
            ingredients,
            totalFiberGrams,
        });
        resetMenu();
        void navigate({ to: "/meals" });
    };

    return (
        <MealsNewUI
            ingredients={ingredients}
            totalFiberGrams={totalFiberGrams}
            date={date}
            time={time}
            onDateChange={setDate}
            onTimeChange={setTime}
            onAdd={addIngredient}
            onRemove={removeIngredient}
            onUpdate={updateIngredient}
            onSave={handleSave}
        />
    );
};
