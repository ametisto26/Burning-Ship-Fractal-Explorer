// ====================
// 色補間
// ====================

function lerp(
  a: number,
  b: number,
  t: number,
) {
  return Math.floor(
    a + (b - a) * t,
  )
}

type Color = {
  r: number
  g: number
  b: number
}

export type ColorMapName =
  | "twilight"
  | "classic"
  | "fire"
  | "ocean"
  | "grayscale"

// ====================
// カラーマップ
// ====================

// 現在選択されているカラーマップ
export let currentColorMap: ColorMapName =
  "twilight"

// カラーマップ変更
export function setColorMap(
  name: ColorMapName,
) {
  currentColorMap = name
}

// ====================
// 各カラーマップ
// ====================

// 現在使用中
function twilight(
  t: number,
): Color {

  const colors = [
    { r: 10,  g: 20,  b: 80  },
    { r: 90,  g: 40,  b: 180 },
    { r: 230, g: 120, b: 255 },
    { r: 255, g: 255, b: 255 },
  ]

  return interpolate(
    colors,
    t,
  )
}

// 昔ながらの虹色
function classic(
  t: number,
): Color {

  const colors = [
    { r: 0,   g: 0,   b: 0   },
    { r: 0,   g: 0,   b: 255 },
    { r: 0,   g: 255, b: 255 },
    { r: 255, g: 255, b: 0   },
    { r: 255, g: 0,   b: 0   },
    { r: 255, g: 255, b: 255 },
  ]

  return interpolate(
    colors,
    t,
  )
}

// 炎
function fire(
  t: number,
): Color {

  const colors = [
    { r: 0,   g: 0,   b: 0   },
    { r: 120, g: 0,   b: 0   },
    { r: 220, g: 40,  b: 0   },
    { r: 255, g: 180, b: 0   },
    { r: 255, g: 255, b: 255 },
  ]

  return interpolate(
    colors,
    t,
  )
}

// 海
function ocean(
  t: number,
): Color {

  const colors = [
    { r: 0,   g: 0,   b: 0   },
    { r: 0,   g: 30,  b: 80  },
    { r: 0,   g: 120, b: 220 },
    { r: 120, g: 220, b: 255 },
    { r: 255, g: 255, b: 255 },
  ]

  return interpolate(
    colors,
    t,
  )
}

// 白黒
function grayscale(
  t: number,
): Color {

  const v =
    Math.floor(255 * t)

  return {
    r: v,
    g: v,
    b: v,
  }
}

// ====================
// 共通補間
// ====================

function interpolate(
  colors: Color[],
  t: number,
): Color {

  const n =
    colors.length - 1

  const x =
    t * n

  const i = Math.min(
    Math.floor(x),
    n - 1,
  )

  const u =
    x - i

  const c0 =
    colors[i]

  const c1 =
    colors[i + 1]

  return {
    r: lerp(c0.r, c1.r, u),
    g: lerp(c0.g, c1.g, u),
    b: lerp(c0.b, c1.b, u),
  }
}

// ====================
// メイン
// ====================

export function colorMap(
  value: number,
  maxIter: number,
): Color {

  // 集合内部
  if (value === 0) {
    return {
      r: 0,
      g: 0,
      b: 0,
    }
  }

  // 発散値を0～1へ正規化
  const t =
    Math.pow(
      Math.min(
        value / maxIter,
        1,
      ),
      0.65,
    )

  switch (currentColorMap) {

    case "classic":
      return classic(t)

    case "fire":
      return fire(t)

    case "ocean":
      return ocean(t)

    case "grayscale":
      return grayscale(t)

    case "twilight":
    default:
      return twilight(t)
  }
}
