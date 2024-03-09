import { create } from "zustand";

type CountAndPrice = { count: number; totalPrice: number };

interface MealsStore {
  selectedMeals: Record<string, CountAndPrice>;
  totalPrice: number;
  canSelectMeal: boolean;
  setCanSelectMeal: (canSelect: boolean) => void;
  handleMealSelection: (mealTitle: string, mealPrice: number) => void;
}

export const useMealsStore = create<MealsStore>((set) => ({
  selectedMeals: {},
  totalPrice: 0,
  canSelectMeal: false,
  setCanSelectMeal: (canSelect) => {
    set(() => ({ canSelectMeal: canSelect }));
  },
  handleMealSelection: (mealTitle, mealPrice) => {
    set((state) => {
      state.totalPrice += mealPrice;

      if (state.selectedMeals[mealTitle]) {
        const mealEntry = state.selectedMeals[mealTitle] as CountAndPrice;

        mealEntry.count += 1;
        mealEntry.totalPrice += mealPrice;
      } else {
        state.selectedMeals[mealTitle] = { count: 1, totalPrice: mealPrice };
      }

      return state;
    });
  },
}));





