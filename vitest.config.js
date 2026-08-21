import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // *.spec.* は Playwright (ブラウザテスト) 用のため、Vitest の対象は *.test.* に限定する
    include: ["**/*.test.?(c|m)[jt]s?(x)"],
    // テストファイルを並列実行しない (Jest の --runInBand 相当)
    fileParallelism: false,
  },
});
