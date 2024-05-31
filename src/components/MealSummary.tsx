"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { useMealsStore } from "@/lib/store/mealsStore";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { sendGAEvent, sendGTMEvent } from "@next/third-parties/google";

export function MealSummary() {
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const selectedMeals = useMealsStore((state) => state.selectedMeals);
  const totalPrice = useMealsStore((state) => state.totalPrice);
  const removeMealFromIndex = useMealsStore(
    (state) => state.removeMealFromIndex
  );

  const numOfSelectedMeals = selectedMeals.length;

  return (
    <div className="w-full lg:w-96 bg-gray-100 p-4 rounded-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Select meal</h2>
      </div>
      <div className="flex flex-col space-y-2 mb-4">
        {Array.from({ length: numberOfGuests }).map((_, idx) => (
          <div key={idx} className="flex justify-end gap-2">
            <SelectMealButton
              index={idx}
              numOfSelectedMeals={numOfSelectedMeals}
            />
            {idx < numOfSelectedMeals && (
              <Button
                className="w-12"
                disabled={numberOfGuests < 2}
                onClick={() => {
                  removeMealFromIndex(idx);
                  setNumberOfGuests((prev) => prev - 1);
                }}
              >
                <span className="text-xl">-</span>
              </Button>
            )}
          </div>
        ))}
        <div className="mt-12">
          <Button
            className="w-full"
            disabled={numberOfGuests >= 4}
            onClick={() => setNumberOfGuests((prev) => prev + 1)}
          >
            <span className="text-xl">+</span>
          </Button>
        </div>
      </div>
      {totalPrice > 0 && (
        <div className="flex flex-col mt-4">
          <p className="text-sm">Total for:</p>
          {selectedMeals.map((meal, idx) => {
            const currentMeal = meal.meal;
            return (
              <div key={currentMeal.title + idx}>
                <p>
                  {currentMeal.title}
                  {meal.drinks.length > 0
                    ? ` (${meal.drinks.join(", ")}): `
                    : ": "}
                  {meal.fullPrice.toFixed(2) + " €"}
                </p>
              </div>
            );
          })}
          <span className="text-lg font-bold">{totalPrice.toFixed(2)} €</span>
        </div>
      )}
      {!!numOfSelectedMeals && (
        <>
          <Button
            onClick={() => {
              sendGAEvent({
                event: "GM Send this button to the sky",
                value: selectedMeals.map((meal) => meal.meal.title),
              })
              sendGTMEvent({
                event: "GTM Send this button to the sky",
                value: selectedMeals.map((meal) => meal.meal.title),
              });
            }}
          >
            send this button to the sky
          </Button>
          <Link
            href={"/summary"}
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "m-auto block mt-4"
            )}
            onClick={() => {
              sendGTMEvent({
                event: "Go to summary GTM event",
                value: selectedMeals.map((meal) => meal.meal.title),
              });
            }}
          >
            <span className="text-xl">Go to summary</span>
          </Link>
        </>
      )}
    </div>
  );
}

interface SelectMealButtonProps {
  index: number;
  numOfSelectedMeals: number;
}

export function SelectMealButton({
  index,
  numOfSelectedMeals,
}: SelectMealButtonProps) {
  const [hasSelectionBegan, setHasSelectionBegan] = useState(false);

  const canSelectMeal = useMealsStore((state) => state.canSelectMeal);
  const setCanSelectMeal = useMealsStore((state) => state.setCanSelectMeal);
  const selectedMeals = useMealsStore((state) => state.selectedMeals);

  const isSelectingMeal =
    hasSelectionBegan && canSelectMeal && numOfSelectedMeals === index;

  return (
    <div className="flex justify-between items-center w-full">
      <p className="text-sm">Adult {index + 1}</p>
      <Button
        variant="outline"
        disabled={numOfSelectedMeals > index}
        className={cn({
          "bg-amber-500/50 hover:bg-amber-500/30": isSelectingMeal,
        })}
        onClick={() => {
          setHasSelectionBegan(!hasSelectionBegan);
          setCanSelectMeal(!canSelectMeal);
        }}
      >
        {isSelectingMeal
          ? "Selecting meal..."
          : numOfSelectedMeals > index
          ? selectedMeals[index]?.meal.title
          : "Select"}
      </Button>
    </div>
  );
}
