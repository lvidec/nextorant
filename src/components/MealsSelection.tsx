"use client";

import { MealWithAdditionalFields } from "@/lib/types";
import Image from "next/image";
import React, { useState } from "react";
import { HorizontalLine } from "@/components/HorizontalLine";
import { DrinksSelection } from "@/components/DrinksSelection";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IMealSelectionProps {
  meals: MealWithAdditionalFields[];
  activeLabelId: string;
  canSelectMeal: boolean;
  handleMealSelection: (
    isSelectButtonActive: boolean,
    mealTitle: string,
    mealPrice: number
  ) => void;
}

export function MealSelection({
  meals,
  activeLabelId,
  canSelectMeal,
  handleMealSelection,
}: IMealSelectionProps) {
  const filteredMeals = !activeLabelId
    ? meals
    : meals.filter((meal) =>
        meal.labels.some((label) => label.label.id === activeLabelId)
      );

  return (
    <div className="mx-4">
      {filteredMeals.map((meal) => (
        <React.Fragment key={meal.id}>
          <MealComponent
            meal={meal}
            canSelectMeal={canSelectMeal}
            handleMealSelection={handleMealSelection}
          />
          <HorizontalLine />
        </React.Fragment>
      ))}
    </div>
  );
}

interface IMealProps {
  meal: MealWithAdditionalFields;
  canSelectMeal: boolean;
  handleMealSelection: (
    isSelectButtonActive: boolean,
    mealTitle: string,
    mealPrice: number
  ) => void;
}

export function MealComponent({
  meal,
  canSelectMeal,
  handleMealSelection,
}: IMealProps) {
  const [selectedDrinks, setSelectedDrinks] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(meal.price);
  const [isSelectButtonActive, setIsSelectButtonActive] = useState(false);

  const uniqueSelectedDrinks = [...new Set(selectedDrinks)];

  const handleDrinkSelect = (
    isActive: boolean,
    drinkTitle: string,
    price: number
  ) => {
    setTotalPrice((prev) => (isActive ? prev + price : prev - price));

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
            // canSelectDrink={canSelectMeal && isSelectButtonActive}
            canSelectDrink={canSelectMeal}
            handleDrinkSelection={handleDrinkSelect}
          />
          <div>
            <p>{totalPrice.toFixed(2)} €</p>
            <Button
              variant={"outline"}
              className={cn("px-6 py-3 border-sky-700 text-sky-700", {
                "bg-sky-700/20 hover:bg-sky-700/30": isSelectButtonActive,
              })}
              disabled={!canSelectMeal}
              onClick={() => {
                setIsSelectButtonActive(!isSelectButtonActive);
                handleMealSelection(!isSelectButtonActive, meal.title, totalPrice);
              }}
            >
              {isSelectButtonActive ? "Selected" : "Select"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
