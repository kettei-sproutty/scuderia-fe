import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // Clean DB
  await prisma.answer.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.workshop.deleteMany({});

  // Create profiles
  await prisma.profile.createMany({
    data: [
      {
        email: "alessio.marchi@accenture.com",
        name: "Alessio",
        bio: "I use VIM btw",
      },
      {
        email: "francesco.malagisi@accenture.com",
        name: "Francesco",
      },
      {
        email: "alin.ioan.dan@accenture.com",
        name: "Alin",
      },
    ],
  });

  // Create current workshop
  await prisma.workshop.create({
    data: {
      topic: "Example workshop",
      description: "This is an example workshop",
      hosts: ["Francesco Malagisi", "Alin Ioan Dan", "Alessio Marchi"],
      date: new Date(Date.now() + 36000 * 24 * 31),
    },
  });

  const range = [0, 1, 2, 3, 4, 5, 6, 8, 9, 10];
  const pastWorkshops = range.map((index) => {
    return {
      topic: `Example workshop ${index}`,
      description: `This is an example workshop ${index}`,
      hosts: ["Francesco Malagisi", "Alin Ioan Dan", "Alessio Marchi"],
      date: new Date(Date.now() + 3600 * 1000 * 24 * index),
    };
  });

  // Create past workshops
  await prisma.workshop.createMany({ data: pastWorkshops });
};

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

export {};
