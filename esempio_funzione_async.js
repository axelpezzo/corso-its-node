// 'caricaDatiConAsyncAwait' è la stessa funzione basata su Promise,
// ma l'uso di async/await la rende più leggibile.
const caricaDatiConAsyncAwait = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const dati = { id: 3, nome: "Dati con Async/Await" };
      const errore = null;
      if (errore) {
        reject("Errore di rete");
      } else {
        resolve(dati);
      }
    }, 2000); // Ritardo di 2 secondi
  });
};

// Per usare 'await', la funzione che la contiene deve essere marcata come 'async'.
const eseguiOperazioniAsincrone = async () => {
  try {
    console.log("[Async/Await] Inizio il processo.");

    // La parola chiave 'await' mette in pausa l'esecuzione di questa funzione
    // fino a quando la Promise non è risolta.
    const datiRicevuti = await caricaDatiConAsyncAwait(
      "https://api.esempio.com/dati-finali"
    );
    console.log(
      `[Async/Await] Caricamento completato. Dati ricevuti:`,
      datiRicevuti
    );

    // Si possono fare altre operazioni una volta che la Promise si è risolta.
    const datiSuccessivi = await caricaDatiConAsyncAwait(
      "https://api.esempio.com/altri-dati"
    );
    console.log(
      `[Async/Await] Ho caricato anche i dati successivi:`,
      datiSuccessivi
    );

    console.log("[Async/Await] Processo completato con successo.");
  } catch (errore) {
    // Il blocco 'try...catch' gestisce gli errori (Promise rifiutate)
    // in modo simile a un blocco '.catch()'.
    console.error(`[Async/Await] Si è verificato un errore:`, errore);
  }
};

// Chiamata della funzione 'async'
eseguiOperazioniAsincrone();
