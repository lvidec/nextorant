"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import { UpsertMealButton } from "@/app/admin/_form/UpsertMealButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMealsStore } from "@/lib/store/mealsStore";
import { DrinksFields } from "@/app/admin/_form/DrinksFields";
import { LabelsFields } from "@/app/admin/_form/LabelsFields";

export function MealForm() {
  const [isNewMeal, setIsNewMeal] = useState(false);

  const selectedMealInForm = useMealsStore((state) => state.selectedMealInForm);
  const setSelectedMealInForm = useMealsStore(
    (state) => state.setSelectedMealInForm
  );

  const handleClickingNewMeal = () => {
    setIsNewMeal(!isNewMeal);
  };

  return (
    <div>
      <div className="flex justify-end p-4">
        {!isNewMeal && !selectedMealInForm && (
          <Button size="sm" onClick={() => setIsNewMeal(!isNewMeal)}>
            Add meal
          </Button>
        )}
      </div>
      {isNewMeal || selectedMealInForm ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              {selectedMealInForm
                ? `Update meal - ${selectedMealInForm.title}`
                : "Create a new meal"}
              <Button
                variant={"outline"}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedMealInForm(undefined);
                  setIsNewMeal(false);
                }}
              >
                Reset form
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <form>
              <div className="flex gap-4 flex-col">
                <div>
                  <Label htmlFor="new-meal-title">Title</Label>
                  <Input
                    id="new-meal-title"
                    name="title"
                    placeholder="Title of the meal"
                    defaultValue={selectedMealInForm?.title}
                  />
                </div>
                <div>
                  <Label htmlFor="new-meal-starter">Starter</Label>
                  <Input
                    id="new-meal-starter"
                    name="starter"
                    placeholder="Starter of the meal"
                    defaultValue={selectedMealInForm?.starter ?? ""}
                  />
                </div>
                <div>
                  <Label htmlFor="new-meal-desert">Desert</Label>
                  <Input
                    id="new-meal-desert"
                    name="desert"
                    placeholder="Desert of the meal"
                    defaultValue={selectedMealInForm?.desert ?? ""}
                  />
                </div>
                <div>
                  <Label htmlFor="new-meal-price">Price</Label>
                  <Input
                    id="new-meal-price"
                    name="price"
                    type="number"
                    step=".01"
                    placeholder="Enter meal price"
                    defaultValue={selectedMealInForm?.price}
                  />
                </div>
                <div>
                  <Label htmlFor="new-meal-img">Image URL</Label>
                  <Input
                    id="new-meal-img"
                    placeholder="Enter image URL"
                    defaultValue={selectedMealInForm?.img}
                    name="image"
                  />
                </div>
                <DrinksFields drinks={selectedMealInForm?.drinks} />
                <LabelsFields labels={selectedMealInForm?.labels} />
              </div>
              {selectedMealInForm ? (
                <UpsertMealButton
                  actionType="update"
                  mealId={selectedMealInForm.id}
                />
              ) : (
                isNewMeal && (
                  <UpsertMealButton
                    actionType="create"
                    handleCreatingMeal={handleClickingNewMeal}
                  />
                )
              )}
            </form>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
