/*
  Warnings:

  - You are about to drop the `Drink` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DrinkMeal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Label` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Meal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MealLabel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DrinkMeal" DROP CONSTRAINT "DrinkMeal_drinkId_fkey";

-- DropForeignKey
ALTER TABLE "DrinkMeal" DROP CONSTRAINT "DrinkMeal_mealId_fkey";

-- DropForeignKey
ALTER TABLE "MealLabel" DROP CONSTRAINT "MealLabel_labelId_fkey";

-- DropForeignKey
ALTER TABLE "MealLabel" DROP CONSTRAINT "MealLabel_mealId_fkey";

-- DropTable
DROP TABLE "Drink";

-- DropTable
DROP TABLE "DrinkMeal";

-- DropTable
DROP TABLE "Label";

-- DropTable
DROP TABLE "Meal";

-- DropTable
DROP TABLE "MealLabel";

-- CreateTable
CREATE TABLE "RestorantUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "RestorantUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RestorantLabel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RestorantLabel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RestorantMeal" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "starter" TEXT,
    "desert" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "RestorantMeal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RestorantDrink" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "RestorantDrink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RestorantMealLabel" (
    "labelId" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,

    CONSTRAINT "RestorantMealLabel_pkey" PRIMARY KEY ("labelId","mealId")
);

-- CreateTable
CREATE TABLE "RestorantDrinkMeal" (
    "drinkId" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,

    CONSTRAINT "RestorantDrinkMeal_pkey" PRIMARY KEY ("drinkId","mealId")
);

-- CreateTable
CREATE TABLE "_RestorantMealToRestorantUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "RestorantUser_email_key" ON "RestorantUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RestorantLabel_name_key" ON "RestorantLabel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RestorantMeal_title_key" ON "RestorantMeal"("title");

-- CreateIndex
CREATE UNIQUE INDEX "RestorantDrink_title_key" ON "RestorantDrink"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_RestorantMealToRestorantUser_AB_unique" ON "_RestorantMealToRestorantUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RestorantMealToRestorantUser_B_index" ON "_RestorantMealToRestorantUser"("B");

-- AddForeignKey
ALTER TABLE "RestorantMealLabel" ADD CONSTRAINT "RestorantMealLabel_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "RestorantLabel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestorantMealLabel" ADD CONSTRAINT "RestorantMealLabel_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "RestorantMeal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestorantDrinkMeal" ADD CONSTRAINT "RestorantDrinkMeal_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "RestorantDrink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestorantDrinkMeal" ADD CONSTRAINT "RestorantDrinkMeal_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "RestorantMeal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RestorantMealToRestorantUser" ADD CONSTRAINT "_RestorantMealToRestorantUser_A_fkey" FOREIGN KEY ("A") REFERENCES "RestorantMeal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RestorantMealToRestorantUser" ADD CONSTRAINT "_RestorantMealToRestorantUser_B_fkey" FOREIGN KEY ("B") REFERENCES "RestorantUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
