// root is the root folder you want to use
let root = './data'
// const Io = require('./modules/io')
// let custom_io = new Io()
//
//
// custom_io.hello()

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const Watcher = require('./modules/watcher')
let watcher = new Watcher(io, root)


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
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


// server.listen(3000,  '192.168.1.85', () => {
server.listen(3000, () => {
  console.log('listening on *:3000');
});
