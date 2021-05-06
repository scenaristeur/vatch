import { Server } from "socket.io";

const io = new Server(8080, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});


const chokidar = require('chokidar');

let folder = './data'
// One-liner for current directory
chokidar.watch(folder).on('all', (event, path) => {
  console.log(event, path);
  console.log(io)
});

interface Todo {
  completed: boolean;
  editing: boolean;
  title: string;
}

let todos: Array<Todo> = [];

io.on("connect", (socket) => {
    socket.emit("todos", todos);

    // note: we could also create a CRUD (create/read/update/delete) service for the todo list
    socket.on("update-store", (updatedTodos) => {
      // store it locally
      todos = updatedTodos;
      // broadcast to everyone but the sender
      socket.broadcast.emit("todos", todos);
    });
});
