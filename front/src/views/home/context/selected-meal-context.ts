import { createContext, useContext } from "react";
import type { SavedMeal } from "../../../types/meal";

type SelectedMealContextValue = {
    selectedMeal: SavedMeal | null;
    selectMeal: (meal: SavedMeal) => void;
    clearSelectedMeal: () => void;
};

export const SelectedMealContext = createContext<SelectedMealContextValue>({
    selectedMeal: null,
    selectMeal: () => {},
    clearSelectedMeal: () => {},
});

export const useSelectedMeal = () => useContext(SelectedMealContext);
