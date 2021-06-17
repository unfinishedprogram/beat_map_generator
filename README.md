# Beatmap Generator

## Requirements

This project is made using typescript and compiled to nodeJS

Recompile the project by running `tsc` in the root directory: 

### Installing Dependancies

All dependancies can be installed by running this in the project directory.

```bash
npm install
```

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

## Performance Benchmark:


This will make a beatmap for every possible combination of note placement, all other filters will be consistant

**_Running this can take some time to compleate, and will generate 4GB of files_**

```bash
bash makebeatmapAsync.sh $(cat file_names.txt)
```

## Current filter support

|       option | done  | notes                                                                      |
| -----------: | :---: | -------------------------------------------------------------------------- |
|         hand |  yes  | Currently not taking into account left and right position, only color/hand |
|       target |  yes  |                                                                            |
|         wall |  no   |                                                                            |
|     duration |  yes  |                                                                            |
|         rate |  yes  | rate changes the number of beats between each note, not the BPM            |
| distribution |  no   |                                                                            |
|       rhythm |  yes  |                                                                            |
|         song |  no   |                                                                            |

## TODO
 - Implement distribution option
 - Make beats more lively by creating preset
