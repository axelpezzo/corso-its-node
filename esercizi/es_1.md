### Consegna 1: API REST CRUD con Koa-router

**Obiettivo:** Creare un'API RESTful per la gestione di una lista di libri (libreria virtuale) utilizzando Koa.js e Koa-router. L'obiettivo è mettere in pratica i principi dell'architettura REST e l'uso dei metodi HTTP.

**Dettagli dell'esercizio:**

1.  **Inizializzazione del progetto:**

    - Crea un nuovo progetto Node.js.
    - Installa le dipendenze necessarie: koa, koa-router e koa-bodyparser.
    - Crea un file index.js che fungerà da punto di ingresso per l'applicazione.

2.  **Modello dati:**

    - Implementa un array di oggetti in memoria che rappresenti i libri. Ogni oggetto-libro deve avere le seguenti proprietà: id, titolo, autore, annoPubblicazione e disponibile (booleano).
    - Popola l'array con almeno 3-4 libri iniziali per testare le rotte.

3.  **Implementazione delle rotte CRUD:**

    - **GET /api/libri:** Restituisce l'intera lista dei libri.
    - **GET /api/libri/:id:** Restituisce un singolo libro basandosi sul suo id. Se il libro non esiste, restituisci un errore con status code **404 Not Found**.
    - **POST /api/libri:** Aggiunge un nuovo libro alla collezione. Il nuovo libro deve essere inviato nel corpo della richiesta. Assicurati di generare un id univoco per il nuovo libro. Restituisci il libro appena creato con status code **201 Created**.
    - **PUT /api/libri/:id:** Aggiorna i dati di un libro esistente. Il nuovo corpo del libro viene inviato nella richiesta. Se il libro non esiste, restituisci un errore **404 Not Found**.
    - **DELETE /api/libri/:id:** Rimuove un libro dalla collezione. Restituisci uno status code **204 No Content** in caso di successo.

4.  **Test e validazione:**

    - Utilizza un tool come Postman o Insomnia per testare tutte le rotte e verificare che gli status codes e le risposte siano corretti.
    - Verifica che le risposte siano in formato JSON e ben strutturate.
