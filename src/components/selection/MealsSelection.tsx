"use client";

import { HorizontalLine } from "@/components/HorizontalLine";
import { MealComponent } from "@/components/MealComponent";
import { MealSelect } from "@/components/selection/MealSelect";
import { useLabelsStore } from "@/lib/store/labelsStore";
import { MealWithAdditionalFields } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import React from "react";
import { PaginationSelect } from "@/components/PaginationSelect";

interface IMealSelectionProps {
  meals: MealWithAdditionalFields[];
}

export const DEFAULT_PER_PAGE = 2;

export function MealSelection({ meals }: IMealSelectionProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const perPage = Number(searchParams.get("per_page")) || DEFAULT_PER_PAGE;

  const start = (currentPage - 1) * perPage;
  const end = start + perPage > meals.length ? meals.length : start + perPage;

  const activeLabelId = useLabelsStore((state) => state.selectedLabel);

  const filteredMeals = !activeLabelId
    ? meals
    : meals.filter((meal) =>
        meal.labels.some((label) => label.label.id === activeLabelId)
      );

  const slicedMeals = filteredMeals.slice(start, end);

  return (
    <>
      <div>
        {slicedMeals.map((meal) => (
          <React.Fragment key={meal.id}>
            <MealComponent meal={meal}>
              <MealSelect meal={meal} />
            </MealComponent>
            <HorizontalLine />
          </React.Fragment>
        ))}
      </div>
      <PaginationSelect
        meals={filteredMeals}
        currentPage={currentPage}
        perPage={perPage}
      />
    </>
  );
}
