import { redraw, type BurningShipState} from "./redraw"

// drawボタンイベント
export function setupDraw(
  drawButton: HTMLButtonElement,
  burningShipCanvas: HTMLCanvasElement,
  burningShipState: BurningShipState,
  cxInput: HTMLInputElement,
  cyInput: HTMLInputElement,
  scaleInput: HTMLInputElement,
  realWeightInput: HTMLInputElement,
  imagWeightInput: HTMLInputElement,
) {

  drawButton.addEventListener(
    "click",
    () => {
      
      burningShipState.cx =
        Number(cxInput.value)

      burningShipState.cy =
        Number(cyInput.value)

      burningShipState.scale =
        Number(scaleInput.value)

      burningShipState.realWeight =
        Number(realWeightInput.value)

      burningShipState.imagWeight =
        Number(imagWeightInput.value)

      redraw(
        burningShipCanvas,
        burningShipState,
      )
    }
  )
}
