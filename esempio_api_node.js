// Aggiungi un punto esclamativo per importare Koa e Koa-router
const Koa = require("koa");
const Router = require("@koa/router");

const app = new Koa();
const router = new Router();

const PORT = 3000;

// Dati in memoria (simulazione di un database)
let books = [
  { id: 1, title: "Il Signore degli Anelli", author: "J.R.R. Tolkien" },
  {
    id: 2,
    title: "Harry Potter e la pietra filosofale",
    author: "J.K. Rowling",
  },
  { id: 3, title: "1984", author: "George Orwell" },
];

// Funzione per generare un ID univoco
const generateId = () => {
  return Math.max(...books.map((book) => book.id)) + 1;
};

// ================= ROTTE API REST ================= //

// GET /api/books: Restituisce l'elenco completo dei libri
// Status Code: 200 OK
router.get("/api/books", (ctx) => {
  // ctx.body contiene la risposta, ctx.status imposta lo status code
  ctx.body = books;
  ctx.status = 200;
});

// GET /api/books/:id: Restituisce un singolo libro
// Status Code: 200 OK, 404 Not Found
router.get("/api/books/:id", (ctx) => {
  const id = parseInt(ctx.params.id);
  const book = books.find((b) => b.id === id);

  if (book) {
    ctx.body = book;
    ctx.status = 200;
  } else {
    ctx.body = "Libro non trovato.";
    ctx.status = 404;
  }
});

// POST /api/books: Crea un nuovo libro
// Status Code: 201 Created, 400 Bad Request
router.post("/api/books", (ctx) => {
  // Per leggere il body della richiesta in Koa serve un middleware
  // (non incluso in questo esempio per mantenere la semplicità)
  const { title, author } = ctx.request.body;

  if (!title || !author) {
    ctx.body = "Titolo e autore sono obbligatori.";
    ctx.status = 400;
    return;
  }

  const newBook = { id: generateId(), title, author };
  books.push(newBook);

  ctx.body = newBook;
  ctx.status = 201;
});

// PUT /api/books/:id: Aggiorna un libro esistente
// Status Code: 200 OK, 404 Not Found
router.put("/api/books/:id", (ctx) => {
  const id = parseInt(ctx.params.id);
  const { title, author } = ctx.request.body;
  const bookIndex = books.findIndex((b) => b.id === id);

  if (bookIndex === -1) {
    ctx.body = "Libro non trovato.";
    ctx.status = 404;
    return;
  }

  books[bookIndex] = { ...books[bookIndex], title, author };
  ctx.body = books[bookIndex];
  ctx.status = 200;
});

// DELETE /api/books/:id: Rimuove un libro
// Status Code: 204 No Content, 404 Not Found
router.delete("/api/books/:id", (ctx) => {
  const id = parseInt(ctx.params.id);
  const initialLength = books.length;
  books = books.filter((b) => b.id !== id);

  if (books.length < initialLength) {
    ctx.status = 204; // Cancellazione riuscita, nessun contenuto da restituire
  } else {
    ctx.body = "Libro non trovato.";
    ctx.status = 404;
  }
});

// Usa le rotte definite
app.use(router.routes()).use(router.allowedMethods());

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server Koa in ascolto su http://localhost:${PORT}`);
});
