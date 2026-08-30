/**
 * このファイルは、第1章のヒストグラムのコードからセミコロンを
 * 可能な限り取り除いたものです(ASI: 自動セミコロン挿入に頼っています)。
 *
 * ただし、以下のようなケースではセミコロンを省略すると危険です:
 *
 * 1. 前の行の末尾のすぐ次の行が `(` `[` バッククォート(`` ` ``) `+` `-` `/` の
 *    いずれかで始まる場合。これらは「前の行の続き」として解釈できてしまうため、
 *    ASIが働かず1つの文としてつながってしまいます。
 *    例:
 *      let x = doSomething()
 *      (function() { console.log("hi") })()
 *    これは doSomething()(function() { ... })() と解釈され、
 *    doSomething() の戻り値を関数として呼び出そうとしてエラーになります。
 *
 * 2. return / break / continue / throw の直後で改行し、値を次の行に書く場合。
 *    キーワードの直後に自動でセミコロンが挿入されてしまい、
 *    意図した値を返せなくなります。
 *    例:
 *      return
 *      lines.join("\n")
 *    これは return; だけの文として扱われ、常に undefined を返してしまいます。
 *
 * 3. for(;;) のような for 文の中のセミコロンは、文の区切りではなく構文の一部
 *    なので省略できません。
 */

class DefaultMap extends Map {
  constructor(defaultValue) {
    super()
    this.defaultValue = defaultValue
  }

  get(key) {
    if (this.has(key)) {
      return super.get(key)
    } else {
      return this.defaultValue
    }
  }
}

class Histogram {
  constructor() {
    this.letterCounts = new DefaultMap(0)
    this.totalLetters = 0
  }

  add(text) {
    text = text.replace(/\s/g, "").toUpperCase()
    for (let character of text) {
      let count = this.letterCounts.get(character)
      this.letterCounts.set(character, count + 1)
      this.totalLetters++
    }
  }

  toString() {
    let entries = [...this.letterCounts]

    entries.sort((a, b) => {
      if (a[1] === b[1]) {
        return a[0] < b[0] ? -1 : 1
      } else {
        return b[1] - a[1]
      }
    })

    for (let entry of entries) {
      entry[1] = (entry[1] / this.totalLetters) * 100
    }

    entries = entries.filter((entry) => entry[1] >= 1)

    let lines = entries.map(
      ([l, n]) => `${l}: ${"#".repeat(Math.round(n))} ${n.toFixed(2)}%`,
    )

    return lines.join("\n")
  }
}

async function histogramFromStdin() {
  process.stdin.setEncoding("utf-8")
  let histogram = new Histogram()
  for await (let chunk of process.stdin) {
    histogram.add(chunk)
  }
  return histogram
}

histogramFromStdin().then((histogram) => {
  console.log(histogram.toString())
})
