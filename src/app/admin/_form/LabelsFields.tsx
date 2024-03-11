"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MealLabels } from "@/lib/types";
import { useState } from "react";
import { OperateNumOfFieldsButton } from "@/app/admin/_form/OperateNumOfFieldsButton";

interface LabelsFieldsProps {
  labels: MealLabels | undefined;
}

export const LabelsFields = ({ labels }: LabelsFieldsProps) => {
  const numOfSelectedLabels = labels?.length ?? 0;
  const [numOfLabels, setNumOfLabels] = useState<number>(numOfSelectedLabels);

  return (
    <div>
      <Label htmlFor="new-meal-img">
        Label{numOfSelectedLabels > 1 ? "s" : ""}
      </Label>
      {labels?.map((item, idx) => {
        const label = item.label;

        return (
          <Input
            key={label.id}
            id="new-meal-img"
            placeholder={`Enter label ${idx > 0 ? `#${idx + 1}` : ""}`}
            className="mb-2"
            disabled={true}
            defaultValue={label.name}
            name={`label${idx}`}
          />
        );
      })}
      {numOfSelectedLabels < 3 &&
        Array.from({ length: numOfLabels - numOfSelectedLabels + 1 }).map(
          (_, idx) => {
            const currentIndex = idx + numOfSelectedLabels;
            return (
              <Input
                key={currentIndex}
                id="new-meal-img"
                placeholder={`Enter label ${
                  currentIndex > 0 ? `#${currentIndex + 1}` : ""
                }`}
                className="mb-2"
                name={`label${currentIndex}`}
              />
            );
          }
        )}
      <OperateNumOfFieldsButton
        numOfSelectedFields={numOfSelectedLabels}
        numOfFields={numOfLabels}
        setNumOfFields={setNumOfLabels}
      />
    </div>
  );
};
