
const fs = require('fs')
const chokidar = require('chokidar')

class Watcher {
  constructor(io, root) {
    this.paths = []
    this.root= root || './data'
    this.init(this.root)
    // One-liner for current directory
    chokidar.watch(root).on('all', (event, path) => {
      let p = {event: event, path: path}
      this.paths.push(p)
      io.emit('watcher event', [{event: event, path: path}]);
      //  console.log(this.paths)
    });
    
  }

  init(root){
    try {
      if (!fs.existsSync(root)) {
        fs.mkdirSync(root)
      }
    } catch (err) {
      console.error(err)
    }

  }

}

module.exports = Watcher
