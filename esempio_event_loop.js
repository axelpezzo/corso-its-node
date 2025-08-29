// Questo è il thread principale di esecuzione.
console.log("1. Inizio dello script.");

// ==========================================================
// Esempio 1: Operazione sincrona
// Questa operazione blocca l'esecuzione dello script
// fino a quando non è completata.
console.log("2. Esecuzione di un'operazione sincrona.");

// La riga successiva verrà eseguita solo dopo che questa è stata completata.
// Non c'è callback qui.
console.log("3. Operazione sincrona completata.");

// ==========================================================
// Esempio 2: Operazione asincrona basata su timer
// 'setTimeout' è una funzione asincrona. L'event loop la gestirà
// in background, ma il codice successivo verrà eseguito immediatamente.
setTimeout(() => {
  // Questa funzione (la callback) verrà inserita nella "coda dei timer"
  // e attenderà il suo turno per essere eseguita dall'event loop.
  console.log(
    "6. Questa riga appare dopo 0 secondi, ma è stata messa in coda (callback di setTimeout)."
  );
}, 0);

// ==========================================================
// Esempio 3: Operazione asincrona basata su I/O (simulata)
// 'fs.readFile' è una tipica operazione asincrona.
// Il thread principale la delega e continua, non si blocca.
// Importiamo il modulo 'fs' (File System) per simulare un'operazione I/O
const fs = require("fs");

console.log("4. Inizio di un'operazione I/O asincrona (lettura di un file).");

// Il thread principale delega la lettura del file.
// La callback verrà eseguita quando l'operazione sarà completata.
fs.readFile("assets/data.json", "utf8", (err, data) => {
  // Questa callback verrà inserita nella "coda I/O"
  // una volta che il file sarà letto.
  if (err) {
    console.error("Errore durante la lettura del file:", err);
    return;
  }
  console.log("7. Lettura del file completata (callback di fs.readFile).");
});

// Nota bene: 'esempio.txt' non esiste, quindi ci sarà un errore, ma il concetto di asincronia rimane valido.

// ==========================================================
// Esempio 4: Microtasks vs. Macrotasks
// I "microtasks" (come le Promise) hanno una priorità più alta rispetto
// ai "macrotasks" (come setTimeout).
Promise.resolve().then(() => {
  // Questa callback è un "microtask" e verrà eseguita
  // prima di qualsiasi macrotask (come setTimeout)
  // una volta che il call stack è vuoto.
  console.log(
    "5. Questa riga viene eseguita prima di setTimeout, perché è un 'microtask' (Promise)."
  );
});

console.log("8. Fine dello script. Il thread principale è libero.");
console.log(
  "9. L'event loop ora controllerà le code per le callback da eseguire."
);
