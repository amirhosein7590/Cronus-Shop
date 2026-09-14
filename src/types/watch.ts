export type WatchRole =
  | 'glass'
  | 'dial'
  | 'case'
  | 'hands'
  | 'movement'
  | 'crown'
  | 'pushers'
  | 'indices'
  | 'strapUpper'
  | 'strapLower'
  | 'detail'

export type WaypointRole = WatchRole | 'intro'

export interface CameraKeyframe {
  role: WaypointRole
  pos: [number, number, number]
  target: [number, number, number]
  travel: number
  hold: number
}