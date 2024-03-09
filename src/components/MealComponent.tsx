import { DrinksSelection } from "@/components/DrinksSelection";
import { Button } from "@/components/ui/button";
import { useMealsStore } from "@/lib/store/mealsStore";
import { MealWithAdditionalFields } from "@/lib/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface IMealProps {
  meal: MealWithAdditionalFields;
}

export function MealComponent({ meal }: IMealProps) {
  const [selectedDrinks, setSelectedDrinks] = useState<string[]>([]);
  const [mealPrice, setMealPrice] = useState<number>(meal.price);
  const [isSelectButtonActive, setIsSelectButtonActive] = useState(false);

  const canSelectMeal = useMealsStore((state) => state.canSelectMeal);
  const setCanSelectMeal = useMealsStore((state) => state.setCanSelectMeal);
  const handleMealSelection = useMealsStore(
    (state) => state.handleMealSelection
  );

  useEffect(() => {
    setMealPrice(meal.price);
    setSelectedDrinks([]);
  }, [canSelectMeal, meal.price]);

  const uniqueSelectedDrinks = [...new Set(selectedDrinks)];

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

  const numberOfMeals =
    meal.starter && meal.desert ? 3 : meal.starter || meal.desert ? 2 : 1;

  const hasDrinks = meal.drinks.length > 0;

  return (
    <div className="flex">
      <Image alt={meal.title} src={meal.img} width={200} height={200} />
      <div className="ml-6 flex flex-col gap-2 w-full">
        <p className="text-sm">
          {numberOfMeals} course meal {hasDrinks && "+ drink"}
        </p>
        <h2 className="text-xl font-semibold">{meal.title}</h2>
        <div className="text-sm">
          <p>Starter: {meal.starter}</p>
          <p>Desert: {meal.desert}</p>
          <p>
            Selected drink:{" "}
            {uniqueSelectedDrinks.map((drink, idx) =>
              idx !== uniqueSelectedDrinks.length - 1 ? (
                <React.Fragment key={drink}>{drink}, </React.Fragment>
              ) : (
                <React.Fragment key={drink}>{drink}</React.Fragment>
              )
            )}
          </p>
        </div>
        <div className="flex justify-between">
          <DrinksSelection
            drinks={meal.drinks}
            handleDrinkSelection={handleDrinkSelect}
          />
          <div>
            <p>{mealPrice.toFixed(2)} €</p>
            <Button
              variant={"outline"}
              className="px-6 py-3 border-sky-700 text-sky-700"
              disabled={!canSelectMeal}
              onClick={() => {
                handleMealSelection(meal.title, mealPrice);
                setCanSelectMeal(false);
                setIsSelectButtonActive(!isSelectButtonActive);
              }}
            >
              Select
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
