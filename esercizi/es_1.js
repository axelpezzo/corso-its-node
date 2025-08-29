const Koa = require("koa");
const Router = require("@koa/router");

const app = new Koa();
const router = new Router();

// Middleware di logging
app.use(async (ctx, next) => {
  const start = Date.now();
  console.log(`[LOG] Richiesta ricevuta: ${ctx.method} ${ctx.url}`);

  // Chiamata al middleware successivo
  await next();

  const ms = Date.now() - start;
  console.log(`[LOG] Richiesta gestita in ${ms}ms - Stato: ${ctx.status}`);
});

// Esempio di rotta
router.get("/data", async (ctx) => {
  // Simuliamo un'operazione che richiede tempo
  await new Promise((resolve) => setTimeout(resolve, 100));
  ctx.body = { message: "Dati richiesti" };
});

app.use(router.routes()).use(router.allowedMethods());

const port = 3000;
app.listen(port, () => {
  console.log(`Server Koa in esecuzione su http://localhost:${port}/`);
});
