import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export const mealDataSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Meal title should be at least 3 characters long." }),
  starter: z.string().optional(),
  desert: z.string().optional(),
  price: z.number().min(1, { message: "Meal price should be at least 1 euro" }),
  img: z
    .string()
    .min(12, { message: "Meal image should be at least 12 characters long." }),
});

export const labelDataSchema = z.array(
  z.object({
    label: z.object({
      connectOrCreate: z.object({
        where: z.object({
          name: z.string().min(3, {
            message: "Label name should be at least 3 characters long.",
          }),
        }),
        create: z.object({
          name: z.string().min(3, {
            message: "Label name should be at least 3 characters long.",
          }),
        }),
      }),
    }),
  })
);

export const drinkDataSchema = z.array(
  z.object({
    drink: z.object({
      connectOrCreate: z.object({
        where: z.object({
          title: z.string().min(3, {
            message: "Drink title should be at least 3 characters long.",
          }),
        }),
        create: z.object({
          title: z.string().min(3, {
            message: "Drink title should be at least 3 characters long.",
          }),
          img: z.string().min(12, {
            message: "Drink image should be at least 12 characters long.",
          }),
          price: z
            .number()
            .min(1, { message: "Drink price should be at least 1 euro" }),
        }),
      }),
    }),
  })
);
