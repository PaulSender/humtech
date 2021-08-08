const express = require('express')
const cors = require('cors')
const fs = require('fs')
const { spawn } = require("child_process");
const app = express()
const port = 3001
app.use(cors())


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

const pyProg = spawn('python', ['./capture.py']);
var people
pyProg.stdout.on('data', function (data) {
  console.log(data.toString());
  people = data.toString()
});
app.get('/people', (req, res) => {
  fs.readFile("./test.jpg", function (err, data) {
    if (err) { console.error(err) }
    res.send(people)
  })
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})