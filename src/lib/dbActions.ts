import { prisma } from "@/lib/prisma";

export const getDrinkById = async (drinkId: string) => {
  return prisma.drink.findFirst({
    where: {
      id: drinkId,
    },
  });
};
