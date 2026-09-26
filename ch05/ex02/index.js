// 対象の文字 (教科書 p37 表3-1 の \\ より上): \0 \b \t \n \v \f \r \" \' \\

export function escapeIfElse(str) {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "\u0000") {
      result += "\\0";
    } else if (str[i] === "\u0008") {
      result += "\\b";
    } else if (str[i] === "\u0009") {
      result += "\\t";
    } else if (str[i] === "\u000A") {
      result += "\\n";
    } else if (str[i] === "\u000B") {
      result += "\\v";
    } else if (str[i] === "\u000C") {
      result += "\\f";
    } else if (str[i] === "\u000D") {
      result += "\\r";
    } else if (str[i] === "\u0022") {
      result += '\\"';
    } else if (str[i] === "\u0027") {
      result += "\\'";
    } else if (str[i] === "\u005C") {
      result += "\\\\";
    } else {
      result += str[i];
    }
  }

  return result;
}

export function escapeSwitch(str) {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    switch (str[i]) {
      case "\u0000":
        result += "\\0";
        break;
      case "\u0008":
        result += "\\b";
        break;
      case "\u0009":
        result += "\\t";
        break;
      case "\u000A":
        result += "\\n";
        break;
      case "\u000B":
        result += "\\v";
        break;
      case "\u000C":
        result += "\\f";
        break;
      case "\u000D":
        result += "\\r";
        break;
      case "\u0022":
        result += '\\"';
        break;
      case "\u0027":
        result += "\\'";
        break;
      case "\u005C":
        result += "\\\\";
        break;
      default:
        result += str[i];
    }
  }

  return result;
}
