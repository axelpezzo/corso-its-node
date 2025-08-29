// La funzione 'caricaDatiConCallback' accetta due parametri:
// un URL e una funzione di callback.
const caricaDatiConCallback = (url, callback) => {
  console.log(`[Callback] Inizio il caricamento da: ${url}`);

  // Simuliamo un'operazione asincrona (ad esempio, una chiamata di rete)
  // usando setTimeout.
  setTimeout(() => {
    const dati = { id: 1, nome: "Dati del server" };
    const errore = null; // Assumiamo che non ci siano errori.

    // Una convenzione comune è che il primo argomento della callback sia l'errore
    // e il secondo siano i dati.
    if (errore) {
      callback(errore, null);
    } else {
      callback(null, dati);
    }
  }, 1000); // Ritardo di 1 secondo per simulare il tempo di caricamento
};

// Esempio di utilizzo:
caricaDatiConCallback("https://api.esempio.com/dati", (errore, dati) => {
  if (errore) {
    console.error(`[Callback] Si è verificato un errore: ${errore}`);
    return;
  }

  console.log(`[Callback] Caricamento completato. Dati ricevuti:`, dati);
});
