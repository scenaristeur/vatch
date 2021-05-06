//https://thisdavej.com/how-to-watch-for-files-changes-in-node-js/
const fs = require('fs');
require('log-timestamp');

const buttonPressesLogFile = './button-presses.log';

console.log(`Watching for file changes on ${buttonPressesLogFile}`);

let fsWait = false;
fs.watch(buttonPressesLogFile, (event, filename) => {
  if (filename) {
    if (fsWait) return;
    fsWait = setTimeout(() => {
      fsWait = false;
    }, 100);
    console.log(`${filename} file Changed`);
  }
});
