import { redraw } from "./redraw"

import type {
  BurningShipState
} from "./redraw"

export function setupDrag(
  burningShipCanvas: HTMLCanvasElement,
  cxInput: HTMLInputElement,
  cyInput: HTMLInputElement,
  scaleInput: HTMLInputElement,
  burningShipState: BurningShipState,
) {

  const BASE_WIDTH = 3.0
  const BASE_HEIGHT = 3.0

  let dragging = false

  let lastX = 0
  let lastY = 0

  burningShipCanvas.addEventListener(
    "mousedown",
    (event) => {

      dragging = true

      lastX = event.offsetX
      lastY = event.offsetY

    },
  )

  burningShipCanvas.addEventListener(
    "mouseup",
    () => {

      if (!dragging) {
        return
      }

      dragging = false

      redraw(
        burningShipCanvas,
        burningShipState,
      )

    },
  )

  burningShipCanvas.addEventListener(
    "mouseleave",
    () => {

      dragging = false

    },
  )

  burningShipCanvas.addEventListener(
    "mousemove",
    (event) => {

      if (!dragging) {
        return
      }

      const dx =
        event.offsetX - lastX

      const dy =
        event.offsetY - lastY

      lastX = event.offsetX
      lastY = event.offsetY

      const width =
        BASE_WIDTH / burningShipState.scale

      const height =
        BASE_HEIGHT / burningShipState.scale

      burningShipState.cx -=
        dx / burningShipCanvas.width * width

      burningShipState.cy +=
        dy / burningShipCanvas.height * height

      // 入力欄も更新
      cxInput.value =
        String(burningShipState.cx)

      cyInput.value =
        String(burningShipState.cy)

      scaleInput.value =
        String(burningShipState.scale)

    },
  )
}
