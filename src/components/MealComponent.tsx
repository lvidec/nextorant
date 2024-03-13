import { useMealsStore } from "@/lib/store/mealsStore";
import { MealWithAdditionalFields } from "@/lib/types";
import Image from "next/image";
import React from "react";

interface IMealComponentProps {
  meal: MealWithAdditionalFields;
  children?: React.ReactNode;
}

export function MealComponent({ meal, children }: IMealComponentProps) {
  const selectedMeals = useMealsStore((state) => state.selectedMeals);
  const selectedDrinks = selectedMeals.find(
    (item) => item.meal === meal
  )?.drinks;

  const numberOfMeals =
    meal.starter && meal.desert ? 3 : meal.starter || meal.desert ? 2 : 1;

  const hasDrinks = meal.drinks.length > 0;

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="flex flex-col self-center justify-center">
        <Image
          alt={meal.title}
          src={meal.img}
          width={200}
          height={200}
          className="w-32 h-32 lg:w-full lg:h-full"
        />
      </div>
      <div className="sm:ml-6 flex flex-col gap-1 lg:gap-2 w-full">
        <p className="text-sm">
          {numberOfMeals} course meal {hasDrinks && "+ drink"}
        </p>
        <h2 className="text-xl font-semibold">{meal.title}</h2>
        <div className="text-sm">
          {meal.starter && <p>Starter: {meal.starter}</p>}
          {meal.desert && <p>Desert: {meal.desert}</p>}
          {selectedDrinks && selectedDrinks?.length > 0 && (
            <p>
              Selected drink:
              {selectedDrinks?.map((drink, idx) =>
                idx !== selectedDrinks.length - 1 ? (
                  <React.Fragment key={drink}>{drink}, </React.Fragment>
                ) : (
                  <React.Fragment key={drink}>{drink}</React.Fragment>
                )
              )}
            </p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
