import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { SignInButton } from "@/components/SignInButton";
import { SignOutButton } from "@/components/SignOutButton";

export default async function Home() {
  const meal = await prisma.meal.findFirst({
    where: {
      title: "Lima's favorite pizza",
    },
  });

  const labels = await prisma.label.findMany();

  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {meal?.title}

      {labels.map((label) => (
        <p key={label.id}>{label.name}</p>
      ))}

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
