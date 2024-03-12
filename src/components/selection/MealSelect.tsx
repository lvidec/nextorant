"use client";

import { DrinksSelection } from "@/components/selection/DrinksSelection";
import { Button } from "@/components/ui/button";
import { useMealsStore } from "@/lib/store/mealsStore";
import { MealWithAdditionalFields } from "@/lib/types";
import { useEffect, useState } from "react";

interface IMealProps {
  meal: MealWithAdditionalFields;
}

export function MealSelect({ meal }: IMealProps) {
  const [selectedDrinks, setSelectedDrinks] = useState<string[]>([]);
  const [mealPrice, setMealPrice] = useState<number>(meal.price);

  const canSelectMeal = useMealsStore((state) => state.canSelectMeal);
  const setCanSelectMeal = useMealsStore((state) => state.setCanSelectMeal);
  const handleMealSelection = useMealsStore(
    (state) => state.handleMealSelection
  );

  useEffect(() => {
    setMealPrice(meal.price);
    setSelectedDrinks([]);
  }, [canSelectMeal, meal.price]);

  const handleDrinkSelect = (
    isActive: boolean,
    drinkTitle: string,
    price: number
  ) => {
    setMealPrice((prev) => (isActive ? prev + price : prev - price));

    setSelectedDrinks((prev) =>
      isActive
        ? [...prev, drinkTitle]
        : prev.filter((title) => title !== drinkTitle)
    );
  };

  return (
    <div className="flex justify-between">
      <DrinksSelection
        drinks={meal.drinks}
        handleDrinkSelection={handleDrinkSelect}
        selectedDrinks={selectedDrinks}
      />
      <div>
        <p>{mealPrice.toFixed(2)} €</p>
        <Button
          variant={"outline"}
          className="px-6 py-3 border-sky-700 text-sky-700"
          disabled={!canSelectMeal}
          onClick={() => {
            handleMealSelection(meal, mealPrice, selectedDrinks);
            setCanSelectMeal(false);
          }}
        >
          Select
        </Button>
      </div>
    </div>
  );
}
