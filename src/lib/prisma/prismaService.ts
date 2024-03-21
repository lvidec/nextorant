import { prisma } from "@/lib/prisma/prisma";
import { MealWithAdditionalFields } from "@/lib/types";
import { RestorantDrink, RestorantLabel } from "@/prisma/generated/client";

export const getMealsWithEverything = async (): Promise<
  MealWithAdditionalFields[]
> => {
  return await prisma.restorantMeal.findMany({
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

export const getAllLabels = async (): Promise<RestorantLabel[]> => {
  return await prisma.restorantLabel.findMany();
};

export const getDrinkById = async (drinkId: string): Promise<RestorantDrink | null> => {
  return prisma.restorantDrink.findFirst({
    where: {
      id: drinkId,
    },
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.restorantUser.findFirst({
    where: {
      email,
    },
  });
};