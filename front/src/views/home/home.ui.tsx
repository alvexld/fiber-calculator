import { MenuCalculatorUI } from "../menu-calculator/menu-calculator.ui";
import type { MenuIngredient } from "../../types/meal";

type HomeUIProps = {
    ingredients: MenuIngredient[];
    totalFiberGrams: number;
    isEditing: boolean;
    editingMealName?: string;
    onAdd: (ingredient: Omit<MenuIngredient, "id">) => void;
    onRemove: (id: string) => void;
    onUpdate: (id: string, quantity: number) => void;
    onSave: (name: string) => void;
    onNewMenu: () => void;
};

export const HomeUI = ({
    ingredients,
    totalFiberGrams,
    isEditing,
    editingMealName,
    onAdd,
    onRemove,
    onUpdate,
    onSave,
    onNewMenu,
}: HomeUIProps) => (
    <div className="mx-auto max-w-2xl">
        <MenuCalculatorUI
            ingredients={ingredients}
            totalFiberGrams={totalFiberGrams}
            isEditing={isEditing}
            editingMealName={editingMealName}
            onAdd={onAdd}
            onRemove={onRemove}
            onUpdate={onUpdate}
            onSave={onSave}
            onNewMenu={onNewMenu}
        />
    </div>
);
