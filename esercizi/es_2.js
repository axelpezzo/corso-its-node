const Koa = require("koa");
const Router = require("@koa/router");

const app = new Koa();
const router = new Router();

// Funzione che simula la chiamata a un servizio di autenticazione esterno
const authenticate = (username, password) => {
  return new Promise((resolve, reject) => {
    // Simuliamo la risposta di un server.
    setTimeout(() => {
      // Per semplicità, consideriamo il login corretto solo con 'admin' e 'password123'.
      if (username === "admin" && password === "password123") {
        resolve({ id: 1, name: "Amministratore" });
      } else {
        reject(new Error("Credenziali non valide"));
      }
    }, 500); // Simuliamo un ritardo di 500ms
  });
};

// Middleware di autenticazione
const authMiddleware = async (ctx, next) => {
  console.log("[AUTH] Avvio autenticazione...");

  const username = "admin";
  const password = "password123";

  try {
    // Chiamiamo il servizio di autenticazione simulato
    const user = await authenticate(username, password);

    // Se l'autenticazione ha successo, salviamo l'utente in ctx.state
    ctx.state.user = user;
    console.log(`[AUTH] Autenticazione riuscita per l'utente: ${user.name}`);

    // Passiamo il controllo al middleware successivo
    await next();
  } catch (err) {
    // Se l'autenticazione fallisce, impostiamo lo stato di errore e interrompiamo il flusso
    console.error("[AUTH] Autenticazione fallita:", err.message);
    ctx.status = 401;
    ctx.body = { error: "Autenticazione fallita: Credenziali non valide." };
  }
};

// ==========================================================
// Rotte che usano il middleware di autenticazione
// ==========================================================

// Middleware di autenticazione applicato solo a questa rotta
router.get("/secure-data", authMiddleware, async (ctx) => {
  console.log("[ROUTER] Accesso alla rotta protetta.");
  // Accediamo ai dati dell'utente passati da authMiddleware
  ctx.body = {
    message: "Dati sensibili a cui solo un utente autenticato può accedere.",
    user: ctx.state.user,
  };
});

// Una rotta pubblica, che non necessita di autenticazione
router.get("/public", async (ctx) => {
  ctx.body = { message: "Questa è una rotta pubblica." };
});

app.use(router.routes()).use(router.allowedMethods());

const port = 3000;
app.listen(port, () => {
  console.log(`Server Koa in esecuzione su http://localhost:${port}/`);
});
