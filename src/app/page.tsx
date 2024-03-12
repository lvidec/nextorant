import { getServerSession } from "next-auth";

import { SignInButton } from "@/components/SignInButton";
import { SignOutButton } from "@/components/SignOutButton";

import { MealSelectionView } from "@/components/MealSelectionView";
import { getAllLabels, getMealsWithEverything } from "@/lib/prismaActions";
import { authOptions } from "@/lib/authOptions";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function Home() {
  const meals = await getMealsWithEverything();
  const labels = await getAllLabels();
  const session = await getServerSession(authOptions);

  return (
    <main>
      <MealSelectionView meals={meals} labels={labels} />

      <div className="p-10">
        <h1>This is a public route</h1>
        {session ? (
          <div className="flex flex-col gap-2 text-2xl font-semibold">
            <h1>You are logged in as {session.user?.email}</h1>

            <Link
              className={buttonVariants({ variant: "secondary" })}
              href={"/admin"}
            >
              You have admin priviledges
            </Link>
            <SignOutButton />
          </div>
        ) : (
          <div className="flex flex-col gap-2 text-2xl font-semibold">
            <h1>Please log in to see special features</h1>
            <SignInButton />
          </div>
        )}
      </div>
    </main>
  );
}
