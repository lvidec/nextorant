"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MealDrinks } from "@/lib/types";
import { RestorantDrink } from "@/prisma/generated/client";
import { useState } from "react";
import { OperateNumOfFieldsButton } from "@/app/admin/_form/OperateNumOfFieldsButton";

interface DrinksFieldsProps {
  drinks: MealDrinks | undefined;
}

export const DrinksFields = ({ drinks }: DrinksFieldsProps) => {
  const numOfSelectedDrinks = drinks?.length ?? 0;
  const [numOfDrinks, setNumOfDrinks] = useState<number>(numOfSelectedDrinks);

  return (
    <div>
      <Label htmlFor="new-meal-drink">
        Drink{numOfSelectedDrinks > 1 ? "s" : ""}
      </Label>
      {drinks?.map((item, idx) => {
        const drink = item.drink;

        return <DrinkInputs key={idx} idx={idx} drink={drink} />;
      })}
      {numOfSelectedDrinks < 3 && Array.from({ length: numOfDrinks - numOfSelectedDrinks + 1 }).map(
        (_, idx) => {
          const currentIndex = idx + numOfSelectedDrinks;
          return <DrinkInputs key={currentIndex} idx={currentIndex} />;
        }
      )}
      <OperateNumOfFieldsButton
        numOfSelectedFields={numOfSelectedDrinks}
        numOfFields={numOfDrinks}
        setNumOfFields={setNumOfDrinks}
      />
    </div>
  );
};

const DrinkInputs = ({ idx, drink }: { idx: number; drink?: RestorantDrink }) => {
  return (
    <div key={idx} className="flex gap-4 mb-2">
      <Input
        id="new-meal-drink"
        placeholder={`Enter drink title ${idx > 0 ? `#${idx + 1}` : ""}`}
        disabled={!!drink?.title}
        defaultValue={drink?.title ?? ""}
        name={`drink-title${idx}`}
      />
      <Input
        placeholder={`Enter drink image URL ${idx > 0 ? `#${idx + 1}` : ""}`}
        disabled={!!drink?.img}
        defaultValue={drink?.img ?? ""}
        name={`drink-img${idx}`}
      />
      <Input
        placeholder={`Enter drink price ${idx > 0 ? `#${idx + 1}` : ""}`}
        type="number"
        step=".01"
        disabled={!!drink?.price}
        defaultValue={drink?.price}
        name={`drink-price${idx}`}
      />
    </div>
  );
};
