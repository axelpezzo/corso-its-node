// Importa il modulo 'http' di Node.js, necessario per creare un server.
const http = require("http");

// Definisce l'hostname e la porta su cui il server si metterà in ascolto.
const hostname = "127.0.0.1";
const port = 3000;

// Crea il server e gli passa una funzione di callback che gestirà ogni richiesta.
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain");
  if (req.url === "/") {
    // Imposta il codice di stato per la route '/'.
    res.statusCode = 200;
    // Invia il messaggio standard.
    res.end("Ciao dalla route / del server Node.js!");
  } else {
    // Gestisce qualsiasi altra rotta.
    res.statusCode = 404;
    res.end("Pagina non trovata.");
  }
});

// Avvia il server, mettendolo in ascolto sull'indirizzo e porta specificati.
server.listen(port, hostname, () => {
  console.log(
    `Il server Node.js è in esecuzione su http://${hostname}:${port}/`
  );
});
