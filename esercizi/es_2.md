**Obiettivo:** Espandere il sistema di autenticazione creato nell'esercizio precedente aggiungendo un meccanismo di refresh token. Questo permetterà di mantenere la sessione utente attiva a lungo termine in modo sicuro, emettendo nuovi token di accesso a breve scadenza senza richiedere un nuovo login.

**Dettagli dell'esercizio:**

1.  **Inizializzazione e Modello Dati:**

    - Parti dal progetto dell'esercizio di autenticazione.
    - Modifica il modello dati degli utenti in memoria, aggiungendo una nuova proprietà per memorizzare il refresh token (es. refreshToken: null).

2.  **Modifica della Rotta di Login (POST /login):**

    - Aggiorna il gestore della rotta POST /login in modo che, dopo aver verificato le credenziali, svolga i seguenti passaggi:

      - Genera un **Access Token** (JWT) con una **scadenza molto breve** (es. 1m - un minuto).
      - Genera un **Refresh Token** (JWT) con una **scadenza molto più lunga** (es. 7d - sette giorni).
      - Salva il refresh token generato nel modello utente in memoria.
      - Restituisci al client un oggetto JSON che contenga **sia l'access token che il refresh token**.

3.  **Implementazione della Rotta di Refresh (POST /refresh):**

    - Crea una nuova rotta POST /refresh. Questa rotta sarà chiamata dal client quando l'access token sta per scadere.
    - Nel handler della rotta, recupera il refresh token dal corpo della richiesta.
    - Trova l'utente nel database in memoria che possiede quel refresh token.
    - Verifica il refresh token usando jwt.verify(). Se è valido:

      - **Invalida il vecchio refresh token** nel database in memoria (es. impostando il campo a null).
      - Genera un **nuovo Access Token** e un **nuovo Refresh Token**.
      - Salva il nuovo refresh token nel modello utente.
      - Restituisci i nuovi token al client.

    - Se il refresh token non è valido o non corrisponde a nessun utente, restituisci uno status code **401 Unauthorized**.

4.  **Test e validazione:**

    - Esegui una richiesta di login e ottieni entrambi i token.
    - Prova ad accedere alla rotta /profile con l'access token. Dovrebbe funzionare.
    - **Simula la scadenza del token:** Assegna una scadenza di 1s all'access token nel codice di login, quindi esegui la richiesta /profile. Dovrebbe fallire.
    - Fai una richiesta POST /refresh con il refresh token ottenuto nel primo passo. Dovresti ricevere un nuovo paio di token.
    - Prova ad accedere di nuovo a /profile con il nuovo access token. Dovrebbe funzionare.
    - Prova a usare il **vecchio** refresh token per ottenere un nuovo paio di token. L'operazione dovrebbe fallire, confermando che il vecchio token è stato invalidato.
