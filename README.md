# Beatmap Generator

## Requirements

This project is made using typescript and compiled to nodeJS

Recompile the project by running `tsc` in the root directory:

### Installing Dependancies

All dependancies can be installed by running this in the project directory.

```bash
npm install
```

---

## Usage
To generate a beatmap, make sure you are the same directory as `makebeatmap.sh` and run the script

`makebeatmap.sh` takes any number of strings, each representing a set of filters used for level generation.

It will generate a zipped and unzipped version of each set of filters, and place them into the `map_output/` directory


### Example:

```bash
bash makebeatmap.sh "hand11-target1111111111-wall000-duration1-rate2-visdistance2-distribution1-rhythm1-song1"
```
Or use the async version of the script, for faster generation of multiple levels
```bash
bash makebeatmapAsync.sh "hand11-target1111111111-wall000-duration1-rate2-visdistance2-distribution1-rhythm1-song1"
```
---

## Performance Benchmark

### Running the benchmark

This will make a beatmap for every possible combination of note placement (1024 beatmaps in total)

___Running this can take some time to compleate, and will generate 4GB of files___

___This script uses up to 16GB of memory during execution, and could become very slow or crash if ran on a machine with under 16GB of allocation avalible___

```bash
time bash makebeatmapAsync.sh $(cat benchmarks/bench1024.txt)
```

### Observations

 - Performance scales linierly once the cpu thread count is met.

### Benchmark results

| Maps Made |      CPU       | Async | Time(s) |
| --------: | :------------: | :---: | ------- |
|      1024 | 9900k (8C 16T) |  yes  | 33      |
|       512 | 9900k (8C 16T) |  yes  | 16      |
|       256 | 9900k (8C 16T) |  yes  | 8       |
|       128 | 9900k (8C 16T) |  yes  | 5       |
|        64 | 9900k (8C 16T) |  yes  | 2       |
|        32 | 9900k (8C 16T) |  yes  | 1       |
|        16 | 9900k (8C 16T) |  yes  | 0.5     |
|         8 | 9900k (8C 16T) |  yes  | 0.3     |
|         4 | 9900k (8C 16T) |  yes  | 0.3     |
|         2 | 9900k (8C 16T) |  yes  | 0.3     |
|         1 | 9900k (8C 16T) |  yes  | 0.3     |
|      1024 | 3317U (2C 4T)  |  yes  | DNF     |
|       512 | 3317U (2C 4T)  |  yes  | DNF     |
|       256 | 3317U (2C 4T)  |  yes  | 121     |
|       128 | 3317U (2C 4T)  |  yes  | 60      |
|        64 | 3317U (2C 4T)  |  yes  | 30      |
|        32 | 3317U (2C 4T)  |  yes  | 15.5    |
|        16 | 3317U (2C 4T)  |  yes  | 7.5     |
|         8 | 3317U (2C 4T)  |  yes  | 4       |
|         4 | 3317U (2C 4T)  |  yes  | 2       |
|         2 | 3317U (2C 4T)  |  yes  | 1.2     |
|         1 | 3317U (2C 4T)  |  yes  | 1.1     |

---

## File name definition

 > Each beatmap can be represented by a single string, containing information about the filters used to generate it.

Each file name contains "`-`" seperated sets of named attributes, each defined by a pure text name, followed by a binary or intiger number.

### Example
 > `hand01-taget1000000000-wall100-duration1-rate2-visdistance2-distribution1-rhythm1.zip`

### Attributes

|       option | format (regex) | Description                                |
| -----------: | :------------: | ------------------------------------------ |
|         hand |   `[01]{2}`    | Selects what hands to include blocks for   |
|       target |   `[01]{10}`   | Selects what target positions are enabled  |
|         wall |   `[01]{3}`    | Selects what walls are enabled             |
|     duration |    `[123]`     | Selects the length of the song             |
|         rate |    `[123]`     | Selects the number of beats between blocks |
| distribution |     `[12]`     | Selects the number of blocks to chian      |
|       rhythm |     `[12]`     | Selects the regularity of timing each note |

---

## Current filter support

|       option | done  | notes                                                                                                                                          |
| -----------: | :---: | ---------------------------------------------------------------------------------------------------------------------------------------------- |
|         hand |  yes  | Currently not taking into account left and right position, only color/hand                                                                     |
|       target |  yes  |                                                                                                                                                |
|         wall |  yes  | Can change the ratio of walls and targets. Can be used with the rhythm setting as well                                                         |
|     duration |  yes  |                                                                                                                                                |
|         rate |  yes  | rate changes the number of beats between each note, not the BPM                                                                                |
| distribution |  no   |                                                                                                                                                |
|       rhythm |  yes  | implemented by adding a randomized offset to each note position, based on the rate, so that no two notes are ever closer than half of the rate |

---

## TODO

 - [ ] Add filter to change ratio of wall and note occurrence
 - [ ] Implement distribution option
 - [ ] Make beats more lively by creating preset
 - [ ] Figure out how to remove the need for duplicating image and song for each map
 - [ ] Implement variable BPM rate option
 - [ ] Add firebase API implementation for automatic uplaod


# TO ADD TO DATABASE:

 - Always both hands
 - rate medium
 - distribution random
 - Rhythm regular
 - Include 