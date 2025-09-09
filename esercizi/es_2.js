async function rateLimiter(ctx, next) {
  // Simuliamo un IP casuale (in un caso reale useremmo ctx.ip)
  const fakeIp = `192.168.0.${Math.floor(Math.random() * 6)}`;

  const currentTime = Date.now();
  if (!requestsMap.has(fakeIp)) {
    requestsMap.set(fakeIp, []);
  }

  // Rimuove richieste vecchie oltre la finestra di tempo
  const timestamps = requestsMap
    .get(fakeIp)
    .filter((t) => currentTime - t < WINDOW);

  timestamps.push(currentTime);
  requestsMap.set(fakeIp, timestamps);

  if (timestamps.length > LIMIT) {
    ctx.status = 429;
    ctx.body = { errore: "Troppe richieste, riprova più tardi." };
    return;
  }

  await next();
}

// =====================
// Middleware: Validazione dati
// =====================
async function validateBookData(ctx, next) {
  const { titolo, autore, annoPubblicazione } = ctx.request.body;

  if (!titolo || !autore || !annoPubblicazione) {
    ctx.status = 400;
    ctx.body = {
      errore:
        "Dati libro mancanti (titolo, autore, annoPubblicazione obbligatori)",
    };
    return;
  }

  await next();
}
