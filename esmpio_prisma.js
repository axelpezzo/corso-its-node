async function createUser() {
  const newUser = await prisma.user.create({
    data: {
      name: "Mario Rossi",
      email: "mario.rossi@example.com",
    },
  });
  console.log("Utente creato:", newUser);
}

async function findUsers() {
  // Trova un utente specifico per email
  const singleUser = await prisma.user.findUnique({
    where: {
      email: "mario.rossi@example.com",
    },
  });
  console.log("Utente trovato:", singleUser);

  // Trova tutti gli utenti
  const allUsers = await prisma.user.findMany();
  console.log("Tutti gli utenti:", allUsers);
}
