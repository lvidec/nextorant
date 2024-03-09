import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { SignInButton } from "@/components/SignInButton";
import { SignOutButton } from "@/components/SignOutButton";

import { MealSelectionView } from "@/components/MealSelectionView";
import { getAllLabels, getMealsWithEverything } from "@/lib/dbActions";

export default async function Home() {
  const meals = await getMealsWithEverything();

  const labels = await getAllLabels();

  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between m-12">
      <MealSelectionView meals={meals} labels={labels} />

      <div className="p-10">
        <h1>Hello from the index page, this is a public route</h1>
        {session ? (
          <div>
            <h1>You are logged in as {session.user?.email}</h1>
            <SignOutButton />
          </div>
        ) : (
          <div>
            <h1>Please log in to see special features</h1>
            <SignInButton />
          </div>
        )}
      </div>
    </main>
  );
}
