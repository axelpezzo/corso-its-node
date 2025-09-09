**Obiettivo:** Creare un'applicazione che gestisca un sistema di recensioni e valutazioni, mettendo in pratica le relazioni tra modelli, la scrittura nidificata e la lettura di dati correlati con **Prisma**.

**Dettagli dell'esercizio:**

1.  **Inizializzazione e Modello:**

    - Parti da un progetto Node.js esistente con Prisma e PostgreSQL.
    - Definisci due modelli nel schema.prisma:

      - User: con campi id e name.
      - Review: con campi id, text (stringa), rating (intero da 1 a 5).

    - Aggiungi la relazione uno-a-molti: un User può scrivere molte Review.
    - Esegui la migrazione per creare le tabelle.

2.  **Operazioni di Scrittura con Relazioni:**

    - Scrivi una funzione JavaScript che **crei un nuovo utente** e, nella stessa operazione, **crei due recensioni** associate a quell'utente. Le recensioni devono avere un rating e un text specifici.
    - Scrivi una seconda funzione che **trovi un utente esistente per ID** e aggiunga una nuova recensione a quell'utente.

3.  **Operazioni di Lettura Complesse:**

    - Scrivi una funzione che **recuperi un utente per ID e includa tutte le recensioni** che ha scritto.
    - Scrivi una funzione che **recuperi tutte le recensioni** e **includa l'utente** che ha scritto ciascuna di esse.
    - Scrivi una funzione che calcoli e stampi la **media delle valutazioni** di tutte le recensioni presenti nel database.

4.  **Test e Validazione:**

    - Esegui le funzioni e verifica che gli oggetti restituiti da Prisma abbiano la struttura corretta (ad esempio, l'oggetto utente deve contenere un array di recensioni).
    - Verifica che le nuove recensioni vengano correttamente aggiunte e associate all'utente corretto nel database.
