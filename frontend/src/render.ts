import { colorMap } from "./colormap"

// 描画処理
async function render(
  canvas: HTMLCanvasElement,
  url: string,
) {
  const ctx =
    canvas.getContext("2d")!

  // バックエンドから描画データを取得
  const response = await fetch(url)

  const data = await response.json()

  // Canvas サイズを更新
  canvas.width = data.width
  canvas.height = data.height

  canvas.style.width = "800px"
  canvas.style.height = "800px"
  canvas.style.imageRendering = "auto"

  // 描画用バッファを作成
  const imageData =
    ctx.createImageData(
      data.width,
      data.height
    )

  // 発散値から色を計算
  for (let y = 0; y < data.height; y++) {

    for (let x = 0; x < data.width; x++) {

      // y 軸を反転
      const value =
        data.data[data.height - 1 - y][x]

      const i =
        (y * data.width + x) * 4

      const c =
        colorMap(
          value,
          data.max_iter
        )

      imageData.data[i]     = c.r
      imageData.data[i + 1] = c.g
      imageData.data[i + 2] = c.b
      imageData.data[i + 3] = 255
    }
  }

  // Canvas に描画
  ctx.putImageData(
    imageData,
    0,
    0
  )
}


// ====================
// Burning Ship
// ====================

export async function loadBurningShip(
  canvas: HTMLCanvasElement,
  cx: number,
  cy: number,
  scale: number,
  realWeight: number,
  imagWeight: number,
) {

  await render(
    canvas,
    "http://localhost:8000/burning_ship"
    + `?cx=${cx}`
    + `&cy=${cy}`
    + `&scale=${scale}`
    + `&real_weight=${realWeight}`
    + `&imag_weight=${imagWeight}`,
  )

}
