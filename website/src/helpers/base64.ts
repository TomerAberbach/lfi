export const toBase64 = (text: string): string => {
  const bytes = textEncoder.encode(text)
  const binaryString = Array.from(bytes, byte =>
    String.fromCodePoint(byte),
  ).join(``)
  return btoa(binaryString)
}

const textEncoder = new TextEncoder()

export const fromBase64 = (base64: string): string => {
  const binaryString = atob(base64)
  const bytes = Uint8Array.from(binaryString, c => c.codePointAt(0)!)
  return textDecoder.decode(bytes)
}

const textDecoder = new TextDecoder()
