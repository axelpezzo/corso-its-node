// Operazione su un database relazionale (es. PostgreSQL)
// La struttura è definita nello schema.prisma
const postPrisma = await prisma.post.findUnique({
  where: { id: 1 },
  include: { author: true }, // Join gestita automaticamente
});

// Operazione su un database non relazionale (es. MongoDB)
// I dati sono documenti flessibili, non ci sono join implicite
const post = await db.collection("posts").findOne({ _id: 1 });
const author = await db.collection("authors").findOne({ _id: post.authorId });

/*
{
    "_id": "101",
    "title": "My First Post",
    "content": "This is some content.",
    "author": {
      "id": "1",
      "name": "Alice",
      "email": "alice@example.com"
    }
  },
  {
    "_id": "102",
    "title": "Learning SQL",
    "content": "This post is about databases.",
    "author": {
      "id": "2",
      "name": "Bob",
      "email": "bob@example.com"
    }
  },
*/
