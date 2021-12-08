const args = require('yargs').argv;
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


// custom classes
const Agent = require('./modules/agent');
const Acteur = require('./modules/acteur');
const Organisation = require('./modules/organisation');
const Tension = require('./modules/tension');
const Decision = require('./modules/decision');
const Responsabilte = require('./modules/responsabilite');
const Equipe = require('./modules/equipe');
const Role = require('./modules/role');
const Source = require('./modules/source');
const t = require ('./modules/tools')

// Generic vars
const default_root = 'holaData'

console.log('args: ', args);
args.root != undefined ? console.log("Using Data Folder ",args.root) : console.log ("Using '"+default_root+"', you can customize your root folder with 'node . --root=path/to/your/root/folder'")
let storage = {root: args.root || default_root, folders: [], files: []}
console.log("storage ", storage)

console.log(path.sep)
if (path.sep === "\\") {
  console.log("Windows System");
} else {
  console.log("Not a Windows System");
}


let d = t.date()
console.log("date debut", d)



async function main() {

  let organisation1 = new Organisation({name: "Organisation 1"})
  await organisation1.print()
  let tension1 = new Tension({name: "Tension 1"})
  await tension1.print()

  let decision1 = new Decision({name: "Decision 1"})
  await decision1.print()
  let responsabilite1 = new Responsabilte({name: "Responsabilite 1"})
  await responsabilite1.print()
  let equipe1 = new Equipe({name: "Equipe 1", debug: true})
  await equipe1.print()
  let role1 = new Role({name: "Role 1"})
  await role1.print()

  let source1 = new Source({name: "Source 1", type: "local", folder: "bla", url_synchro:"https://mkljljdqs.sdg", debug: true})



  d = t.date()
  console.log("date intermediaire", d)

  let agent1 = new Agent({name: "AGENT1"})

  await agent1.print()
  await agent1.wait("le texte par ", console.log)


  let acteur1 = new Acteur({name: "Acteur1 swing", age: 32})

  acteur1.print()
  acteur1.printFun()
  acteur1.printAge()
  let name = acteur1.p.name

  await acteur1.wait("un texte mais avec un callback propre à l'acteur ", acteur1.log)

  console.log("name",name)
  acteur1.p.name = "Acteur1 boo"
  name = acteur1.p.name

  console.log("name boo : ",name)
  acteur1.p.age = 33

  acteur1.print()
  acteur1.printFun()
  acteur1.printAge()


  await organisation1.wait("un texte mais avec un callback propre à l'organisation ", organisation1.log)
  await tension1.wait("une tension qui se cherche ", organisation1.log)

  await agent1.wait("test de log  ", agent1.log)

  d = t.date()
  console.log("date fin", d)

}

main();



// const io = new Server(server);
const Watcher = require('./modules/watcher')
let watcher = new Watcher(io, storage)
const Walker = require('./modules/walker')
let walker = new Walker(io, storage)
const FileType = import('file-type');

let users = {}

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
// app.get('/babylon', (req, res) => {
//   res.sendFile(__dirname + '/public/babylon.html');
// });

io.on('connection', (socket) => {
  users[socket.id] = {connexion: new Date()}
  let users_nb = Object.keys(users).length
  console.log(users_nb+" users",users)
  socket.broadcast.emit('chat message', 'A new user '+users_nb); //envoyer à tous les autres
  io.emit('users', users); //envoyer à tous
  walker.start(storage.root, function(err, results) {
    if (err) throw err;
    console.log(results);
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
            fs.writeFile(msg, "", (err) => {
              if (err) throw err;
              console.log("The blank file was succesfully saved!");
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
//  open('http://localhost:3000/vatch-vue');
});



// (async () => {
//   const asyncMsg = Promise.resolve('hello world');
//   console.log(asyncMsg);
// })();

// use an async main function
