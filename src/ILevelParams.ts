import { NoteData } from "./level_obj/notedata";

export interface IStrLevelParams {
  filters: {
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
}

export interface ILevelParams {
  hand: 0 | 1 | 2, // Left, Right, Both
  duration: 60 | 120 | 180, // Seconds
  distribution: "random" | "blocked",
  rate: number,
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

export function strParamsToLevelParams(params: IStrLevelParams):ILevelParams {
  return {
    hand: ["10", "01", "11"].indexOf(params.filters.hand) as 0 | 1 | 2,
    targets: (() => {
      let boolTargs = [];
      for (let target of params.filters.targets) {
        boolTargs.push(target == "1");
      }
      return boolTargs
    })(),
    wall: {
      top: (params.filters.wall[0] == "1"),
      left: (params.filters.wall[1] == "1"),
      right: (params.filters.wall[2] == "1")
    },
    duration: [60, 120, 180][parseInt(params.filters.duration) - 1] as 60 | 120 | 180,
    distribution: (params.filters.distribution == "1") ? "blocked" : "random",
    rate: [75, 100, 120, 150][parseInt(params.filters.rate)], // TEMP VALUES
    rhythm: params.filters.rhythm,
    song: params.filters.song,
    visDistance: parseInt(params.filters.visDistance),
  }
}



export function peramToFileName(data: IStrLevelParams): string {
  return `hand${data.filters.hand}-target${data.filters.targets}-wall${data.filters.wall}-duration${data.filters.duration}-visdistance${data.filters.visDistance}-distribution${data.filters.distribution}-rhythm${data.filters.rhythm}-song${data.filters.song}`
}

// hand10-target0001000000-wall000-duration1-rate2-visdistance2-distribution1-rhythm1-song1

export function fileNameToParams(file_name: string): IStrLevelParams {
  let params = file_name.split("-");
  return {
    filters: {
      hand: params[0].slice(-2) as "01" | "10" | "11",
      targets: params[1].slice(-10),
      wall: params[2].slice(-3),
      duration: params[3].slice(-1),
      rate: params[4].slice(-1),
      visDistance: params[5].slice(-1),
      distribution:params[6].slice(-1),
      rhythm: params[7].slice(-1),
      song: params[8].slice(-1)
    }
  }
}