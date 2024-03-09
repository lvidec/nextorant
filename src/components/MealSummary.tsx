import { Button } from "@/components/ui/button";
import { useMealsStore } from "@/lib/store/mealsStore";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function MealSummary() {
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const selectedMeals = useMealsStore((state) => state.selectedMeals);
  const totalPrice = useMealsStore((state) => state.totalPrice);

  const numOfSelectedMeals = Object.values(selectedMeals)
    .map((value) => value.count)
    .reduce((c1, c2) => {
      return c1 + c2;
    }, 0);

  return (
    <div className="w-full lg:w-96 bg-gray-100 p-4 rounded-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Select meal</h2>
      </div>
      <div className="flex flex-col space-y-2 mb-4">
        {Array.from({ length: numberOfGuests }).map((_, idx) => (
          <SelectMealButton
            key={idx}
            index={idx}
            numOfSelectedMeals={numOfSelectedMeals}
          />
        ))}
        <div className="flex justify-end gap-2 my-4">
          <Button
            className="w-12"
            disabled={
              numberOfGuests >= 4 || numberOfGuests !== numOfSelectedMeals
            }
            onClick={() => setNumberOfGuests((prev) => prev + 1)}
          >
            <span className="text-xl">+</span>
          </Button>
        </div>
      </div>
      {totalPrice > 0 && (
        <div className="flex flex-col mt-4">
          <p className="text-sm">Total for:</p>
          {Object.entries(selectedMeals).map(([key, value]) => (
            <div key={key}>
              <p>
                {key}
                {value.count > 1 && ` (x${value.count})`}: &nbsp;
                {value.totalPrice.toFixed(2) + " €"}
              </p>
            </div>
          ))}
          <span className="text-lg font-bold">{totalPrice.toFixed(2)} €</span>
        </div>
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

  const isSelectingMeal = hasSelectionBegan && canSelectMeal && numOfSelectedMeals === index;

  return (
    <div className="flex justify-between items-center">
      <p className="text-sm">Adult {index + 1}</p>
      <Button
        variant="outline"
        disabled={hasSelectionBegan}
        className={cn({
          "bg-amber-500/50 hover:bg-amber-500/30":
            isSelectingMeal,
        })}
        onClick={() => {
          setHasSelectionBegan(!hasSelectionBegan);
          setCanSelectMeal(!canSelectMeal);
        }}
      >
        {isSelectingMeal
          ? "Selecting meal..."
          : numOfSelectedMeals > index
          ? "Selected"
          : "Select"}
      </Button>
    </div>
  );
}
