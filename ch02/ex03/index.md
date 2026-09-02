# 問題2.3-2: 濁音・半濁音を含むファイル名の正規化形式

以下はAI (Claude) による調査結果です。

| OS / ファイルシステム | 保存形式                                                                               |
| --------------------- | -------------------------------------------------------------------------------------- |
| Windows (NTFS)        | 正規化しない。渡された形式のまま保存（多くのアプリがNFCで渡すため実質NFCになりやすい） |
| macOS (APFS / 旧HFS+) | OS層で正規化され、実質 **NFD** で保存される                                            |

- 旧HFS+はファイルシステム自体がNFDに自動変換する「正規化するファイルシステム」だった。
- 現行のAPFSはファイルシステム自体は正規化しない設計だが、macOSのOS層（Finderやファイル操作API）が正規化を肩代わりしており、結果はHFS+時代と同じくNFDになる。
- この違いにより、macOSで作った濁音・半濁音入りのファイルをWindowsやクラウドストレージ経由で見ると、見た目は同じでも文字コードが一致せず別ファイル扱いされることがある。

## 参考ソース

- [Node.js公式ドキュメント: Working with different filesystems](https://nodejs.org/learn/manipulating-files/working-with-different-filesystems)
- [Explainer: Unicode, normalization and APFS – The Eclectic Light Company](https://eclecticlight.co/2021/05/08/explainer-unicode-normalization-and-apfs/)
