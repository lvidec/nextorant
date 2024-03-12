"use client";

import { HorizontalLine } from "@/components/HorizontalLine";
import { MealComponent } from "@/components/MealComponent";
import { useLabelsStore } from "@/lib/store/labelsStore";
import { MealWithAdditionalFields } from "@/lib/types";
import React from "react";
import { MealSelect } from "@/components/MealSelect";

interface IMealSelectionProps {
  meals: MealWithAdditionalFields[];
}

export function MealSelection({ meals }: IMealSelectionProps) {
  const activeLabelId = useLabelsStore((state) => state.selectedLabel);

  const filteredMeals = !activeLabelId
    ? meals
    : meals.filter((meal) =>
        meal.labels.some((label) => label.label.id === activeLabelId)
      );

  return (
    <div className="mx-4">
      {filteredMeals.map((meal) => (
        <React.Fragment key={meal.id}>
          <MealComponent meal={meal}>
            <MealSelect meal={meal} />
          </MealComponent>
          <HorizontalLine />
        </React.Fragment>
      ))}
    </div>
  );
}
