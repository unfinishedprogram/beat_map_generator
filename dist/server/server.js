"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var allBeatmapsFilter_1 = require("../allBeatmapsFilter");
var app = express_1.default();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
var cors = require('cors');
app.use(cors());
var port = process.env.PORT || 8002;
var router = express_1.default.Router();
router.post('/', function (req, res) {
    res.json(allBeatmapsFilter_1.getAllBeatmaps(req.body));
});
router.get('/song', function (req, res) {
    console.log(req.query["song"]);
    var song_string = req.query["song"];
    if (typeof song_string != "string")
        return;
    if (!song_string)
        return;
    res.sendFile(path_1.default.join(__dirname, '../../src/server/songs', song_string, 'song.egg'));
});
router.get('/cover', function (req, res) {
    console.log(req.query["song"]);
    var song_string = req.query["song"];
    if (typeof song_string != "string")
        return;
    if (!song_string)
        return;
    res.sendFile(path_1.default.join(__dirname, '../../src/server/songs', song_string, 'cover.jpg'));
});
app.listen(port);
app.use('/getsong', router);
console.log('API hosted on port: ' + port);
//Cover:  https://firebasestorage.googleapis.com/v0/b/luneaire-68fce.appspot.com/o/assets%2Fcover.jpg?alt=media&token=9f5d2a23-d9f7-4e71-a2b9-3990d3a71270
//Song:   https://firebasestorage.googleapis.com/v0/b/luneaire-68fce.appspot.com/o/assets%2Fsong.egg?alt=media&token=7326bdcf-863b-4c2b-a2f9-078c08cec0d0
