const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  // Creating Tags
  const easyTag = await prisma.tag.create({ data: { name: 'easy' } });
  const mexicanTag = await prisma.tag.create({ data: { name: 'mexican' } });
  const southAmericaTag = await prisma.tag.create({ data: { name: 'south america' } });
  const beefTag = await prisma.tag.create({ data: { name: 'beef' } });

  // Creating Ingredients
  const beefIngredient = await prisma.ingredient.create({ data: { name: 'Beef' } });
  const tortillaIngredient = await prisma.ingredient.create({ data: { name: 'Tortilla' } });
  const cheeseIngredient = await prisma.ingredient.create({ data: { name: 'Cheese' } });
  const salsaIngredient = await prisma.ingredient.create({ data: { name: 'Salsa' } });

  // Creating Recipe
  const recipe = await prisma.recipe.create({
    data: {
      name: 'Easy Beef Quesadilla',
      details: 'A simple and delicious beef quesadilla.',
      desc: 'Tasty beef quesadilla made with fresh ingredients.',
      instructions: '1. Cook the beef until browned...\n2. Place the beef and cheese between two tortillas...\n3. Cook on a skillet until golden brown.\n4. Serve with salsa.',
      imageUrl: null,
      image2Url: null,
      image3Url: null,
      tagId: easyTag.id,
      ingredientId: beefIngredient.id,
    },
  });

  // Associating Ingredients with Recipe and their measurements
  await prisma.ingredient_recipe.createMany({
    data: [
      { ingredientId: beefIngredient.id, recipeId: recipe.id, measurement: '1 lb' },
      { ingredientId: tortillaIngredient.id, recipeId: recipe.id, measurement: '4 pieces' },
      { ingredientId: cheeseIngredient.id, recipeId: recipe.id, measurement: '1 cup' },
      { ingredientId: salsaIngredient.id, recipeId: recipe.id, measurement: '1/4 cup' },
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