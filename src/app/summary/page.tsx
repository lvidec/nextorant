"use client";

import { HorizontalLine } from "@/components/HorizontalLine";
import { MealComponent } from "@/components/MealComponent";
import { buttonVariants } from "@/components/ui/button";
import { useMealsStore } from "@/lib/store/mealsStore";
import Link from "next/link";
import React from "react";

export default function Summary() {
  const selectedMeals = useMealsStore((state) => state.selectedMeals);
  const totalPrice = useMealsStore((state) => state.totalPrice);

  return (
    <div className="flex flex-col gap-6">
      <Link href={"/"} className={buttonVariants({ variant: "secondary" })}>
        <span className="text-xl">Go to main route</span>
      </Link>
      <div className="text-3xl text-center">
        {selectedMeals.length > 0 ? (
          <>
            <h2> Total price for all meals: </h2>
            <h2>{totalPrice.toFixed(2)} €</h2>
          </>
        ) : (
          <>
            <h2>
              No currently selected meals <br />
              Go to main route to take something for
              your tummy
            </h2>
          </>
        )}
      </div>
      {selectedMeals
        .map((meal) => meal.meal)
        .map((meal, idx) => (
          <React.Fragment key={meal.id}>
            <HorizontalLine className="my-1" />
            <MealComponent meal={meal} />
          </React.Fragment>
        ))}
    </div>
  );
}
