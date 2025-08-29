// La funzione 'caricaDatiConPromise' restituisce un oggetto Promise.
const caricaDatiConPromise = (url) => {
  console.log(`[Promise] Inizio il caricamento da: ${url}`);

  // L'oggetto Promise accetta una funzione 'executor' con due parametri:
  // 'resolve' (per risolvere la Promise con successo) e 'reject' (per rifiutarla in caso di errore).
  return new Promise((resolve, reject) => {
    // Simuliamo un'operazione asincrona
    setTimeout(() => {
      const dati = { id: 2, nome: "Dati della Promise" };
      const errore = null;

      if (errore) {
        // Se c'è un errore, chiamiamo 'reject'
        reject("Errore durante il caricamento");
      } else {
        // Se tutto va bene, chiamiamo 'resolve' con i dati
        resolve(dati);
      }
    }, 1500); // Ritardo di 1.5 secondi
  });
};

// Esempio di utilizzo con .then() e .catch():
caricaDatiConPromise("https://api.esempio.com/dati")
  .then((dati) => {
    // Il blocco '.then()' viene eseguito quando la Promise è risolta.
    console.log(`[Promise] Caricamento completato. Dati ricevuti:`, dati);

    // È possibile concatenare altre Promise per gestire flussi complessi.
    return caricaDatiConPromise("https://api.esempio.com/dati-successivi");
  })
  .then((datiSuccessivi) => {
    console.log(`[Promise] Ho caricato i dati successivi:`, datiSuccessivi);
  })
  .catch((errore) => {
    // Il blocco '.catch()' gestisce gli errori di qualsiasi Promise nella catena.
    console.error(`[Promise] Si è verificato un errore:`, errore);
  });
