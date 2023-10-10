const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const recipes = require("./recipes")



async function main() {
    for(let recipe of recipes) {
      await prisma.recipe.create({
        data: recipe
      });
    }
}

main().catch(e => {
    console.log(e);
    process.exit(1)
}) .finally(async() => {
    await prisma.$disconnect()
})