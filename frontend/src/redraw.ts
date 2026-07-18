import { loadBurningShip } from "./render"

export type BurningShipState  = {
  cx: number
  cy: number
  scale: number
  realWeight: number
  imagWeight: number
}


export async function redraw(
  burningShipCanvas: HTMLCanvasElement,
  burningShipState: BurningShipState ,
) {

    // マンデルブロ集合を描画
    await loadBurningShip(
      burningShipCanvas,
      burningShipState.cx,
      burningShipState.cy,
      burningShipState.scale,
      burningShipState.realWeight,
      burningShipState.imagWeight,
    )

}
