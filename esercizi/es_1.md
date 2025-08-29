## Esercizio 1

1. **Inizializzazione del Server**: Crea un server Koa.js su cui verranno eseguite tutte le richieste.

2. **Creazione del Middleware di Logging**:

   - Implementa un middleware globale che si attivi per ogni richiesta in arrivo.

   - All'inizio di questo middleware, registra un messaggio che indichi l'arrivo della richiesta, specificando il suo metodo HTTP (es. GET, POST) e il suo URL (es. /data).

   - L'operazione del middleware deve attendere la gestione della richiesta da parte dei middleware successivi.

   - Al ritorno del flusso di esecuzione (dopo che la richiesta è stata gestita), calcola il tempo totale impiegato per elaborare la richiesta.

   - Registra un secondo messaggio di log che includa il tempo di esecuzione e lo stato HTTP finale della risposta (es. 200, 404).

3. **Definizione di una Route di Esempio**:

   - Crea una rotta specifica per il percorso /data che risponda a richieste di tipo GET.

   - Questa rotta deve simulare un'operazione che richiede tempo (ad esempio, una chiamata a un database), con un ritardo di 100 millisecondi.

   - La risposta di questa rotta deve essere un oggetto JSON con un messaggio, come ad esempio: { "message": "Dati richiesti" }.

4. **Avvio del Server**: Metti il server in ascolto sulla porta 3000 e registra un messaggio di conferma che indichi l'avvio del server.

Nota bene: Ricorda di importare e configurare correttamente i moduli necessari per Koa e per il router.
