
// ==== Mapa con símbolos y números ====
const symbolMap = {
  // Letras A–Z -> símbolos
  'A': '+',
  'B': '-',
  'C': '*',
  'D': '/',
  'E': '@',
  'F': '#',
  'G': '$',
  'H': '%',
  'I': '&',
  'J': '?',
  'K': '!',
  'L': '(',
  'M': ')',
  'N': '=',
  'O': '<',
  'P': '>',
  'Q': '[',
  'R': ']',
  'S': '{',
  'T': '}',
  'U': '|',
  'V': '^',
  'W': '~',
  'X': '`',
  'Y': ':',
  'Z': ';',

  // Números 1–9,0 -> letras
  '1': 'A',
  '2': 'B',
  '3': 'C',
  '4': 'D',
  '5': 'E',
  '6': 'F',
  '7': 'G',
  '8': 'H',
  '9': 'I',
  '0': 'J',

  // Espacio
  ' ': '/'
};

// ==== Invertimos para descifrar ====
const reverseSymbolMap = {};
for (const key in symbolMap) {
  reverseSymbolMap[symbolMap[key]] = key;
}

/** Encrypt: texto normal -> símbolos/números */
function encrypt(text) {
  if (typeof text !== "string") text = String(text);
  return text
    .toUpperCase()
    .split("")
    .map(ch => symbolMap[ch] || "")
    .join(" ");
}

/** Decrypt: símbolos/números -> texto normal */
function decrypt(cipherText) {
  if (!cipherText) return "";
  return cipherText
    .split(" ")
    .map(code => reverseSymbolMap[code] || "")
    .join("");
}

/** Compare */
function compare(plain, ciphered) {
  return encrypt(plain) === ciphered;
}

// Exportar si usas Node.js
module.exports = { encrypt, decrypt, compare, symbolMap };
