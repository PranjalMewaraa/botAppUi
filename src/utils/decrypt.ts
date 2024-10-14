export default function decrypt(encryptedString: string | null): number | null {

  if (!encryptedString) {
    return null;
  }

  const indices = encryptedString.split("").map((char) => {
    const asciiValue = char.charCodeAt(0);
    return asciiValue - 32;
  });

  const numberString = indices.join("");

  const originalValue = parseInt(numberString) / 150121;

  if (isNaN(originalValue)) {
    return null; 
  }

  return originalValue;
}
