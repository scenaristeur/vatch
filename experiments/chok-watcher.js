const chokidar = require('chokidar');

let folder = './data'
// One-liner for current directory
chokidar.watch(folder).on('all', (event, path) => {
  console.log(event, path);
});
