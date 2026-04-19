import { ScrollShadow } from "@heroui/react/scroll-shadow";
import { HistorySidebar } from "./components/history-sidebar/history-sidebar";
import { MenuCalculatorUI } from "../menu-calculator/menu-calculator.ui";
import { DashboardView } from "../dashboard/dashboard.view";
import type { DayGroup } from "../history/utils/group-meals-by-date";
import type { MenuIngredient, SavedMeal } from "../../types/meal";

type ActiveView = "calculator" | "dashboard";

type HomeUIProps = {
    activeView: ActiveView;
    onViewChange: (view: ActiveView) => void;
    groups: DayGroup[];
    selectedMealId: string | null;
    onSelectMeal: (meal: SavedMeal) => void;
    onDeleteMeal: (id: string) => void;
    meals: SavedMeal[];
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
    activeView,
    onViewChange,
    groups,
    selectedMealId,
    onSelectMeal,
    onDeleteMeal,
    meals,
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
    <div className="flex h-[calc(100vh-57px)]">
        <HistorySidebar
            groups={groups}
            selectedMealId={selectedMealId}
            activeView={activeView}
            onViewChange={onViewChange}
            onSelect={onSelectMeal}
            onDelete={onDeleteMeal}
        />
        <ScrollShadow className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-2xl">
                {activeView === "dashboard" ? (
                    <DashboardView meals={meals} />
                ) : (
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
                )}
            </div>
        </ScrollShadow>
    </div>
);
