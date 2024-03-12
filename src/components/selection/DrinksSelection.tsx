import { DrinkSelect } from "@/components/selection/DrinkSelect";
import { MealDrinks } from "@/lib/types";
import React from "react";

interface IDrinkSelectionProps {
  drinks: MealDrinks;
  handleDrinkSelection: (
    isActive: boolean,
    drinkTitle: string,
    price: number
  ) => void;
  selectedDrinks: string[];
}

export function DrinksSelection({
  drinks,
  handleDrinkSelection,
  selectedDrinks,
}: IDrinkSelectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        {drinks.map((item) => (
          <DrinkSelect
            key={item.drink.id}
            drink={item.drink}
            handleDrinkSelection={handleDrinkSelection}
          />
        ))}
      </div>
      {selectedDrinks.length > 0 && (
        <p>
          Selected drink:&nbsp;
          {selectedDrinks.map((drink, idx) => {
            const currentDrink = drink;

            return idx !== selectedDrinks.length - 1 ? (
              <React.Fragment key={currentDrink}>
                {currentDrink},
              </React.Fragment>
            ) : (
              <React.Fragment key={currentDrink}>{currentDrink}</React.Fragment>
            );
          })}
        </p>
      )}
    </div>
  );
}
