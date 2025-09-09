const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new Router({ prefix: "/api/libri" });

app.use(bodyParser());

// =====================
// Dati in memoria
// =====================
let libri = [
  {
    id: 1,
    titolo: "Il Signore degli Anelli",
    autore: "J.R.R. Tolkien",
    annoPubblicazione: 1954,
    disponibile: true,
  },
  {
    id: 2,
    titolo: "1984",
    autore: "George Orwell",
    annoPubblicazione: 1949,
    disponibile: false,
  },
  {
    id: 3,
    titolo: "I Promessi Sposi",
    autore: "Alessandro Manzoni",
    annoPubblicazione: 1827,
    disponibile: true,
  },
];

let nextId = 4;

// =====================
// Rotte CRUD
// =====================

// GET /api/libri -> tutti i libri
router.get("/", (ctx) => {
  ctx.body = libri;
});

// GET /api/libri/:id -> libro singolo
router.get("/:id", (ctx) => {
  const id = parseInt(ctx.params.id);
  const libro = libri.find((l) => l.id === id);

  if (!libro) {
    ctx.status = 404;
    ctx.body = { errore: "Libro non trovato" };
    return;
  }

  ctx.body = libro;
});

// POST /api/libri -> aggiunge nuovo libro
router.post("/", (ctx) => {
  const { titolo, autore, annoPubblicazione, disponibile } = ctx.request.body;

  if (!titolo || !autore || !annoPubblicazione || disponibile === undefined) {
    ctx.status = 400;
    ctx.body = { errore: "Dati libro mancanti o non validi" };
    return;
  }

  const nuovoLibro = {
    id: nextId++,
    titolo,
    autore,
    annoPubblicazione,
    disponibile,
  };

  libri.push(nuovoLibro);
  ctx.status = 201;
  ctx.body = nuovoLibro;
});

// PUT /api/libri/:id -> aggiorna libro
router.put("/:id", (ctx) => {
  const id = parseInt(ctx.params.id);
  const index = libri.findIndex((l) => l.id === id);

  if (index === -1) {
    ctx.status = 404;
    ctx.body = { errore: "Libro non trovato" };
    return;
  }

  const { titolo, autore, annoPubblicazione, disponibile } = ctx.request.body;
  libri[index] = {
    id,
    titolo: titolo || libri[index].titolo,
    autore: autore || libri[index].autore,
    annoPubblicazione: annoPubblicazione || libri[index].annoPubblicazione,
    disponibile:
      disponibile !== undefined ? disponibile : libri[index].disponibile,
  };

  ctx.body = libri[index];
});

// DELETE /api/libri/:id -> elimina libro
router.delete("/:id", (ctx) => {
  const id = parseInt(ctx.params.id);
  const index = libri.findIndex((l) => l.id === id);

  if (index === -1) {
    ctx.status = 404;
    ctx.body = { errore: "Libro non trovato" };
    return;
  }

  libri.splice(index, 1);
  ctx.status = 204; // No Content
});

// =====================
// Avvio server
// =====================
app.use(router.routes()).use(router.allowedMethods());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
