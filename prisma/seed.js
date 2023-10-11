const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seed() {
  // Upserting Tags
  const easyTag = await prisma.tag.upsert({
    where: { name: "easy" },
    update: {},
    create: { name: "easy" },
  });

  const mexicanTag = await prisma.tag.upsert({
    where: { name: "mexican" },
    update: {},
    create: { name: "mexican" },
  });

  const southAmericaTag = await prisma.tag.upsert({
    where: { name: "south america" },
    update: {},
    create: { name: "south america" },
  });

  const beefTag = await prisma.tag.upsert({
    where: { name: "beef" },
    update: {},
    create: { name: "beef" },
  });

  // Upserting Ingredients
  const beefIngredient = await prisma.ingredient.upsert({
    where: { name: "beef" },
    update: {},
    create: { name: "beef" },
  });

  const tortillaIngredient = await prisma.ingredient.upsert({
    where: { name: "tortilla" },
    update: {},
    create: { name: "tortilla" },
  });

  const cheeseIngredient = await prisma.ingredient.upsert({
    where: { name: "cheese" },
    update: {},
    create: { name: "cheese" },
  });

  const salsaIngredient = await prisma.ingredient.upsert({
    where: { name: "salsa" },
    update: {},
    create: { name: "salsa" },
  });

  // Creating Recipe
  const recipe = await prisma.recipe.create({
    data: {
      name: "(Test/Dev) Easy Beef Quesadilla",
      details: "A simple and delicious beef quesadilla.",
      desc: "Tasty beef quesadilla made with fresh ingredients.",
      instructions:
        "1. Cook the beef until browned...\n2. Place the beef and cheese between two tortillas...\n3. Cook on a skillet until golden brown.\n4. Serve with salsa.",
      imageUrl:
        "https://girlheartfood.com/wp-content/uploads/2020/06/Ground-Beef-Quesadillas-4.jpg",
      image2Url:
        "https://img.taste.com.au/Fa2mth9d/taste/2016/11/beef-quesadillas-with-avocado-smash-69253-1.jpeg",
      image3Url:
        "https://mommygonehealthy.com/wp-content/uploads/2018/09/IMG_9033.jpg",
    },
  });

  // Associating Recipe with Tags using the Recipetags join table
  await prisma.recipetags.createMany({
    data: [
      { tagId: easyTag.id, recipeId: recipe.id },
      { tagId: mexicanTag.id, recipeId: recipe.id },
      { tagId: southAmericaTag.id, recipeId: recipe.id },
      { tagId: beefTag.id, recipeId: recipe.id }
    ],
  });

  // Associating Ingredients with Recipe and their measurements
  await prisma.ingredient_recipe.createMany({
    data: [
      {
        ingredientId: beefIngredient.id,
        recipeId: recipe.id,
        measurement: "1 lb",
      },
      {
        ingredientId: tortillaIngredient.id,
        recipeId: recipe.id,
        measurement: "4 pieces",
      },
      {
        ingredientId: cheeseIngredient.id,
        recipeId: recipe.id,
        measurement: "1 cup",
      },
      {
        ingredientId: salsaIngredient.id,
        recipeId: recipe.id,
        measurement: "1/4 cup",
      },
    ],
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

