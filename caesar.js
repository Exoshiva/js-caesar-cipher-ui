// 1. VARIABLEN FÜR DIE HTML-ELEMENTE
const inputField = document.getElementById('inputText');   // Das Eingabefeld für den Text
const shiftField = document.getElementById('shiftValue');  // Das Eingabefeld für den Key/Shift
const result = document.getElementById('resultOutput');    // Wo das Ergebnis hin soll

// Buttons für Verschlüsseln und Entschlüsseln
const encryptBtn = document.getElementById('encryptBtn');  // Button: Verschlüsseln
const decryptBtn = document.getElementById('decryptBtn');  // Button: Entschlüsseln

// 2. EVENT LISTENER
// Ruft bei Klick eine zentrale Steuerungs-Funktion auf
// und übergibt den Modus ('encrypt' oder 'decrypt')
encryptBtn.addEventListener('click', () => {
    startCipher('encrypt');
});

decryptBtn.addEventListener('click', () => {
    startCipher('decrypt');
});

// 3. STEUERUNGS-FUNKTION (Controller Logic)
// Diese Funktion kümmert sich um das "Drumherum" (DOM, Validierung)
function startCipher(mode) {
    // Werte aus den Feldern holen
    const text = inputField.value;
    let shift = parseInt(shiftField.value);

    // Validierung der Eingaben
    // (Hier wird geprüft, ob Text da ist und Shift eine Zahl ist, Buchstaben können nicht in das Zahlenfeld eingegeben werden)
    if (!text || isNaN(shift)) {
        alert("Bitte Text und eine gültige Zahl eingeben!");
        return;
    }

    // Die Weiche:
    // Beim Entschlüsseln wird das Vorzeichen des Shifts umgedreht!
    // Aus Shift 3 wird -3.
    if (mode === 'decrypt') {
        shift = shift * -1;
    }

    // Den reinen Algorithmus aufrufen
    const output = caesarCipher(text, shift);
    
    // Ergebnis in das HTML schreiben
    result.textContent = `Ergebnis: ${output}`;
}

// 4. ALGORITHMUS (Reine Logik)
// Parameter: text und der (ggf. negative) shift
function caesarCipher(text, shift) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let resultText = '';

    // Text in Großbuchstaben umwandeln
    text = text.toUpperCase(); 

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        
        if (alphabet.includes(char)) {
            let index = alphabet.indexOf(char);

            // 1. Berechnung (kann bei Entschlüsselung negativ werden!)
            let newIndex = (index + shift) % 26;

            // Javascript Modulo-Bug-Fix für negative Zahlen:
            // Wenn newIndex negativ ist (z.B. -1), addiere 26 drauf -> 25 (Z)
            if (newIndex < 0) {
                newIndex = newIndex + 26;
            }

            // Neuen Buchstaben an das Ergebnis anhängen
            resultText += alphabet[newIndex];
        } else {
            // Sonderzeichen unverändert übernehmen
            resultText += char;
        }
    }
    return resultText;
}

// Ende des Skripts @Exoshiva