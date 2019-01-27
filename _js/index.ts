import { key, message, encrypt } from "openpgp";

// Lazy Loader
const PublicKeys = { 
  value: null, 
  async getOrFetch() { 
    if (this.value !== null) {
      return this.value;
    }
    const res = await fetch("assets/publickey.eric@edamtoft.com.asc");
    const asciiKey = await res.text();
    const { keys } = await key.readArmored(asciiKey);
    return this.value = keys;
  }
};

async function encryptMessage() {
  const textarea = document.getElementById("crypto-textarea") as HTMLTextAreaElement;

  if (textarea.value.indexOf("-----BEGIN PGP MESSAGE-----") !== -1) {
    alert("Message is already encrypted");
    return;
  }

  const options = {
    message: message.fromText(textarea.value),
    publicKeys: await PublicKeys.getOrFetch(),
  }

  const result = await encrypt(options);

  textarea.value = result.data;
}

document.getElementById("encrypt-button").addEventListener("click", e => {
  e.preventDefault();
  encryptMessage();
});