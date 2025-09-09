### **Esercizio: API di Autenticazione e Accesso Protetto**

**Obiettivo:** Creare un'API con un sistema di login che utilizzi l'autenticazione a token (JWT). L'esercizio si concentra sulla creazione di un **middleware di autenticazione** per proteggere le rotte e sulla gestione del flusso di login.

**Dettagli dell'esercizio:**

1.  **Inizializzazione del progetto:**

    - Crea un nuovo progetto Node.js.
    - Installa le dipendenze necessarie: **koa**, **@koa/router**, **koa-bodyparser** e **jsonwebtoken**.
    - Crea un file index.js che sarà il punto di ingresso dell'applicazione.

2.  **Modello dati e Rotte:**

    - Inizializza un array di oggetti in memoria che funga da "database" di utenti. Ogni oggetto-utente deve avere le proprietà: id, username e password (la password può essere in chiaro per semplicità, ma ricorda di commentare che in un'applicazione reale dovrebbe essere hashetata).
    - Definisci due rotte principali:

      - POST /login (pubblica): per l'autenticazione.
      - GET /profile (protetta): per accedere ai dati dell'utente autenticato.

3.  **Implementazione della Rotta di Login:**

    - Nel handler della rotta POST /login, recupera username e password dal corpo della richiesta.
    - Cerca l'utente nel tuo "database" in memoria.
    - Se l'utente e la password corrispondono, usa jsonwebtoken.sign() per creare un token JWT. Nel payload del token, inserisci l'id dell'utente.
    - Restituisci il token al client con uno status code **200 OK**.
    - Se le credenziali non sono valide, restituisci uno status code **401 Unauthorized** con un messaggio di errore.

4.  **Creazione e Utilizzo del Middleware di Autenticazione:**

    - Crea un middleware Koa. Questa funzione dovrà:

      - Cercare l'header **Authorization** nella richiesta.
      - Estrarre il token, rimuovendo il prefisso Bearer .
      - Usare jsonwebtoken.verify() per decodificare e validare il token, utilizzando la stessa "secret key" usata per la firma.
      - Se il token è valido, allega l'oggetto utente decodificato a ctx.state e chiama await next() per passare il controllo alla rotta successiva.
      - Se il token non è presente o non è valido (es. scaduto o modificato), imposta ctx.status a **401 Unauthorized** e ctx.body a un messaggio di errore, interrompendo la catena di middleware.

5.  **Implementazione della Rotta Protetta:**

    - Applica il middleware di autenticazione alla rotta GET /profile.
    - Nel handler della rotta, accedi ai dati dell'utente autenticato direttamente da ctx.state (es. ctx.state.user).
    - Restituisci i dati dell'utente (ad esempio, solo l'username) con uno status code **200 OK**.

6.  **Test e validazione:**

    - Utilizza Postman o Insomnia per testare il flusso.
    - Prova a chiamare GET /profile **senza** l'header di autorizzazione. Dovresti ricevere un errore **401 Unauthorized**.
    - Esegui una richiesta POST /login per ottenere un token valido.
    - Esegui nuovamente la richiesta GET /profile, questa volta includendo l'header Authorization: Bearer . Dovresti ricevere la risposta corretta con i dati del profilo.
