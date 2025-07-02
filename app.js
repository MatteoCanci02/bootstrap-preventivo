// Dati di partenza
let prezzoBackend = 20.50;
let prezzoFrontend = 15.30;
let prezzoAnalisi = 33.60;
let oreLavoro = 10;
let codiciSconto = ["YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"];

// Oggetto con i tipi di lavoro
let tipiLavoro = {
  backend: "Sviluppo Backend",
  frontend: "Sviluppo Frontend",
  analisi: "Analisi Progettuale"
};

// Collegamenti agli elementi HTML
let menuLavoro = document.getElementById("tipo-lavoro");
let campoCodice = document.getElementById("codice-promo");
let risultato = document.getElementById("prezzo-finale");
let form = document.getElementById("preventivo-form");

// Riempimento del menu a tendina con le opzioni
let opzioneDefault = document.createElement("option");
opzioneDefault.disabled = true;
opzioneDefault.selected = true;
opzioneDefault.textContent = "Seleziona il tipo di lavoro";
menuLavoro.appendChild(opzioneDefault);

// Chiavi dell'oggetto tipiLavoro per creare le opzioni nel menu
let chiavi = Object.keys(tipiLavoro); // ["backend", "frontend", "analisi"]

// Ciclo per aggiungere le opzioni al menu
for (let i = 0; i < chiavi.length; i++) {
  let lavoro = chiavi[i];  // chiave corrente (es. "backend")
  let descrizione = tipiLavoro[lavoro];  // valore associato alla chiave

  let opzione = document.createElement("option");
  opzione.value = lavoro;
  opzione.textContent = descrizione;
  menuLavoro.appendChild(opzione);
}

// Quando si invia il form
form.addEventListener("submit", function (invio) {
  invio.preventDefault();

  // Lettura dei dati scelti dall'utente
  let lavoroScelto = menuLavoro.value;
  let codiceInserito = campoCodice.value.trim().toUpperCase();

  // Calcolo del prezzo base
  let prezzo = 0;
  if (lavoroScelto === "backend") {
    prezzo = prezzoBackend * oreLavoro;
  } else if (lavoroScelto === "frontend") {
    prezzo = prezzoFrontend * oreLavoro;
  } else if (lavoroScelto === "analisi") {
    prezzo = prezzoAnalisi * oreLavoro;
  } else {
    alert("Seleziona un tipo di lavoro.");
    return;
  }

  // Verifica codice sconto
  if (codiceInserito !== "") {
    if (codiciSconto.includes(codiceInserito)) {
      prezzo = prezzo * 0.75; // sconto del 25%
    } else {
      alert("Codice sconto non valido. Nessuno sconto applicato.");
    }
  }

  // Mostra il prezzo finale
  risultato.innerHTML = "€ " + prezzo.toFixed(2).replace(".", ",");
});
