**Dettagli dell'esercizio:**

1.  **Aggiunta di validazione dei dati (Middleware validateBookData):**

    - Crea un middleware separato chiamato validateBookData che si posizionerà prima del gestore delle rotte POST e PUT.
    - Questo middleware deve verificare che il corpo della richiesta contenga tutte le proprietà obbligatorie (titolo, autore, annoPubblicazione).
    - Se un campo è mancante, il middleware deve "bloccare" il flusso, impostando ctx.status a **400 Bad Request** e inviando un messaggio di errore nel ctx.body. Non deve chiamare await next().

2.  **Limiti alle richieste (Middleware rateLimiter):**

    - Implementa un middleware chiamato rateLimiter che limiti il numero di richieste che un utente può fare in un determinato lasso di tempo per una specifica risorsa.
    - Per semplicità, puoi utilizzare una mappa in memoria (Map) per tracciare il numero di richieste per indirizzo IP (per simulare l'indirizzo IP puoi generare una stringa random es. 192.168.0.[0-5] ad ogni richiesta).
    - Ogni volta che arriva una richiesta, il middleware incrementa il contatore per l'IP del client. Se il contatore supera un certo limite (es. 5 richieste al minuto), il middleware blocca la richiesta con status code **429 Too Many Requests**.
