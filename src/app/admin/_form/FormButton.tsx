"use client";

import { deleteMealAction } from "@/actions/mealActions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useMealsStore } from "@/lib/store/mealsStore";
import { MealWithAdditionalFields } from "@/lib/types";
import { MdOutlineDeleteForever } from "react-icons/md";
import { TiEdit } from "react-icons/ti";

interface FormButtonProps {
  actionType: "delete" | "update";
  meal: MealWithAdditionalFields;
}

export function FormButton({ actionType, meal }: FormButtonProps) {
  const { toast } = useToast();
  const setSelectedMealInForm = useMealsStore(
    (state) => state.setSelectedMealInForm
  );

  return actionType === "update" ? (
    <form className="inline">
      <Button
        className="w-6 h-6 mt-2 mr-2 hover:bg-sky-700/25"
        size="icon"
        variant="ghost"
        onClick={(e) => {
          e.preventDefault();
          setSelectedMealInForm(meal);
        }}
      >
        <TiEdit className="w-8 h-8" />
        <span className="sr-only">Edit</span>
      </Button>
    </form>
  ) : (
    <form className="inline">
      <Button
        className="w-6 h-6 mt-2 hover:bg-red-700/25"
        size="icon"
        variant="ghost"
        onClick={() =>
          toast({
            title: `Deleting meal...`,
          })
        }
        formAction={async (formData) => {
          const response = await deleteMealAction(formData, 'meal.id');
          if (response?.error) {
            toast({
              title: response?.error,
              variant: "destructive",
            });
          } else {
            toast({
              title: `Meal is successfully deleted.`,
            });
          }
        }}
      >
        <MdOutlineDeleteForever className="w-8 h-8" />
        <span className="sr-only">Delete</span>
      </Button>
    </form>
  );
}
