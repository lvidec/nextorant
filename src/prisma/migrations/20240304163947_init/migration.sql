-- CreateTable
CREATE TABLE "Label" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Label_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "starter" TEXT,
    "desert" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Drink" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Drink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealLabel" (
    "labelId" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,

    CONSTRAINT "MealLabel_pkey" PRIMARY KEY ("labelId","mealId")
);

-- CreateTable
CREATE TABLE "DrinkMeal" (
    "drinkId" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,

    CONSTRAINT "DrinkMeal_pkey" PRIMARY KEY ("drinkId","mealId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Label_label_key" ON "Label"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Meal_title_key" ON "Meal"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Drink_title_key" ON "Drink"("title");

-- AddForeignKey
ALTER TABLE "MealLabel" ADD CONSTRAINT "MealLabel_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealLabel" ADD CONSTRAINT "MealLabel_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrinkMeal" ADD CONSTRAINT "DrinkMeal_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "Drink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrinkMeal" ADD CONSTRAINT "DrinkMeal_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
