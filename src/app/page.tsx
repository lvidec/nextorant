import { getServerSession } from "next-auth";

import { SignInButton } from "@/components/SignInButton";
import { SignOutButton } from "@/components/SignOutButton";

import { MealSelectionView } from "@/components/MealSelectionView";
import { getAllLabels, getMealsWithEverything } from "@/lib/prismaActions";
import { authOptions } from "@/lib/authOptions";

export default async function Home() {
  const meals = await getMealsWithEverything();
  const labels = await getAllLabels();
  const session = await getServerSession(authOptions);

  return (
    <main>
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
