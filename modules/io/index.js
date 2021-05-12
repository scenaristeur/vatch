class Io {
  constructor() {
    // this.reset()
    console.log("Sock OUUUUIIIIIIZ")
    this.io = require("socket.io")(server, {
      cors: {
        // origin: "http://localhost:3001",
        origin: '*',
        methods: ["GET", "POST"]
      }
    });
    this.io.init()

  }

  init(){
    console.log("soc hello")
  }

}

module.exports = Io
