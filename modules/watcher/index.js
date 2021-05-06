const chokidar = require('chokidar');

class Watcher {
  constructor(io, root) {
    this.paths = []
    let folder = root || './data'
    // One-liner for current directory
    chokidar.watch(folder).on('all', (event, path) => {
      let p = {event: event, path: path}
      this.paths.push(p)
      io.emit('watcher event', [{event: event, path: path}]);
      //  console.log(this.paths)
    });
  }

  setIo(io){
    this.io = io
  }

}

module.exports = Watcher
