import { PrismaClient } from "../prisma/generated/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // await deleteEverything();

  await populatingMeals();
  await populatingUsers();
}

async function deleteEverything() {
  await prisma.drinkMeal.deleteMany();
  await prisma.mealLabel.deleteMany();
  await prisma.drink.deleteMany();
  await prisma.label.deleteMany();
  await prisma.meal.deleteMany();
  await prisma.user.deleteMany();
  console.log("Deleted everything successfully");
}

async function populatingUsers() {
  console.log("Populating users...");

  const password = await hash("Duje", 12);
  await prisma.user.upsert({
    where: { email: "duje@seed.com" },
    update: {},
    create: {
      email: "duje@seed.com",
      password,
      meals: {
        connect: {
          title: "Continental breakfast",
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
      title: "Lima's favorite pizza",
      img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1381&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      starter: "Slightly salted salmon with fresh cucumbers",
      desert: "Ice cream with pumpkin oil",
      price: 10.99,
      drinks: {
        create: [
          {
            drink: {
              connectOrCreate: {
                where: { title: "Wine" },
                create: {
                  price: 3.5,
                  title: "Wine",
                  img: "https://images.unsplash.com/photo-1569153482031-a3cebdedf294?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
              },
            },
          },
          {
            drink: {
              connectOrCreate: {
                where: { title: "Juice" },
                create: {
                  price: 3.5,
                  title: "Juice",
                  img: "https://images.unsplash.com/photo-1607690506833-498e04ab3ffa?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
                where: { name: "Pizza" },
                create: {
                  name: "Pizza",
                },
              },
            },
          },
          {
            label: {
              connectOrCreate: {
                where: { name: "Chicken" },
                create: {
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
      title: "Continental breakfast",
      img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1380&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      starter: "All kinds of fruits",
      price: 3.5,
      drinks: {
        create: [
          {
            drink: {
              connectOrCreate: {
                where: { title: "Juice" },
                create: {
                  price: 3.5,
                  title: "Juice",
                  img: "https://images.unsplash.com/photo-1607690506833-498e04ab3ffa?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
                where: { name: "Breakfast" },
                create: {
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
      title: "Dinner dinner chicken winner",
      img: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      starter: "Slightly salted salmon with fresh cucumbers",
      price: 22,
      drinks: {
        create: [
          {
            drink: {
              connectOrCreate: {
                where: { title: "Coctail" },
                create: {
                  price: 3.5,
                  title: "Coctail",
                  img: "https://images.unsplash.com/photo-1512103865222-dcf9531c9961?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
                where: { id: "Dinner" },
                create: {
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
