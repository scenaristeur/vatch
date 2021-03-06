let root = './data'
// root is the root folder you want to use
/* '../data' pour sortir de dossier de l'appli, ou
/* './data' pour le mettre dans l'appli ,
/* mais bloque parfois le renommage par
/* l'explorateur quand l'appli est lancée, à voir*/

const open = require('open');
const fs = require('fs')
const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});

if (path.sep === "\\") {  console.log("Windows System");} else {console.log("Not a Windows System");}

// list https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
//var fs = require('fs');
//var path = require('path');

let storage = {root: root, folders: [], files: []}

const Watcher = require('./modules/watcher')
let watcher = new Watcher(io, root)
const Walker = require('./modules/walker')
let walker = new Walker(io, root)
const FileType = require('file-type');
let users = {}

const Thing = require('./modules/thing')
//let thing = new Thing({id : "test"})
// presque un package.json
let config = {
  "ve:name": "Smag",
  type : ["server"], //pas de ve car type jsonld  /activityStreams ?
  "ve:description": "This is the main worker of a vatch system",
  "ve:groups": ["vatch"],

  //"ve:meta":{"ve:dependencies": ["vatch/Watcher", "vatch/Walker"]}
}
let smagMainWorker = new Thing(config)
console.log("smag : ", smagMainWorker.getData())

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  users[socket.id] = {connexion: new Date()}
  let users_nb = Object.keys(users).length
  console.log(users_nb+" users",users)
  socket.broadcast.emit('chat message', 'A new user '+users_nb); //envoyer à tous les autres
  io.emit('users', users); //envoyer à tous
  walker.start(root, function(err, results) {
    if (err) throw err;
    //    console.log(results);
    socket.emit('init', {pathsep: path.sep, welcome: "hi", users: users_nb, folder: results}); //envoyer au nouveau
  });
  socket.emit('watcher event', watcher.paths)
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); //envoyer à tout le monde
    if(msg.startsWith('data')){
      //  console.log(msg)
      if (msg.endsWith(path.sep)){
        try {
          if (!fs.existsSync(msg)) {
            fs.mkdirSync(msg)
          }
        } catch (err) {
          console.error(err)
        }
      }else{
        try {
          if (!fs.existsSync(msg)) {
            let extension = msg.split('.')[1]

            console.log("ext", extension)
            if (extension == undefined ){
              let thing = new Thing({
                "ve:name" : msg.substring(msg.lastIndexOf('/') + 1),
                "ve:path": msg,
                "ve:meta": {"ve:created": Date.now()}
              })
              content = JSON.stringify(thing.getData(), null, 2)
            }else{
              content = ""
            }
            fs.writeFile(msg, content, (err) => {
              if (err) throw err;
              console.log("The file was succesfully saved!");
            });
          }
        } catch (err) {
          console.error(err)
        }
      }
    }
  });

  socket.on('write file', (msg) => {
    io.emit('chat message', msg.path); //envoyer à tout le monde
    if(msg.path.startsWith('data')){
      fs.writeFile(msg.path, msg.content, (err) => {
        if (err) throw err;
        console.log("The file was succesfully saved!");
      });
    }
  });
  socket.on('read file', (params) => {
    readFile(params, socket)
  });

  socket.on('disconnect', () => {
    delete users[socket.id]
    io.emit('users', users);
    console.log('user disconnected');
  });
});

async function readFile(params, socket){
  let f = params.path
  if (f== undefined){
    console.log("oho there is no params.path", params)
    return
  }
  let type = await FileType.fromFile('.'+path.sep+f)
  type != undefined ? console.log("mime type",type) : ""
  //image loading
  if(type != undefined && type.mime != undefined && type.mime.split('/')[0] == 'image'){
    fs.readFile(f, /*{encoding: 'base64'},*/ function (err,data) {
      if (err) {
        console.log('error', err)
        params.error = err
        socket.emit('cat file', params);
      }
      params.content = data.toString('base64')
      params.type = type
      socket.emit('cat file', params);
      console.log('image file is initialized');
    });
  }
  else{
    fs.readFile(f, 'utf8', function (err,data) {
      if (err) {
        console.log('error', err)
        params.error = err
        socket.emit('cat file', params);
      }
      params.content = data
      params.type = type
      socket.emit('cat file', params);
    });
  }


}

//server.listen(3000, '0.0.0.0', () => {
server.listen(3000, () => {
  console.log('server running at localhost:3000');
  console.log('1. First time client install: `npm run client:install`')
  console.log('2. later client update: `npm run client:update`');
  // open('http://localhost:3000/vatch-vue');
});


// var walk = function(dir, done) {
//   var results = [];
//   fs.readdir(dir, function(err, list) {
//     if (err) return done(err);
//     var i = 0;
//     (function next() {
//       var file = list[i++];
//       if (!file) return done(null, results);
//       file = path.resolve(dir, file);
//       fs.stat(file, function(err, stat) {
//         if (stat && stat.isDirectory()) {
//           walk(file, function(err, res) {
//             results = results.concat(res);
//             next();
//           });
//         } else {
//           results.push(file);
//           next();
//         }
//       });
//     })();
//   });
// };

// app.get('/babylon', (req, res) => {
//   res.sendFile(__dirname + '/public/babylon.html');
// });
