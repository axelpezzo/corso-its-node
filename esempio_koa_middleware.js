const Koa = require("koa");
const Router = require("@koa/router");

const app = new Koa();
const router = new Router();

// ==========================================================
// Middleware globali (si applicano a tutte le rotte)
// ==========================================================

// Middleware globale che misura il tempo di risposta.
app.use(async (ctx, next) => {
  const start = Date.now();
  console.log("Middleware globale: Inizio del tracciamento.");
  // La richiesta scende lungo la catena.
  await next();
  // La richiesta è risalita, calcolo il tempo.
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
  console.log(`Middleware globale: Richiesta gestita in ${ms}ms.`);
});

// ==========================================================
// Middleware specifici per la rotta '/profile'
// ==========================================================

// 1. Middleware per simulare l'autenticazione.
const authMiddleware = async (ctx, next) => {
  console.log("   -> Middleware Auth: Verifico l'utente...");
  // Simula un controllo asincrono.
  const utenteAutenticato = true;
  if (!utenteAutenticato) {
    ctx.status = 401;
    ctx.body = "Non autorizzato";
    return; // Ferma la catena di middleware.
  }
  ctx.state.user = { name: "Mario Rossi" }; // Inserisce dati nel contesto.
  // Passa al middleware successivo.
  await next();
  console.log("   -> Middleware Auth: Lavoro completato.");
};

// 2. Middleware per registrare l'accesso.
const logMiddleware = async (ctx, next) => {
  console.log("   -> Middleware Log: Registrazione dell'accesso...");
  // Simula un'operazione asincrona di logging.
  await new Promise((resolve) => setTimeout(resolve, 50));
  await next();
  console.log("   -> Middleware Log: Accesso registrato.");
};

// ==========================================================
// Definizione della rotta con più middleware
// ==========================================================

router.get("/profile", authMiddleware, logMiddleware, async (ctx) => {
  console.log("      -> Middleware Final: Preparo la risposta.");
  ctx.body = `Benvenuto, ${ctx.state.user.name}.`;
});

// Aggiunge il router all'applicazione.
app.use(router.routes()).use(router.allowedMethods());

// Avvia il server.
const port = 3000;
app.listen(port, () => {
  console.log(`Server Koa in esecuzione su http://localhost:${port}/`);
});
