export interface IStrLevelParams {
  hand: "10" | "01" | "11",
  duration: string,
  distribution: string,
  rate: string,
  rhythm: string,
  song: string,
  targets: string,
  visDistance: string,
  wall: string
}

export interface ILevelParams {
  hand: 0 | 1 | 2, // Left, Right, Both
  duration: number;
  distribution: "random" | "blocked",
  rate: string,
  rhythm: string,
  song: string,
  targets: boolean[],
  visDistance: number, // TODO
  wall: {
    top: boolean,
    left: boolean,
    right: boolean
  }
}

export function peramToFileName(data: IStrLevelParams): string {
  return `hand${data.hand}-target${data.targets}-wall${data.wall}-duration${data.duration}-visdistance${data.visDistance}-distribution${data.distribution}-rhythm${data.rhythm}-song${data.song}`
}

export function fileNameToParams(file_name: string): IStrLevelParams {
  let params = file_name.split("-");
  return {
    hand: params[0].slice(-2) as "01" | "10" | "11",
    targets: params[1].slice(-12),
    wall: params[2].slice(-3),
    duration: params[3].slice(-1),
    rate: params[4].slice(-1),
    visDistance: params[5].slice(-1),
    distribution:params[6].slice(-1),
    rhythm: params[7].slice(-1),
    song: params[8].slice(-1)
  }
}