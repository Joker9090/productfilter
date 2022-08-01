export const hugeText = (text: string, maxChars: number) => {
  return `${text.substring(0, maxChars)}${text.length > maxChars ? '...' : ''}`;
};