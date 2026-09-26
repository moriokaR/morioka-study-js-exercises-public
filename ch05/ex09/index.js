// 任意の文字列を引数にとり、JSONとしてパースできる場合は {success: true, data: <パースしたデータ>} を返し、
// できない場合は {success: false, error: <エラー内容>} を返す

export function parseJson(str) {
  try {
    const result = JSON.parse(str);
    return { success: true, data: result };
  } catch (e) {
    return { success: false, error: e };
  }
}
