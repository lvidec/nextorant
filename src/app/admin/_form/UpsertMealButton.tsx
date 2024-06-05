"use client";

import { createMealAction, updateMealAction } from "@/actions/mealActions";
import CloudflareWidget from "@/components/auth/CloudFlareWidget";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
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
  const { toast } = useToast();
  const { pending } = useFormStatus();
  const setSelectedMealInForm = useMealsStore(
    (state) => state.setSelectedMealInForm
  );

  async function verifyFormWithTurnstile(formData: FormData): Promise<boolean> {
    const token = formData.get("cf-turnstile-response");

    const res = await fetch("/api/cloudflare/verify", {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();
    if (!data.success) {
      return false;
    } else if (data.success) {
      return true;
    }

    return false;
  }

  const createButtonText = pending ? "Creating meal..." : "Create meal";
  const updateButtonText = pending ? "Updating meal..." : "Update meal";

  return (
    <div className="flex justify-between items-center mt-8 mb-4 pr-4">
      <CloudflareWidget id="real-form-widget" />
      <Button
        size="sm"
        formAction={async (formData) => {
          console.log(formData);
          const verifyResult = await verifyFormWithTurnstile(formData);

          if (!verifyResult) {
            toast({
              title: "Turnstile token is invalid.",
              variant: "destructive",
            });
            return;
          }

          if (props.actionType === "create") {
            props.handleCreatingMeal();

            const response = await createMealAction(formData);
            if (response?.error) {
              toast({
                title: response?.error,
                variant: "destructive",
              });
            }
          } else {
            const response = await updateMealAction(formData, props.mealId);
            if (response?.error) {
              toast({
                title: response?.error,
                variant: "destructive",
              });
            }

            setSelectedMealInForm(undefined);
          }
        }}
      >
        {props.actionType === "create" ? createButtonText : updateButtonText}
      </Button>
    </div>
  );
}
