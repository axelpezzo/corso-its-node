// Importa i moduli necessari
const Koa = require("koa");
const Router = require("@koa/router");
const bodyParser = require("koa-bodyparser");
const jwt = require("jsonwebtoken");

const app = new Koa();
const router = new Router();

const PORT = 3000;

// La chiave segreta per firmare e verificare i token JWT
const JWT_SECRET = "la_tua_chiave_segreta_molto_sicura";

// Middleware per analizzare il corpo delle richieste in JSON
app.use(bodyParser());

// Database di utenti in memoria (per semplicità)
const users = [
  { id: 1, username: "admin", password: "password123" },
  { id: 2, username: "utente", password: "secure_password" },
];

// ======================= MIDDLEWARE DI AUTENTICAZIONE =======================

/**
 * Middleware per proteggere le rotte.
 * Verifica la presenza e la validità del token JWT.
 */
const authMiddleware = async (ctx, next) => {
  // 1. Recupera l'header 'Authorization'
  const authHeader = ctx.headers.authorization;

  if (!authHeader) {
    // Se l'header non è presente, l'utente non è autorizzato
    ctx.status = 401; // Unauthorized
    ctx.body = { error: "Token non fornito." };
    return;
  }

  // 2. Estrae il token rimuovendo il prefisso "Bearer "
  const token = authHeader.split(" ")[1];

  try {
    // 3. Verifica la validità del token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 4. Se il token è valido, allega i dati dell'utente al contesto (ctx)
    // in modo che possano essere usati nei handler delle rotte successive
    ctx.state.user = decoded;

    // Passa il controllo al prossimo middleware/handler della rotta
    await next();
  } catch (err) {
    // Se la verifica del token fallisce (es. scaduto, errato), restituisci un errore
    ctx.status = 401; // Unauthorized
    ctx.body = { error: "Token non valido." };
  }
};

// =========================== ROTTE API ===========================

// Rotta POST /login
// Consente all'utente di autenticarsi e ricevere un token
router.post("/login", async (ctx) => {
  const { username, password } = ctx.request.body;

  // Cerca l'utente nel database fittizio
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // Se le credenziali sono corrette, firma un token JWT
    // Il payload del token contiene l'ID dell'utente
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Restituisci il token all'utente
    ctx.status = 200; // OK
    ctx.body = { token: token };
  } else {
    // Credenziali non valide
    ctx.status = 401; // Unauthorized
    ctx.body = { error: "Credenziali non valide." };
  }
});

// Rotta GET /profile
// Protetto dal middleware di autenticazione. Mostra i dati dell'utente.
router.get("/profile", authMiddleware, async (ctx) => {
  // A questo punto, il middleware 'authMiddleware' ha già verificato il token.
  // I dati dell'utente decodificati sono disponibili in ctx.state.user.
  const user = ctx.state.user;

  ctx.status = 200; // OK
  ctx.body = {
    message: "Accesso concesso! Dati del profilo:",
    user: {
      id: user.id,
      username: user.username,
    },
  };
});

// Aggiungi le rotte all'applicazione Koa
app.use(router.routes()).use(router.allowedMethods());

// Avvia il server in ascolto sulla porta specificata
app.listen(PORT, () => {
  console.log(`Server Koa in ascolto su http://localhost:${PORT}`);
  console.log(`Prova a chiamare le rotte:`);
  console.log(
    `- POST http://localhost:3000/login con un body { "username": "admin", "password": "password123" }`
  );
  console.log(
    `- GET http://localhost:3000/profile con l'header 'Authorization: Bearer <il tuo token>'`
  );
});
