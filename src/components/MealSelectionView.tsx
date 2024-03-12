import { HorizontalLine } from "@/components/HorizontalLine";
import { MealSummary } from "@/components/MealSummary";
import { LabelSelection } from "@/components/selection/LabelSelection";
import { MealSelection } from "@/components/selection/MealsSelection";
import { MealWithAdditionalFields } from "@/lib/types";
import { Label } from "@/prisma/generated/client";

interface MealSelectionViewProps {
  meals: MealWithAdditionalFields[];
  labels: Label[];
}

export function MealSelectionView({ meals, labels }: MealSelectionViewProps) {
  return (
    <div className="flex w-full">
      <div className="mx-8 my-4 w-full basis-3/5">
        <LabelSelection labels={labels} />
        <HorizontalLine className="mx-4" />
        <MealSelection meals={meals} />
      </div>
      <MealSummary />
    </div>
  );
}
