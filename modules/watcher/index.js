
const fs = require('fs')
const chokidar = require('chokidar')
const path = require('path');

class Watcher {
  constructor(io, root) {
    this.paths = []
    this.root= root || './data'
    this.init(this.root)

    // One-liner for current directory
    let watcherChokidar = chokidar.watch(root)
    watcherChokidar.on('all', (event, rel_path) => {
      let p = {event: event, path: rel_path}
      p.parts = rel_path.split(path.sep)
      //  p.parent = p.parts.pop().join(path.sep)
      this.paths.push(p)
      io.emit('watcher event', [{root: this.root, event: event, path: rel_path}]);
      //  console.log(this.paths)
    });

    // watcherChokidar.on('ready', logWatched)
    //
    // function logWatched() {
    //   console.log("GET WATCHED",  watcherChokidar.getWatched()   )
    // }

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
