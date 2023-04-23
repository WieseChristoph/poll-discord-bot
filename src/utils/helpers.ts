export function getLineCount(text: string, ...exclude: string[]) {
  const lines = text.split("\n");
  const filteredLines = lines.filter((line) => !exclude.includes(line));
  return filteredLines.length;
}
