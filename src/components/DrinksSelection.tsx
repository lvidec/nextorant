"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Drink } from "@/prisma/generated/client";
import { MealDrinks } from "@/lib/types";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface IDrinkSelectionProps {
  drinks: MealDrinks;
  canSelectDrink: boolean;
  handleDrinkSelection: (
    isActive: boolean,
    drinkTitle: string,
    price: number
  ) => void;
}

export function DrinksSelection({
  drinks,
  canSelectDrink,
  handleDrinkSelection,
}: IDrinkSelectionProps) {
  return (
    <div className="flex gap-4">
      {drinks.map((item) => (
        <DrinkComponent
          key={item.drink.id}
          drink={item.drink}
          canSelectDrink={canSelectDrink}
          handleDrinkSelection={handleDrinkSelection}
        />
      ))}
    </div>
  );
}

interface IDrinkProps {
  drink: Drink;
  canSelectDrink: boolean;
  handleDrinkSelection: (
    isActive: boolean,
    drinkTitle: string,
    price: number
  ) => void;
}

export function DrinkComponent({ drink, canSelectDrink, handleDrinkSelection }: IDrinkProps) {
  const [isActive, setIsActive] = useState(false);

  const handleDrinkSelect = () => {
    const newIsActive = !isActive;
    setIsActive(newIsActive);

    handleDrinkSelection(newIsActive, drink.title, drink.price);
  };

  return (
    <Button
      variant={"ghost"}
      disabled={!canSelectDrink}
      key={drink.id}
      className={cn("p-1 w-12 h-16", { "border-2 border-sky-700": isActive })}
      onClick={handleDrinkSelect}
    >
      <Image
        key={drink.id}
        alt={drink.title}
        src={drink.img}
        width={50}
        height={50}
        className="w-full h-full"
      />
    </Button>
  );
}
