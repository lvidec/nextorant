import { getServerSession } from "next-auth";

import { SignInButton } from "@/components/auth/SignInButton";
import { SignOutButton } from "@/components/auth/SignOutButton";

import { MealSelectionView } from "@/components/MealSelectionView";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth/authOptions";
import {
  getAllLabels,
  getMealsWithEverything,
} from "@/lib/prisma/prismaActions";
import Link from "next/link";

export default async function Home() {
  const meals = await getMealsWithEverything();
  const labels = await getAllLabels();
  const session = await getServerSession(authOptions);

  return (
    <main>
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
            <Link
              className={buttonVariants({ variant: "secondary" })}
              href={"/sign-up"}
            >
              Create a new account
            </Link>
            <SignInButton />
          </div>
        )}
        <MealSelectionView meals={meals} labels={labels} />
    </main>
  );
}
