//https://thisdavej.com/how-to-watch-for-files-changes-in-node-js/
const fs = require('fs');
require('log-timestamp');

const folder = './data';

console.log(`Watching for file changes on ${folder}`);

let fsWait = false;
fs.watch(folder, (event, name) => {
  fs.lstatSync(path_string).isDirectory()
  if (name) {
    if (fsWait) return;
    fsWait = setTimeout(() => {
      fsWait = false;
    }, 100);
    console.log(`${name} file Changed`);
  }
});
