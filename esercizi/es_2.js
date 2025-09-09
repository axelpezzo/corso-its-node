// Importa i moduli necessari
const Koa = require("koa");
const Router = require("@koa/router");
const bodyParser = require("koa-bodyparser");
const jwt = require("jsonwebtoken");

const app = new Koa();
const router = new Router();

const PORT = 3000;

// Chiavi segrete per firmare i token
const JWT_ACCESS_SECRET = "la_tua_chiave_segreta_per_access_token";
const JWT_REFRESH_SECRET = "la_tua_chiave_segreta_per_refresh_token_piu_lunga";

// Database di utenti in memoria, ora con un campo per il refresh token
const users = [
  { id: 1, username: "admin", password: "password123", refreshToken: null },
  {
    id: 2,
    username: "utente",
    password: "secure_password",
    refreshToken: null,
  },
];

// Middleware per analizzare il corpo delle richieste in JSON
app.use(bodyParser());

// ======================= MIDDLEWARE DI AUTENTICAZIONE (per l'Access Token) =======================

const authMiddleware = async (ctx, next) => {
  const authHeader = ctx.headers.authorization;

  if (!authHeader) {
    ctx.status = 401; // Unauthorized
    ctx.body = { error: "Access Token non fornito." };
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
    ctx.state.user = decoded;
    await next();
  } catch (err) {
    ctx.status = 401; // Unauthorized
    ctx.body = { error: "Access Token non valido o scaduto." };
  }
};

// =========================== ROTTE API ===========================

// Rotta POST /login
// Restituisce un Access Token e un Refresh Token
router.post("/login", async (ctx) => {
  const { username, password } = ctx.request.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // 1. Genera un Access Token a breve scadenza
    const accessToken = jwt.sign({ id: user.id }, JWT_ACCESS_SECRET, {
      expiresIn: "1m",
    });

    // 2. Genera un Refresh Token a lunga scadenza
    const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    // 3. Salva il refresh token nel modello utente in memoria
    user.refreshToken = refreshToken;

    // 4. Restituisci entrambi i token al client
    ctx.status = 200; // OK
    ctx.body = { accessToken, refreshToken };
  } else {
    ctx.status = 401; // Unauthorized
    ctx.body = { error: "Credenziali non valide." };
  }
});

// Rotta POST /refresh
// Consente di ottenere un nuovo Access Token usando il Refresh Token
router.post("/refresh", async (ctx) => {
  const { refreshToken } = ctx.request.body;

  if (!refreshToken) {
    ctx.status = 401; // Unauthorized
    ctx.body = { error: "Refresh Token non fornito." };
    return;
  }

  try {
    // 1. Verifica la validità del Refresh Token
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

    // 2. Trova l'utente associato a questo token
    const user = users.find(
      (u) => u.id === decoded.id && u.refreshToken === refreshToken
    );

    if (!user) {
      ctx.status = 401;
      ctx.body = { error: "Refresh Token non valido o già utilizzato." };
      return;
    }

    // 3. Invalida il vecchio refresh token e ne genera uno nuovo
    user.refreshToken = null; // Invalida il token attuale

    const newAccessToken = jwt.sign({ id: user.id }, JWT_ACCESS_SECRET, {
      expiresIn: "1m",
    });
    const newRefreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    user.refreshToken = newRefreshToken; // Salva il nuovo token

    ctx.status = 200; // OK
    ctx.body = { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (err) {
    ctx.status = 401; // Unauthorized
    ctx.body = { error: "Refresh Token non valido o scaduto." };
  }
});

// Rotta GET /profile
// Protetto solo dall'Access Token
router.get("/profile", authMiddleware, async (ctx) => {
  const user = ctx.state.user;
  const fullUser = users.find((u) => u.id === user.id);

  ctx.status = 200; // OK
  ctx.body = {
    message: "Accesso concesso! Dati del profilo:",
    user: {
      id: fullUser.id,
      username: fullUser.username,
    },
  };
});

// Aggiungi le rotte all'applicazione Koa
app.use(router.routes()).use(router.allowedMethods());

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server Koa in ascolto su http://localhost:${PORT}`);
});
