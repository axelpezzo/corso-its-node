### Consegna 2: Middleware Complessi e Composizione

**Obiettivo:** Migliorare l'API della libreria virtuale aggiungendo middleware avanzati che non siano strettamente legati all'autenticazione o al logging, ma che dimostrino la potenza della composizione e la gestione del contesto in Koa.

**Dettagli dell'esercizio:**

1.  **Aggiunta di validazione dei dati (Middleware validateBookData):**

    - Crea un middleware separato chiamato validateBookData che si posizionerà prima del gestore delle rotte POST e PUT.
    - Questo middleware deve verificare che il corpo della richiesta contenga tutte le proprietà obbligatorie (titolo, autore, annoPubblicazione).
    - Se un campo è mancante, il middleware deve "bloccare" il flusso, impostando ctx.status a **400 Bad Request** e inviando un messaggio di errore nel ctx.body. Non deve chiamare await next().

2.  **Limiti alle richieste (Middleware rateLimiter):**

    - Implementa un middleware chiamato rateLimiter che limiti il numero di richieste che un utente può fare in un determinato lasso di tempo per una specifica risorsa.
    - Per semplicità, puoi utilizzare una mappa in memoria (Map) per tracciare il numero di richieste per indirizzo IP (per simulare l'indirizzo IP puoi generare una stringa random es. 192.168.0.[0-5] ad ogni richiesta).
    - Ogni volta che arriva una richiesta, il middleware incrementa il contatore per l'IP del client. Se il contatore supera un certo limite (es. 5 richieste al minuto), il middleware blocca la richiesta con status code **429 Too Many Requests**.

3.  **Middleware per il controllo delle versioni (Middleware versionChecker):**

    - Crea un middleware che legga l'header Accept-Version (es. Accept-Version: v1.0).
    - Se l'header è presente e il valore non corrisponde a una versione supportata dall'API (es. solo v1.0), il middleware deve rispondere con uno status code **406 Not Acceptable** e un messaggio di errore.
    - Assicurati che questo middleware sia posizionato all'inizio della catena di esecuzione, in modo che agisca prima del router.

4.  **Composizione e Test:**

    - Integra tutti i middleware nel tuo progetto Koa.
    - Utilizza un try...catch in un middleware di livello superiore per catturare tutti gli errori lanciati dai middleware e gestirli in modo centralizzato.
    - Testa l'applicazione con Postman o Insomnia, verificando che la validazione dei dati, i limiti di richiesta e il controllo delle versioni funzionino come previsto e che gli status codes siano corretti.
