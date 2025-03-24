// script.js
let chartInstance = null;

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
  
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
});

function berechneFinanzierung() {
  const immobilienpreis = parseFloat(document.getElementById("immobilienpreis").value);
  const kaufnebenkosten = parseFloat(document.getElementById("kaufnebenkosten").value);
  const eigenkapital = parseFloat(document.getElementById("eigenkapital").value);
  const zins = parseFloat(document.getElementById("zins").value.replace(',', '.')) / 100;
  const tilgungszins = parseFloat(document.getElementById("tilgungszins").value) / 100;
  const sondertilgung = parseFloat(document.getElementById("sondertilgung").value) || 0;

  const darlehen = immobilienpreis + kaufnebenkosten - eigenkapital;
  const jahresrate = darlehen * (zins + tilgungszins);
  const monatlicheZahlung = jahresrate / 12;
  let restschuld = darlehen;
  let jahr = 0;
  const jahre = [];
  const restschulden = [];

  while (restschuld > 0.01) {
    restschuld = restschuld - (jahresrate - (restschuld * zins)) - sondertilgung;
    restschuld = Math.max(restschuld, 0);
    jahre.push(jahr);
    restschulden.push(restschuld);
    jahr++;
  }

  const tableBody = document.getElementById('amortizationTable').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = ''; // Clear existing table rows

  for (let i = 0; i < jahre.length; i++) {
    const row = tableBody.insertRow();
    const cellJahr = row.insertCell(0);
    const cellRestschuld = row.insertCell(1);
    cellJahr.textContent = jahre[i];
    cellRestschuld.textContent = restschulden[i].toFixed(2) + ' €';
  }

  document.getElementById('monatlicheZahlung').textContent = 'Monatliche Zahlung: ' + monatlicheZahlung.toFixed(2) + ' €';
  document.getElementById('gesamtJahre').textContent = 'Gesamte Anzahl an Jahren: ' + (jahre.length - 1);
}
