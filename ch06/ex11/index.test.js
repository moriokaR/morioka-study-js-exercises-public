import { describe, it, expect } from "vitest";
import { point } from "./index.js";

// 問題6.11 のテスト。
// 極座標(r, theta)を持ち、デカルト座標(x, y)をアクセサプロパティで読み書きできる point のテスト。
// point は1つのオブジェクトを使い回すので、各テストの最初で r, theta を設定し直している。
// 小数の誤差があるため、数値の比較は toBeCloseTo を使う。
describe("極座標とデカルト座標を持つオブジェクト", () => {
  describe("x, y を読む(ゲッター)", () => {
    it("x が r と theta から計算される", () => {
      // theta = 0 なので x = 2 * cos(0) = 2
      point.r = 2;
      point.theta = 0;
      expect(point.x).toBeCloseTo(2);
    });
    it("y が r と theta から計算される", () => {
      // theta = π/2(90度)なので y = 2 * sin(π/2) = 2
      point.r = 2;
      point.theta = Math.PI / 2;
      expect(point.y).toBeCloseTo(2);
    });
  });

  describe("x, y に書き込む(セッター)", () => {
    it("x を書き込むと、r と theta が更新される", () => {
      // 準備: 点を (3, 4) にする(r = 5 の 3-4-5 の直角三角形)
      point.r = 5;
      point.theta = Math.atan2(4, 3);
      // x だけ 0 に変える → 新しい点は (0, 4)。r = 4、theta = π/2(真上)になる
      point.x = 0;
      expect(point.r).toBeCloseTo(4);
      expect(point.theta).toBeCloseTo(Math.PI / 2);
      // y は変えていないので、4 のまま
      expect(point.y).toBeCloseTo(4);
    });
    it("y を書き込むと、r と theta が更新される", () => {
      // 準備: 点を (3, 4) にする
      point.r = 5;
      point.theta = Math.atan2(4, 3);
      // y だけ 0 に変える → 新しい点は (3, 0)。r = 3、theta = 0(真右)になる
      point.y = 0;
      expect(point.r).toBeCloseTo(3);
      expect(point.theta).toBeCloseTo(0);
      // x は変えていないので、3 のまま
      expect(point.x).toBeCloseTo(3);
    });
  });

  describe("r, theta に書き込む", () => {
    it("r や theta を変えると、x, y の値も変わる", () => {
      // x, y は保存された値ではなく読むたびに計算されるので、r, theta を変えると追従する
      point.r = 1;
      point.theta = 0;
      expect(point.x).toBeCloseTo(1);
      expect(point.y).toBeCloseTo(0);
      // r, theta を書き換えた後、x, y が新しい値になることを確認
      point.r = 2;
      point.theta = Math.PI / 2;
      expect(point.x).toBeCloseTo(0);
      expect(point.y).toBeCloseTo(2);
    });
  });

  describe("NaN を設定したとき", () => {
    it("x に NaN を設定するとエラーになる", () => {
      // エラーが起きるかを調べるときは、処理を関数で包んで expect に渡す
      // (包まずに書くと、expect に渡す前にエラーが起きてテスト自体が失敗する)
      expect(() => {
        point.x = NaN;
      }).toThrow();
    });
    it("y に NaN を設定するとエラーになる", () => {
      expect(() => {
        point.y = NaN;
      }).toThrow();
    });
  });
});
