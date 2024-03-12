import { create } from "zustand";
import { MealWithAdditionalFields } from "@/lib/types";

type SelectedMeals = {
  meal: MealWithAdditionalFields;
  fullPrice: number;
  drinks: string[];
};

interface MealsStore {
  selectedMeals: SelectedMeals[];
  totalPrice: number;
  canSelectMeal: boolean;
  setCanSelectMeal: (canSelect: boolean) => void;
  handleMealSelection: (
    meal: MealWithAdditionalFields,
    fullPrice: number,
    mealDrinks: string[]
  ) => void;
  removeMealFromIndex: (index: number) => void;

  selectedMealInForm: MealWithAdditionalFields | undefined;
  setSelectedMealInForm: (
    selectedMeal: MealWithAdditionalFields | undefined
  ) => void;
}

export const useMealsStore = create<MealsStore>((set) => ({
  selectedMeals: [],
  totalPrice: 0,
  canSelectMeal: false,
  setCanSelectMeal: (canSelect) => {
    set(() => ({ canSelectMeal: canSelect }));
  },
  handleMealSelection: (meal, mealPrice, mealDrinks) => {
    set((state) => {
      state.totalPrice += mealPrice;

      state.selectedMeals.push({
        meal: meal,
        fullPrice: mealPrice,
        drinks: mealDrinks,
      });

      return state;
    });
  },
  removeMealFromIndex: (index) => {
    set((state) => ({
      totalPrice: state.totalPrice - state.selectedMeals[index]!.meal.price,
      selectedMeals: state.selectedMeals.filter((meal, idx) => idx !== index),
    }));
  },

  selectedMealInForm: undefined,
  setSelectedMealInForm: (selectedMeal) => {
    set(() => ({ selectedMealInForm: selectedMeal }));
  },
}));
