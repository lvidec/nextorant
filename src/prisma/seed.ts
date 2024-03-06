import { PrismaClient } from "../prisma/generated/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await populatingMeals();

  await populatingUsers();
}

async function populatingUsers() {
  console.log("Populating users...");

  const password = await hash("Duje", 12);
  const user = await prisma.user.upsert({
    where: { email: "duje@seed.com" },
    update: {},
    create: {
      email: "duje@seed.com",
      password,
      meals: {
        connect: {
          id: "continentalId",
        },
      },
    },
  });

  console.log("Meals populated successfully.");
}

async function populatingMeals() {
  console.log("Populating meals...");

  await prisma.meal.upsert({
    where: {
      title: "Lima's favorite pizza",
    },
    update: {},
    create: {
      id: "limaId",
      title: "Lima's favorite pizza",
      img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1381&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 10.99,
      drinks: {
        create: [
          {
            drink: {
              connectOrCreate: {
                where: { id: "wineId" },
                create: {
                  id: "wineId",
                  price: 3.5,
                  title: "Wine",
                },
              },
            },
          },
          {
            drink: {
              connectOrCreate: {
                where: { id: "juiceId" },
                create: {
                  id: "juiceId",
                  price: 3.5,
                  title: "Juice",
                },
              },
            },
          },
        ],
      },
      labels: {
        create: [
          {
            label: {
              connectOrCreate: {
                where: { id: "pizzaId" },
                create: {
                  id: "pizzaId",
                  name: "Pizza",
                },
              },
            },
          },
          {
            label: {
              connectOrCreate: {
                where: { id: "chickenId" },
                create: {
                  id: "chickenId",
                  name: "Chicken",
                },
              },
            },
          },
        ],
      },
    },
  });
  await prisma.meal.upsert({
    where: {
      title: "Continental breakfast",
    },
    update: {},
    create: {
      id: "continentalId",
      title: "Continental breakfast",
      img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1380&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 3.5,
      drinks: {
        create: [
          {
            drink: {
              connectOrCreate: {
                where: { id: "juiceId" },
                create: {
                  id: "juiceId",
                  price: 3.5,
                  title: "Juice",
                },
              },
            },
          },
        ],
      },
      labels: {
        create: [
          {
            label: {
              connectOrCreate: {
                where: { id: "breakfastId" },
                create: {
                  id: "breakfastId",
                  name: "Breakfast",
                },
              },
            },
          },
        ],
      },
    },
  });
  await prisma.meal.upsert({
    where: {
      title: "Dinner dinner chicken winner",
    },
    update: {},
    create: {
      id: "dinnerId",
      title: "Dinner dinner chicken winner",
      img: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: 22,
      drinks: {
        create: [
          {
            drink: {
              connectOrCreate: {
                where: { id: "coctailId" },
                create: {
                  id: "coctailId",
                  price: 3.5,
                  title: "Coctail",
                },
              },
            },
          },
        ],
      },
      labels: {
        create: [
          {
            label: {
              connectOrCreate: {
                where: { id: "dinnerId" },
                create: {
                  id: "dinnerId",
                  name: "Dinner",
                },
              },
            },
          },
        ],
      },
    },
  });

  console.log("Meals populated successfully.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("Error during seed script:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
