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
    <div className="mt-4 flex flex-col lg:flex-row lg:justify-center w-full">
      <div className="my-4 w-full lg:basis-3/5 mr-4">
        <LabelSelection labels={labels} />
        <HorizontalLine />
        <MealSelection meals={meals} />
      </div>
      <MealSummary />
    </div>
  );
}
