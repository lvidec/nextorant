import { Drink, Label, Meal } from "@/prisma/generated/client";

export type MealWithAdditionalFields = Meal & { drinks: MealDrinks } & {
  labels: MealLabels;
};

export type MealDrinks = { drink: Drink }[];
export type MealLabels = { label: Label }[];

export type LabelWithIsActive = Label & { isActive: boolean };
