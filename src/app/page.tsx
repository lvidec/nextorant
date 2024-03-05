import { prisma } from "@/lib/prisma";

export default async function Home() {
  const meal = await prisma.meal.findFirst({
    where: {
      title: "Lima's favorite pizza",
    },
  });

  const labels = await prisma.label.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {meal?.title}

      {labels.map((label) => (
        <>{label.label}</>
      ))}
    </main>
  );
}
