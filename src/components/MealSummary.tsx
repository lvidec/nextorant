import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface MealSummaryProps {
  selectedMeals: string[];
  totalPrice: number;
  canSelectMeal: boolean;
  setCanSelectMeal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MealSummary({
  selectedMeals,
  totalPrice,
  canSelectMeal,
  setCanSelectMeal,
}: MealSummaryProps) {
  const [numberOfGuests, setNumberOfGuests] = useState(1);

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
            canSelectMeal={canSelectMeal}
            setCanSelectMeal={setCanSelectMeal}
          />
        ))}
        <div className="flex justify-end gap-2 my-4">
          <Button
            className="w-12"
            disabled={numberOfGuests >= 4}
            onClick={() => setNumberOfGuests((prev) => prev + 1)}
          >
            <span className="text-xl">+</span>
          </Button>
          <Button
            className="w-12"
            disabled={numberOfGuests <= 1}
            onClick={() => setNumberOfGuests((prev) => prev - 1)}
          >
            <span className="text-xl">-</span>
          </Button>
        </div>
      </div>
      {totalPrice > 0 && (
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm">Total for all passengers:</p>
          <span className="text-lg font-bold">{totalPrice.toFixed(2)} €</span>
        </div>
      )}
    </div>
  );
}

interface SelectMealButtonProps {
  index: number;
  canSelectMeal: boolean;
  setCanSelectMeal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SelectMealButton({
  index,
  canSelectMeal,
  setCanSelectMeal,
}: SelectMealButtonProps) {
  const [hasSelectionBegan, setHasSelectionBegan] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <p className="text-sm">Adult {index + 1}</p>
      <Button
        variant="outline"
        className={cn({
          "bg-amber-500/50 hover:bg-amber-500/30": hasSelectionBegan,
        })}
        onClick={() => {
          setHasSelectionBegan(!hasSelectionBegan);
          setCanSelectMeal(!canSelectMeal);
        }}
      >
        {hasSelectionBegan ? "Selecting meal..." : "Select meal"}
      </Button>
    </div>
  );
}
