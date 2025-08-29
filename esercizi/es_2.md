1. **Server e router**

   - Crea un’applicazione Koa con un router.

   - Il server deve ascoltare su una porta a tua scelta (es. 3000).

2. **Rotte**

   - Crea una rotta GET /secure-data che utilizzi il middleware di autenticazione. Se l’utente è autenticato, deve restituire un JSON con:

   - Un messaggio che indichi che si tratta di dati sensibili.

   - Le informazioni dell’utente autenticato.

   - Crea una rotta GET /public accessibile senza autenticazione che restituisca un semplice messaggio pubblico in JSON.

3. **Simulazione di autenticazione esterna**

   - Implementa una funzione asincrona che simuli la chiamata a un servizio di autenticazione esterno.

   - La funzione deve accettare username e password e, dopo un piccolo ritardo (es. setTimeout con ~500ms), restituire un oggetto utente se le credenziali sono corrette.

   - In caso di credenziali errate, deve sollevare un errore.

   - Le credenziali considerate valide devono essere username: "admin" e password: "password123".

4. **Middleware di autenticazione**

Implementa un middleware che:

- Chiami la funzione di autenticazione simulata passandogli in input user e password hardcoded.

- Se l’autenticazione ha successo, salvi l’oggetto utente in ctx.state.user e passi al middleware successivo.

- Se fallisce, risponda con 401 Unauthorized e un messaggio di errore in JSON, senza chiamare il middleware successivo.

5. **Avvio del server**

Avvia il server e stampa in console un messaggio che indichi l’indirizzo locale su cui è in ascolto.
