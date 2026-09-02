export const lfToCrlf = (text) => {
  // LF (\n) を CR+LF (\r\n) に変換する
  return text.replaceAll("\n", "\r\n");
};

export const crlfToLf = (text) => {
  // CR+LF (\r\n) を LF (\n) に変換する
  return text.replaceAll("\r\n", "\n");
};
