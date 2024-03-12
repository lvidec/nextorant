import { MealForm } from "@/app/admin/_form/MealForm";
import { MealTableRow } from "@/app/admin/MealTableRow";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMealsWithEverything } from "@/lib/prismaActions";
import Link from "next/link";

export default async function MealAdmin() {
  const meals = await getMealsWithEverything();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meals</CardTitle>
        <CardDescription>Manage your restaurant&apos;s menu</CardDescription>
        <Link href={"/"} className={buttonVariants({ variant: "secondary" })}>
          Go back to main route
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="border-t">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Starter</TableHead>
                <TableHead>Desert</TableHead>
                <TableHead>Drinks</TableHead>
                <TableHead>Labels</TableHead>
                <TableHead className="w-[100px]">Price</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {meals.map((meal) => (
              <MealTableRow key={meal.id} meal={meal} />
            ))}
          </Table>
        </div>
        <MealForm />
      </CardContent>
    </Card>
  );
}
