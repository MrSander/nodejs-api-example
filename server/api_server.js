var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
}));

// a port we want to listen to
const PORT=8080;
// a test file file name
const TESTFILE='/tmp/test'

// Get information from the test file
app.get('/test', function(req, res) {
  fs.readFile(TESTFILE, function (err,data) {
    if (err) {
      res.statusCode = 500;
      res.send(err);
      return console.log(err);
    }
    res.type('text/plain');
    res.send(data);
    console.log(data);
  });
});

// Write something into test file
app.post('/test', function(req, res) {
  console.log(req.body)
  fs.writeFile(TESTFILE, JSON.stringify(req.body), function (err,data) {
    if (err) {
      res.statusCode = 500;
      res.send(err);
      return console.log(err);
    }
    res.type('text/plain');
    res.statusCode = 200;
    res.send('Success!');
    console.log('The test file was saved');
  });
});

// Delete test file
app.delete('/test', function(req, res) {
  fs.unlink(TESTFILE, function (err) {
    if (err) {
      res.statusCode = 500;
      res.send(err);
      return console.log(err);
    }
    res.statusCode = 200;
    res.send('Success!');
    console.log('The test file was removed');
  });
});

app.listen(process.env.PORT || PORT);
