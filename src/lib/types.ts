import { RestorantDrink, RestorantLabel, RestorantMeal } from "@/prisma/generated/client";

export type MealWithAdditionalFields = RestorantMeal & { drinks: MealDrinks } & {
  labels: MealLabels;
};

export type MealDrinks = { drink: RestorantDrink }[];
export type MealLabels = { label: RestorantLabel }[];

export type LabelWithIsActive = RestorantLabel & { isActive: boolean };

export type LabelDataTypeWhenConnecting = {
  label: {
    connectOrCreate: {
      where: {
        name: string;
      };
      create: {
        name: string;
      };
    };
  };
};
export type DrinkDataTypeWhenConnecting = {
  drink: {
    connectOrCreate: {
      where: {
        title: string;
      };
      create: {
        title: string;
        price: number;
        img: string;
      };
    };
  };
};

export type CloudflareWidgetStatus = 'solved' | 'error' | 'expired' | null;