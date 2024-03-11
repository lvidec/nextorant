import { prisma } from "@/lib/prisma";
import { MealWithAdditionalFields } from "@/lib/types";
import { Drink, Label } from "@/prisma/generated/client";

export const getMealsWithEverything = async (): Promise<
  MealWithAdditionalFields[]
> => {
  return await prisma.meal.findMany({
    include: {
      drinks: {
        select: {
          drink: true,
        },
      },
      labels: {
        select: {
          label: true,
        },
      },
    },
  });
};

export const getAllLabels = async (): Promise<Label[]> => {
  return await prisma.label.findMany();
};

export const getDrinkById = async (drinkId: string): Promise<Drink | null> => {
  return prisma.drink.findFirst({
    where: {
      id: drinkId,
    },
  });
};
