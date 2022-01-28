import { WallData } from "../paramiters";

export function createWallData(
  _time: number,
  position: 0 | 1 | 2, // Left, Top, Right
  _duration: number
):WallData {
  return {
    "_time": _time,
    "_lineIndex": (position == 2) ? 2 : 0,
    "_duration": _duration,
    "_type": (position == 1) ? 1 : 0,
    "_width": (position == 1) ? 4 : 2,
  }
}