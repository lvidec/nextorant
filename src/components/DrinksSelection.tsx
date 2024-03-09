import { MealDrinks } from "@/lib/types";
import { DrinkSelect } from "@/components/DrinkSelect";

interface IDrinkSelectionProps {
  drinks: MealDrinks;
  handleDrinkSelection: (
    isActive: boolean,
    drinkTitle: string,
    price: number
  ) => void;
}

export function DrinksSelection({
  drinks,
  handleDrinkSelection,
}: IDrinkSelectionProps) {
  return (
    <div className="flex gap-4">
      {drinks.map((item) => (
        <DrinkSelect
          key={item.drink.id}
          drink={item.drink}
          handleDrinkSelection={handleDrinkSelection}
        />
      ))}
    </div>
  );
}
