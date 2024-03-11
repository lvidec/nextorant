import { FormButton } from "@/app/admin/_form/FormButton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { MealWithAdditionalFields } from "@/lib/types";
import Image from "next/image";
import { RxCrossCircled } from "react-icons/rx";

interface MealTableRowProps {
  meal: MealWithAdditionalFields;
}

export function MealTableRow({ meal }: MealTableRowProps) {
  const allLabels = meal.labels.map((label) => label.label.name).join(", ");
  const allDrinks = meal.drinks.map((drink) => drink.drink.title).join(", ");

  return (
    <TableBody key={meal.id}>
      <TableRow>
        <TableCell>
          <Image
            alt={meal.title}
            className="aspect-square rounded-md object-cover"
            height="100"
            src={meal.img}
            width="100"
            priority={true}
          />
        </TableCell>
        <TableCell className="font-semibold">{meal.title}</TableCell>
        <TableCell>
          {meal.starter || <RxCrossCircled className="w-6 h-6" />}
        </TableCell>
        <TableCell>
          {meal.desert || <RxCrossCircled className="w-6 h-6" />}
        </TableCell>
        <TableCell>{allDrinks}</TableCell>
        <TableCell>{allLabels}</TableCell>
        <TableCell>{meal.price}</TableCell>
        <TableCell className="text-end">
          <FormButton actionType="update" meal={meal} />
          <FormButton actionType="delete" meal={meal} />
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
