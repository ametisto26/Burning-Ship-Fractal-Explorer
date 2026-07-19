import "../style.css"

import { setupDrag } from "./drag"
import { setupZoom } from "./zoom"

import { setupDraw } from "./draw"
import { redraw } from "./redraw"

import { saveCanvas } from "./saveCanvas"

import { setColorMap, type ColorMapName } from "./colormap"

import type { BurningShipState } from "./redraw"

// ====================
// UIの生成
// ====================

const app =
  document.querySelector<HTMLDivElement>("#app")!

app.innerHTML = `
  <h1>Burning Ship Explorer</h1>

  <div class="layout">

    <div class="controls">

      <section class="panel">

        <h2>Burning Ship</h2>

        <h3>View center</h3>

        <div class="row">
          <span>Re(c):</span>
          <input
            id="cx"
            value="-0.5"
          >
        </div>

        <div class="row">
          <span>Im(c):</span>
          <input
            id="cy"
            value="-0.5"
          >
        </div>

        <div class="row">
          <span>Scale:</span>
          <input
            id="scale"
            value="1"
          >
        </div>

        <h3>Weights</h3>

        <div class="row">
          <span>Re:</span>
          <input
            id="real-weight"
            value="1.0"
          >
        </div>

        <div class="row">
          <span>Im:</span>
          <input
            id="imag-weight"
            value="1.0"
          >
        </div>

        <button id="draw">
          Draw
        </button>

        <div class="row">

          <span>Color:</span>

          <select id="color-map">

            <option value="twilight">
              Twilight
            </option>

            <option value="classic">
              Classic
            </option>

            <option value="fire">
              Fire
            </option>

            <option value="ocean">
              Ocean
            </option>

            <option value="grayscale">
              Grayscale
            </option>

          </select>

        </div>

        <div class="row">
          <span>Render:</span>
          <span id="render-time">--</span>
        </div>

        <div class="row">
          <span>Resolution:</span>
          <span id="resolution">--</span>
        </div>

        <div class="row">
          <span>Iterations:</span>
          <span id="iterations">--</span>
        </div>

      </section>

    </div>

    <div class="viewer">

      <canvas id="burning-ship"></canvas>
    </div>

  </div>
`

// ====================
// UI要素の取得
// ====================

const cxInput =
  document.querySelector<HTMLInputElement>("#cx")!

const cyInput =
  document.querySelector<HTMLInputElement>("#cy")!

const scaleInput =
  document.querySelector<HTMLInputElement>("#scale")!

const realWeightInput =
  document.querySelector<HTMLInputElement>("#real-weight")!

const imagWeightInput =
  document.querySelector<HTMLInputElement>("#imag-weight")!

const drawButton =
  document.querySelector<HTMLButtonElement>("#draw")!

const burningShipCanvas =
  document.querySelector<HTMLCanvasElement>("#burning-ship")!

const colorMapSelect =
  document.querySelector<HTMLSelectElement>("#color-map")!

// ====================
// 状態
// ====================

const burningShipState: BurningShipState = {
  cx: -0.5,
  cy: -0.5,
  scale: 1,
  realWeight: 1.0,
  imagWeight: 1.0,
}

// ====================
// ユーザー操作を登録
// ====================

// ----------
// Burning Ship
// ----------
// ドラッグによる平行移動
setupDrag(
  burningShipCanvas,
  cxInput,
  cyInput,
  scaleInput,
  burningShipState,
)

// ホイールによるズーム
setupZoom(
  burningShipCanvas,
  cxInput,
  cyInput,
  scaleInput,
  burningShipState,
)

// ----------
// 描画・保存
// ----------
// Drawボタンによる再描画
setupDraw(
  drawButton,
  burningShipCanvas,
  burningShipState,
  cxInput,
  cyInput,
  scaleInput,
  realWeightInput,
  imagWeightInput,
)

// Sキー押下による画像保存
window.addEventListener("keydown", (event) => {

  // 入力欄にフォーカス中は無効
  const target = event.target as HTMLElement

  if (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement
  ) {
    return
  }

  // Sキー以外は無視
  if (
    event.key !== "s" &&
    event.key !== "S"
  ) {
    return
  }

  // ブラウザの「名前を付けて保存」を防ぐ
  event.preventDefault()

  // Sキーで保存
  const parameter =
      `c${burningShipState.cx.toFixed(10)}_${burningShipState.cy.toFixed(10)}`

  const burningShipZoom =
      `x${burningShipState.scale.toFixed(0)}`

  const weight =
    `rw${burningShipState.realWeight.toFixed(2)}` + `_iw${burningShipState.imagWeight.toFixed(2)}`

  const burningShipName =
      `burningShip_${parameter}_${weight}_${burningShipZoom}.png`

  saveCanvas(
    burningShipCanvas,
    burningShipName,
  )

})

colorMapSelect.addEventListener(
  "change",
  () => {

    setColorMap(
      colorMapSelect.value as ColorMapName,
    )

    redraw(
      burningShipCanvas,
      burningShipState,
    )

  },
)


// ====================
// 初期表示
// ====================

redraw(
  burningShipCanvas,
  burningShipState,
)
