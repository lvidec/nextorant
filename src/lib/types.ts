import { Drink, Label, Meal } from "@/prisma/generated/client";

export type MealWithAdditionalFields = Meal & { drinks: MealDrinks } & {
  labels: MealLabels;
};

// export type MealWithAdditionalFields = Meal & MealDrinks & MealLabels;

export type MealDrinks = { drink: Drink }[];
export type MealLabels = { label: Label }[];
