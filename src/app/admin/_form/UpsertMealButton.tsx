"use client";

import { createMealAction, updateMealAction } from "@/actions/mealActions";
import { Button } from "@/components/ui/button";
import { useMealsStore } from "@/lib/store/mealsStore";
import { useFormStatus } from "react-dom";

type UpsertMealButtonProps =
  | {
      actionType: "create";
      handleCreatingMeal: () => void;
    }
  | {
      actionType: "update";
      mealId: string;
    };

export function UpsertMealButton(props: UpsertMealButtonProps) {
  const { pending } = useFormStatus();
  const setSelectedMealInForm = useMealsStore(
    (state) => state.setSelectedMealInForm
  );

  const createButtonText = pending ? "Creating meal..." : "Create meal";
  const updateButtonText = pending ? "Updating meal..." : "Update meal";

  return (
    <div className="flex justify-end p-4">
      <Button
        size="sm"
        formAction={async (formData) => {
          if (props.actionType === "create") {
            props.handleCreatingMeal();

            await createMealAction(formData);
          } else {
            await updateMealAction(formData, props.mealId);
            setSelectedMealInForm(undefined);
          }
        }}
      >
        {props.actionType === "create" ? createButtonText : updateButtonText}
      </Button>
    </div>
  );
}
