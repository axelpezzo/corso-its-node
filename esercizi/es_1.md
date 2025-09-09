**Dettagli dell'esercizio:**

1.  **Inizializzazione del progetto:**

    - Crea un nuovo progetto Node.js e installa le dipendenze necessarie: **express** (o un framework a tua scelta) e **prisma**.
    - Configura **Prisma** con un database **PostgreSQL** locale (puoi usare Docker o un'installazione locale).
    - Crea un file index.js che fungerà da punto di ingresso per l'API.

2.  **Modello dati:**

    - Definisci il tuo modello nel file schema.prisma. Il modello Product deve avere le seguenti proprietà: id (chiave primaria), name (stringa), description (stringa, opzionale), price (float) e inStock (booleano).
    - Esegui la migrazione per creare la tabella Product nel database.

3.  **Implementazione delle rotte CRUD:**

    - **GET /api/products:** Recupera tutti i prodotti dal database e restituisci l'elenco completo.
    - **GET /api/products/:id:** Recupera un singolo prodotto basandosi sul suo id. Se il prodotto non esiste, restituisci un errore con status code **404 Not Found**.
    - **POST /api/products:** Aggiungi un nuovo prodotto al database. I dati del prodotto vengono inviati nel corpo della richiesta. Restituisci il prodotto appena creato con status code **201 Created**.
    - **PUT /api/products/:id:** Aggiorna i dati di un prodotto esistente. I dati aggiornati vengono inviati nel corpo della richiesta. Se il prodotto non esiste, restituisci un errore **404 Not Found**.
    - **DELETE /api/products/:id:** Rimuovi un prodotto dal database. Restituisci uno status code **204 No Content** in caso di successo.

4.  **Test e validazione:**

    - Utilizza un tool come Postman o Insomnia per testare tutte le rotte.
    - Verifica che le risposte siano in formato JSON e gli status code siano corretti.
    - Controlla il database per confermare che le operazioni di creazione, aggiornamento ed eliminazione siano persistite correttamente.
