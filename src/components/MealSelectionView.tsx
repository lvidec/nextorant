"use client";

import { Label } from "@/prisma/generated/client";
import { HorizontalLine } from "@/components/HorizontalLine";
import { LabelSelection } from "@/components/LabelSelection";
import { MealSelection } from "@/components/MealsSelection";
import { MealWithAdditionalFields } from "@/lib/types";
import { useState } from "react";
import { MealSummary } from "@/components/MealSummary";

interface MealSelectionViewProps {
  meals: MealWithAdditionalFields[];
  labels: Label[];
}

export function MealSelectionView({ meals, labels }: MealSelectionViewProps) {
  const [activeLabel, setActiveLabel] = useState("");
  const [mealsSelected, setMealsSelected] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [canSelectMeal, setCanSelectMeal] = useState(false);

  const handleLabelSelection = (isActive: boolean, labelId: string) => {
    setActiveLabel(isActive ? labelId : "");
  };

  const handleMealSelection = (
    canBeAdded: boolean,
    mealTitle: string,
    mealPrice: number
  ) => {
    setMealsSelected((prev) =>
      canBeAdded
        ? [...prev, mealTitle]
        : prev.filter((item) => item !== mealTitle)
    );
    setTotalPrice((prev) => (canBeAdded ? prev + mealPrice : prev - mealPrice));
  };

  return (
    <div className="flex">
      <div className="mx-8 my-4 w-full">
        <LabelSelection
          labels={labels}
          handleLabelSelection={handleLabelSelection}
        />
        <HorizontalLine />
        <MealSelection
          meals={meals}
          activeLabelId={activeLabel}
          canSelectMeal={canSelectMeal}
          handleMealSelection={handleMealSelection}
        />
      </div>
      <MealSummary
        selectedMeals={mealsSelected}
        totalPrice={totalPrice}
        canSelectMeal={canSelectMeal}
        setCanSelectMeal={setCanSelectMeal}
      />
    </div>
  );
}
