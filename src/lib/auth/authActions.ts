"use server";

import { prisma } from "@/lib/prisma/prisma";
import { User } from "@/prisma/generated/client";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { signUpSchema } from "@/lib/zodSchemas";

interface SignUpFormState {
  errors: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
}

export async function signUp(
  formState: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const result = signUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const isEmailExists = await findUserByEmail(result.data.email);

  if (isEmailExists) {
    return {
      errors: {
        email: ["Email already exists"],
      },
    };
  }

  const hashed = await generatePasswordHash(result.data.password);

  let user: User;
  try {
    user = await prisma.user.create({
      data: {
        email: result.data.email,
        password: hashed,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  redirect("/");
}

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
};

const generatePasswordHash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(password, salt);
};
