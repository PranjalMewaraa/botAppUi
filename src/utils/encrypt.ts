export default function encrypt(value:number) {
  const multipliedValue = value * 150121;

  const stringValue = multipliedValue.toString();

  const characters = stringValue.split("");

  const encryptedString = characters
    .map((char) => {
      const index = parseInt(char);
      return String.fromCharCode(index + 32);
    })
    .join("");

  return encryptedString;
}
