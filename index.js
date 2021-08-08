const express = require('express')
const cors = require('cors')
const fs = require('fs')
const { spawn } = require("child_process");
const app = express()
const port = 3001
app.use(cors())

/*
Run the python script and collect the status output
*/

const pyProg = spawn('python', ['./capture.py']);
var status
pyProg.stdout.on('data', function (data) {
  console.log(data.toString());
  status = data.toString()
});

app.get('/process', async (req, res) => {
  var type = req.query.type
  var inFile
  var outFile
  switch (type) {
    case 'live':
      inFile = 'test.jpg'
      outFile = 'testnew.jpg'
      break
    case 'night':
      inFile = 'test_night.jpg'
      outFile = 'testnew_night.jpg'
      break
    case 'multiple':
      inFile = 'test_multiple.jpg'
      outFile = 'testnew_multiple.jpg'
      break
    case 'blurry':
      inFile = 'test_blurry.jpg'
      outFile = 'testnew_blurry.jpg'
      break
  }
  var processedIn = fs.readFileSync(inFile)
  var processedOut = fs.readFileSync(outFile)
  arrayBufferToBase64 = buffer => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };
  var base64In = Buffer.from(processedIn).toString('base64')
  var base64Out = Buffer.from(processedOut).toString('base64')
  const out = {
    infile: base64In,
    outfile: base64Out,
    status: status
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(out)
})

app.get('/infile', (req, res) => {
  fs.readFile("./test.jpg", function (err, data) {
    if (err) { console.error(err) }
    res.setHeader('Content-Type', 'application/json');
    arrayBufferToBase64 = buffer => {
      var binary = '';
      var bytes = [].slice.call(new Uint8Array(buffer));
      bytes.forEach((b) => binary += String.fromCharCode(b));
      return window.btoa(binary);
    };
    res.send(Buffer.from(data).toString('base64'))
  })
})
app.get('/outfile', (req, res) => {
  fs.readFile("./testnew.jpg", function (err, data) {
    if (err) { console.error(err) }
    res.setHeader('Content-Type', 'application/json');
    arrayBufferToBase64 = buffer => {
      var binary = '';
      var bytes = [].slice.call(new Uint8Array(buffer));
      bytes.forEach((b) => binary += String.fromCharCode(b));
      return window.btoa(binary);
    };
    res.send(Buffer.from(data).toString('base64'))
  })
})


app.get('/people', (req, res) => {
  fs.readFile("./test.jpg", function (err, data) {
    if (err) { console.error(err) }
    res.send(people)
  })
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})