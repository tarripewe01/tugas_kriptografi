export const commonWords = [
  'saya', 'kamu', 'dan', 'ini', 'adalah', 'itu', 'kita', 'dia', 'dengan', 'untuk',
  'the', 'and', 'is', 'in', 'it', 'you', 'that', 'he', 'was', 'on',
];

export const caesarEncrypt = (str: string, shift: number): string => {
  return str.replace(/[a-z]/gi, (char) => {
    const base = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
  });
};

export const caesarDecrypt = (str: string, shift: number): string => {
  return caesarEncrypt(str, 26 - (shift % 26));
};

export const jejakEncrypt = (str: string): string => {
  return str.replace(/[a-z]/gi, (char) => {
    const base = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + 23) % 26) + base);
  });
};

export const jejakDecrypt = (str: string): string => {
  return str.replace(/[a-z]/gi, (char) => {
    const base = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + 3) % 26) + base);
  });
};

export const highlightIfCommon = (text: string): string => {
  const regex = new RegExp(`\\b(${commonWords.join('|')})\\b`, 'gi');
  return text.replace(regex, (match) => `<mark>${match}</mark>`);
};