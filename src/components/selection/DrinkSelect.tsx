"use client";

import { Button } from "@/components/ui/button";
import { useMealsStore } from "@/lib/store/mealsStore";
import { cn } from "@/lib/utils";
import { RestorantDrink } from "@/prisma/generated/client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IDrinkSelectProps {
  drink: RestorantDrink;
  handleDrinkSelection: (
    isActive: boolean,
    drinkTitle: string,
    price: number
  ) => void;
}

export function DrinkSelect({
  drink,
  handleDrinkSelection,
}: IDrinkSelectProps) {
  const [isActive, setIsActive] = useState(false);
  const canSelectMeal = useMealsStore((state) => state.canSelectMeal);

  useEffect(() => {
    setIsActive(!canSelectMeal);
  }, [canSelectMeal]);

  const handleDrinkSelect = () => {
    const newIsActive = !isActive;
    setIsActive(newIsActive);

    handleDrinkSelection(newIsActive, drink.title, drink.price);
  };

  return (
    <Button
      variant={"ghost"}
      disabled={!canSelectMeal}
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
