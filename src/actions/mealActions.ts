"use server";

import { prisma } from "@/lib/prisma/prisma";
import {
  DrinkDataTypeWhenConnecting,
  LabelDataTypeWhenConnecting,
} from "@/lib/types";
import { getErrorMessage } from "@/lib/utils";
import {
  drinkDataSchema,
  labelDataSchema,
  mealDataSchema,
} from "@/lib/zodSchemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createMealAction = async (formData: FormData) => {
  try {
    const [validatedFormData, validatedLabelData, validatedDrinkData] =
      await getValidatedFormData(formData);

    await prisma.meal.create({
      data: {
        title: validatedFormData.title,
        starter: validatedFormData.starter,
        desert: validatedFormData.desert,
        price: validatedFormData.price,
        img: validatedFormData.img,
        labels: {
          create: validatedLabelData,
        },
        drinks: {
          create: validatedDrinkData,
        },
      },
    });
  } catch (e) {
    return { error: getErrorMessage(e) };
  }

  revalidatePath("/admin");
};

export const updateMealAction = async (formData: FormData, mealId: string) => {
  try {
    const labelData = getLabelDataForConnecting(formData);
    const drinksToAdd = await getDrinkDataForConnecting(formData, mealId);

    const existingLabelsFromMeal = await prisma.label.findMany({
      where: {
        meals: {
          some: {
            mealId: mealId,
          },
        },
      },
    });

    const labelsToAdd = labelData.slice(existingLabelsFromMeal.length);

    const [validatedFormData, validatedLabelData, validatedDrinkData] =
      await getValidatedFormData(formData, labelsToAdd);

    await prisma.meal.update({
      where: {
        id: mealId,
      },
      data: {
        title: validatedFormData.title,
        starter: validatedFormData.starter,
        desert: validatedFormData.desert,
        price: validatedFormData.price,
        img: validatedFormData.img,
        labels: {
          create: validatedLabelData,
        },
        drinks: {
          create: validatedDrinkData,
        },
      },
    });
  } catch (e) {
    return { error: getErrorMessage(e) };
  }

  revalidatePath("/admin");
};

export const deleteMealAction = async (formData: FormData, mealId: string) => {
  try {
    await deleteAllConnectedLabelsAndDrinks(mealId);

    await prisma.meal.delete({
      where: {
        id: mealId,
      },
    });
  } catch (e) {
    return { error: getErrorMessage(e) };
  }

  revalidatePath("/admin");
};

export const getValidatedFormData = async (
  formData: FormData,
  customLabels?: LabelDataTypeWhenConnecting[]
) => {
  const labelData = customLabels ?? getLabelDataForConnecting(formData);
  const drinkData = await getDrinkDataForConnecting(formData);

  const validatedFormData = mealDataSchema.parse({
    title: formData.get("title") as string,
    starter: formData.get("starter") as string,
    desert: formData.get("desert") as string,
    price: Number(formData.get("price")),
    img: formData.get("image") as string,
  });

  const validatedLabelData = labelDataSchema.parse(labelData);
  const validatedDrinkData = drinkDataSchema.parse(drinkData);

  return [validatedFormData, validatedLabelData, validatedDrinkData] as const;
};

const getLabelDataForConnecting = (
  formData: FormData
): LabelDataTypeWhenConnecting[] => {
  const labelData: Record<string, string> = {};

  for (const [name, value] of formData.entries()) {
    if (name.includes("label")) labelData[name as string] = value as string;
  }

  return Object.values(labelData)
    .filter((name) => name.trim())
    .map((name) => {
      return {
        label: {
          connectOrCreate: {
            where: { name },
            create: { name },
          },
        },
      };
    });
};

const getDrinkDataForConnecting = async (
  formData: FormData,
  mealId?: string
): Promise<DrinkDataTypeWhenConnecting[]> => {
  const drinkData: Record<string, string> = {};

  for (const [name, value] of formData.entries()) {
    if (name.includes("drink") && value.toString().trim())
      drinkData[name as string] = value as string;
  }

  const numberOfDrinks = Object.entries(drinkData).filter(([key, value]) =>
    key.includes("title")
  ).length;

  const existingDrinksFromMeal = mealId
    ? await prisma.drink.findMany({
        where: {
          meals: {
            some: {
              mealId: mealId,
            },
          },
        },
      })
    : [];

  return Array.from({
    length: numberOfDrinks,
  }).map((_, idx) => {
    const currentIndex = idx + existingDrinksFromMeal.length;

    return {
      drink: {
        connectOrCreate: {
          where: {
            title: formData.get(`drink-title${currentIndex}`) as string,
          },
          create: {
            title: formData.get(`drink-title${currentIndex}`) as string,
            img: formData.get(`drink-img${currentIndex}`) as string,
            price: Number(formData.get(`drink-price${currentIndex}`)),
          },
        },
      },
    };
  });
};

const deleteAllConnectedLabelsAndDrinks = async (mealId: string) => {
  await prisma.mealLabel.deleteMany({
    where: {
      mealId,
    },
  });
  const labelsToDelete = await prisma.label.findMany({
    where: {
      meals: {
        none: {},
      },
    },
  });
  await prisma.label.deleteMany({
    where: {
      id: {
        in: labelsToDelete.map((label) => label.id),
      },
    },
  });

  await prisma.drinkMeal.deleteMany({
    where: {
      mealId,
    },
  });
  const drinksToDelete = await prisma.drink.findMany({
    where: {
      meals: {
        none: {},
      },
    },
  });
  await prisma.drink.deleteMany({
    where: {
      id: {
        in: drinksToDelete.map((drink) => drink.id),
      },
    },
  });
};
