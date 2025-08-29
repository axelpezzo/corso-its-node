// Importa il modulo Koa, che fornisce l'infrastruttura di alto livello.
const Koa = require("koa");

// Importa il router di Koa (non è incluso di default e va installato separatamente).
const Router = require("@koa/router");

// Crea una nuova istanza dell'applicazione Koa.
const app = new Koa();

// Crea una nuova istanza del router.
const router = new Router();

// ==========================================================
// Middleware di esempio
// ==========================================================

// Middleware che imposta un header sulla risposta.
app.use(async (ctx, next) => {
  console.log("Middleware 1: Imposto un header");
  // Imposta un header personalizzato sulla risposta.
  ctx.set("X-Server-Name", "Koa-Server");
  // Passa il controllo al middleware successivo.
  await next();
});

// ==========================================================
// Gestione della rotta
// ==========================================================

// Definisce una rotta HTTP GET per l'URL '/'.
router.get("/", async (ctx, next) => {
  // Imposta il corpo della risposta. Koa gestisce automaticamente gli header
  // (come 'Content-Type') in base al tipo di dato.
  ctx.body = "Ciao dal server Koa.js!";
  // Non serve impostare ctx.status, Koa lo fa per te.
  // Passa il controllo al middleware successivo, se presente.
  await next();
});

// Aggiunge il middleware del router all'applicazione.
app.use(router.routes()).use(router.allowedMethods());

// =s========================================================
// Avvio del server
// ==========================================================

// Avvia il server Koa. La sintassi è più semplice e pulita.
const port = 3000;
app.listen(port, () => {
  console.log(`Il server Koa è in esecuzione su http://localhost:${port}/`);
});
