import { redraw } from "./redraw"

import type {
  BurningShipState
} from "./redraw"

export function setupZoom(
  burningShipCanvas: HTMLCanvasElement,
  cxInput: HTMLInputElement,
  cyInput: HTMLInputElement,
  scaleInput: HTMLInputElement,
  burningShipState: BurningShipState,
) {

  const BASE_WIDTH = 3.0
  const BASE_HEIGHT = 3.0

  burningShipCanvas.addEventListener(
    "wheel",
    (event) => {

      event.preventDefault()

      const oldScale =
        burningShipState.scale

      const newScale =
         Math.max(
           event.deltaY < 0
             ? oldScale * 1.2
             : oldScale / 1.2,
           1.0,  //  倍率の下限設定
         )

      const x =
        event.offsetX
        / burningShipCanvas.clientWidth

      const y =
        1
        - event.offsetY
        / burningShipCanvas.clientHeight

      const viewWidth =
        BASE_WIDTH / oldScale

      const viewHeight =
        BASE_HEIGHT / oldScale

      const xmin =
        burningShipState.cx
        - viewWidth / 2

      const ymin =
        burningShipState.cy
        - viewHeight / 2

      const mouseCx =
        xmin + x * viewWidth

      const mouseCy =
        ymin + y * viewHeight

      const newViewWidth =
        BASE_WIDTH / newScale

      const newViewHeight =
        BASE_HEIGHT / newScale

      burningShipState.cx =
        mouseCx
        - (x - 0.5) * newViewWidth

      burningShipState.cy =
        mouseCy
        - (y - 0.5) * newViewHeight

      burningShipState.scale =
        newScale

      // 入力欄を更新
      cxInput.value =
        String(burningShipState.cx)

      cyInput.value =
        String(burningShipState.cy)

      scaleInput.value =
        String(burningShipState.scale)

      redraw(
        burningShipCanvas,
        burningShipState,
      )

    },
    {
      passive: false,
    },
  )

}
