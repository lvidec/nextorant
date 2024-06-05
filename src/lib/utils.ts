import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof z.ZodError) {
    message = "";
    error.issues.forEach((issue) => {
      message = message + issue.path[0] + ": " + issue.message + ". ";
    });
  } else if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};

export const generatePageHref = (page: number, perPage: number) =>
  `?page=${page}&per_page=${perPage}`;

// export function encodeImage(image: string) {
//   return new Promise((resolve, _) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const imageData = e.target?.result;
//       console.log("imageData: ", imageData);
//     };
//     reader.readAsDataURL(image);
//   });
// }
