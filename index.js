// root is the root folder you want to use
let root = './data'
// const Io = require('./modules/io')
// let custom_io = new Io()
//
//
// custom_io.hello()
const fs = require('fs')
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const Watcher = require('./modules/watcher')
let watcher = new Watcher(io, root)

const FileType = require('file-type');


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/babylon', (req, res) => {
  res.sendFile(__dirname + '/public/babylon.html');
});

io.on('connection', (socket) => {

  console.log('a user connected');
  socket.broadcast.emit('chat message', 'A new user'); //envoyer à tous les autres
  socket.emit('chat message', 'hi'); //envoyer au nouveau
  socket.emit('watcher event', watcher.paths)
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); //envoyer à tout le monde
  });
  socket.on('read file', (f) => {
    console.log(f)
    readFile(f, socket)
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

async function readFile(f, socket){
  let type = await FileType.fromFile('.\\'+f)
  console.log(type);

  //let content = fs.readFileSync(f, 'utf8')
  fs.readFile(f, 'utf8', function (err,data) {
    if (err) {
      socket.emit('cat file', {path: f, error: err}); //envoyer à tout le monde
    }
    //  console.log(data)
    socket.emit('cat file', {path: f, content: data, type:type}); //envoyer à tout le monde
  });

}

// server.listen(3000,  '192.168.1.85', () => {
server.listen(3000, () => {
  console.log('listening on *:3000');
});
