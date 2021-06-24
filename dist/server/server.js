"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var beatmap_1 = require("../beatmap");
var app = express_1.default();
var regex = new RegExp("^hand[01]{2}-target[01]{10}-wall[01]{3}-duration[123]-rate[1234]-visdistance[123]-distribution[12]-rhythm[123]-song.*$");
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
var port = process.env.PORT || 8002;
var router = express_1.default.Router();
router.get('/', function (req, res) {
    if ((typeof req.query["song_string"] != "string")) {
        throw new Error('Invalid querry');
    }
    else if (!regex.test(req.query["song_string"])) {
        throw new Error('Invalid level string');
    }
    else {
        res.json(new beatmap_1.BeatMap(req.query["song_string"]).getBeatmapJson());
    }
});
app.listen(port);
app.use('/getsong', router);
console.log('API hosted on port: ' + port);
//Cover:  https://firebasestorage.googleapis.com/v0/b/luneaire-68fce.appspot.com/o/assets%2Fcover.jpg?alt=media&token=9f5d2a23-d9f7-4e71-a2b9-3990d3a71270
//Song:   https://firebasestorage.googleapis.com/v0/b/luneaire-68fce.appspot.com/o/assets%2Fsong.egg?alt=media&token=7326bdcf-863b-4c2b-a2f9-078c08cec0d0
