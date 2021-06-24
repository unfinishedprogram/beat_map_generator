import express from 'express'
import { BeatMap } from '../beatmap';
var app = express()
var regex = new RegExp("^hand[01]{2}-target[01]{10}-wall[01]{3}-duration[123]-rate[1234]-visdistance[123]-distribution[12]-rhythm[123]-song.*$");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var port = process.env.PORT || 8002;
var router = express.Router();

router.get('/', function (req, res) {
  if ((typeof req.query["song_string"] != "string"))
  {
    throw new Error('Invalid querry')

  } else if (!regex.test(req.query["song_string"]))
  {
    throw new Error('Invalid level string')

  } else
  {
    res.json(new BeatMap( req.query["song_string"] as string).getBeatmapJson())
  }
});

app.listen(port);

app.use('/getsong', router);

console.log('API hosted on port: ' + port);

//Cover:  https://firebasestorage.googleapis.com/v0/b/luneaire-68fce.appspot.com/o/assets%2Fcover.jpg?alt=media&token=9f5d2a23-d9f7-4e71-a2b9-3990d3a71270
//Song:   https://firebasestorage.googleapis.com/v0/b/luneaire-68fce.appspot.com/o/assets%2Fsong.egg?alt=media&token=7326bdcf-863b-4c2b-a2f9-078c08cec0d0