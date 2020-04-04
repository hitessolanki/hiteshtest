var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var fs = require('fs');
const sharp = require('sharp');
var multer = require('multer');
var sequelize = require('./config/config')
var user = require('./model/user');
var images = require('./model/images');
//Compress images size through sharp
app.get(function (req, res) {
  res.send("No Api found");
})
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// To allow cross orignin requests, Requests will be allowed from list of given domains in the array.  
app.use(cors({ credentials: true, origin: ['http://localhost:4200'] }));
// parse application/json
app.use(bodyParser.json());

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './assets/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

var upload = multer({
  storage: storage, fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      req.filetype = file.mimetype.split("/")[1];
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
}).array('file', 5);

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post('/api/addUser', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
});
sequelize.sync().then(() => {
  var server = app.listen(2000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("app listening at http://%s:%s", host, port);
  });
});
