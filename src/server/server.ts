import express from 'express'
import path from 'path';
import { getAllBeatmaps } from '../allBeatmapsFilter';
import { BeatMap, ILevelPerams } from '../beatmap';
var app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var cors = require('cors');
app.use(cors());

var port = process.env.PORT || 8002;
var router = express.Router();

router.post('/', (req, res) => {
  res.json(getAllBeatmaps(req.body as ILevelPerams));
});

router.get('/song', function(req, res) {
    console.log(req.query["song"])
    let song_string = req.query["song"];
    if(typeof song_string != "string") return;
    if(!song_string) return;
    res.sendFile(path.join(__dirname, '../../src/server/songs', song_string, 'song.egg'));
  }
);


router.get('/cover', function(req, res) {
  console.log(req.query["song"])
  let song_string = req.query["song"];
  if(typeof song_string != "string") return;
  if(!song_string) return;
  res.sendFile(path.join(__dirname, '../../src/server/songs', song_string, 'cover.jpg'));
  
});

app.listen(port);

app.use('/getsong', router);

console.log('API hosted on port: ' + port);

//Cover:  https://firebasestorage.googleapis.com/v0/b/luneaire-68fce.appspot.com/o/assets%2Fcover.jpg?alt=media&token=9f5d2a23-d9f7-4e71-a2b9-3990d3a71270
//Song:   https://firebasestorage.googleapis.com/v0/b/luneaire-68fce.appspot.com/o/assets%2Fsong.egg?alt=media&token=7326bdcf-863b-4c2b-a2f9-078c08cec0d0