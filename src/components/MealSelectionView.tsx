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

  const handleLabelSelection = (isActive: boolean, labelId: string) => {
    setActiveLabel(isActive ? labelId : "");
  };

  return (
    <div className="flex w-full">
      <div className="mx-8 my-4 w-full basis-3/5">
        <LabelSelection
          labels={labels}
          handleLabelSelection={handleLabelSelection}
        />
        <HorizontalLine />
        <MealSelection
          meals={meals}
          activeLabelId={activeLabel}
        />
      </div>
      <MealSummary
      />
    </div>
  );
}
