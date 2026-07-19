# Burning-Ship-Fractal-Explorer

Burning Ship Fractal Explorer は，Burning Ship フラクタルを高速に描画・探索するための可視化ツールです。

バックエンドでは Python・Numba を用いてフラクタル計算を高速化し，フロントエンドでは TypeScript と HTML Canvas によって快適な操作性を実現しています。

本プロジェクトでは，通常の Burning Ship フラクタルだけでなく，実部・虚部に異なる重みを与えた拡張版 Burning Ship フラクタルも描画できます。

---

# スクリーンショット

（画像を追加予定）

---

# 特徴

- Burning Ship フラクタルの高速描画
- Numba による JIT コンパイル
- FastAPI によるバックエンド API
- TypeScript + HTML Canvas による描画
- ドラッグによる平行移動
- マウスホイールによるズーム
- Draw ボタンによる再描画
- スーパーサンプリング（2×2）
- スムーズカラーリング
- カラーマップ切り替え
  - Twilight
  - Classic
  - Fire
  - Ocean
  - Grayscale
- PNG 保存（S キー）
- 実部・虚部の重み変更

---

# 数学的補足

通常の Burning Ship フラクタルは

```math
z\_{n+1}
=
\left(
|\operatorname{Re}(z_n)|

- i|\operatorname{Im}(z_n)|
  \right)^2
- c
```

によって定義されます。

本プロジェクトではさらに，

```math
z_{n+1}
=
\left(
\alpha |\operatorname{Re}(z_n)|
+
i\beta |\operatorname{Im}(z_n)|
\right)^2
+
c
```

という重み付き Burning Ship フラクタルも扱えます。

ここで

- $\alpha$：実部の重み
- $\beta$：虚部の重み

です。

$\alpha=\beta=1$ とすると通常の Burning Ship フラクタルになります。

---

# 動作環境

- Python 3.11 以上
- Node.js
- npm

---

# インストール

## リポジトリを取得

```bash
git clone <repository-url>

cd Burning-Ship-Fractal-Explorer
```

---

## Python 仮想環境

Windows

```bash
python -m venv .venv
```

有効化

```bash
.venv\Scripts\activate
```

ライブラリをインストール

```bash
pip install -r requirements.txt
```

---

## フロントエンド

```bash
cd frontend

npm install
```

---

# 実行

## バックエンド

```bash
uvicorn backend.main:app --reload
```

デフォルトでは

```
http://localhost:8000
```

で起動します。

---

## フロントエンド

```bash
cd frontend

npm run dev
```

ブラウザで

```
http://localhost:5173
```

を開きます。

---

# 操作方法

| 操作           | 内容             |
| -------------- | ---------------- |
| ドラッグ       | 平行移動         |
| マウスホイール | ズーム           |
| Draw           | 再描画           |
| Color          | カラーマップ変更 |
| S キー         | PNG 保存         |

---

# パラメータ

| 項目        | 説明                |
| ----------- | ------------------- |
| Re(c)       | 描画中心（実部）    |
| Im(c)       | 描画中心（虚部）    |
| Scale       | 倍率                |
| Real Weight | 実部の重み $\alpha$ |
| Imag Weight | 虚部の重み $\beta$  |

---

# 使用技術

## Backend

- Python
- FastAPI
- NumPy
- Numba

## Frontend

- TypeScript
- Vite
- HTML Canvas

---

# ディレクトリ構成

```text
backend/
    main.py
    burning_ship.py

frontend/
    src/
        main.ts
        redraw.ts
        render.ts
        draw.ts
        drag.ts
        zoom.ts
        saveCanvas.ts
        colormap.ts
```

---

# 今後の予定

今後は以下のフラクタルへの対応を予定しています。

- Burning Ship Julia Set (Julia set associated with the Burning Ship map)

フラクタルごとに UI を共通化し，フラクタル種別のみ切り替えられる構成を目指しています。

---

# ライセンス

MIT License
