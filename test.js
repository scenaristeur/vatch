const fs = require('fs')
const chokidar = require('chokidar')
const path = require('path');

let root = './data'

let context =  {
  "ldp": "http://www.w3.org/ns/ldp#",
  "xml": "https://www.w3.org/2001/XMLSchema#",
  "dcterms": "http://purl.org/dc/terms/",
  "decimal": "http://www.w3.org/2001/XMLSchema#decimal",
  "integer": "http://www.w3.org/2001/XMLSchema#integer",
  "dateTime": "http://www.w3.org/2001/XMLSchema#dateTime",
  "iana": "http://www.w3.org/ns/iana/media-types/",
  "solid": "http://www.w3.org/ns/solid/terms#",
  "stat": "http://www.w3.org/ns/posix/stat#",
  "@base": "https://bricodeurs.solidweb.org/"
}


let walk = function(dir, done) {

  var results = []
  // let rootNode = {"@id": dir,
  // "@type" : [],
  // "@modified": ""}
  // results.push(rootNode)
  // fs.stat(dir, function(err, stat) {
  //   let node = {"@id": dir,
  //   "@type": [
  //     "ldp:BasicContainer",
  //     "ldp:Container"
  //   ],}
  //   console.log(dir, stat)
  // })



  fs.readdir(dir, function(err, list) {
    console.log(list)
    if (err) return done(err);


    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      let node = {"@id": file, "@type": ["ldp:Resource"]}
      fs.stat(file, function(err, stat) {
        node["dcterms:modified"] = {
          "@type": "dateTime",
          "@value": stat.mtime
        },
        node["stat:mtime"]= {
          "@type": "decimal",
          "@value": Number((stat.mtimeMs/1000).toFixed(3))
        },
        node["stat:size"]= {
          "@type": "integer",
          "@value": stat.size
        }
        if (stat && stat.isDirectory()) {
          node["@type"].push("ldp:BasicContainer")
          node["@type"].push("ldp:Container")

        console.log(dir, stat)
        walk(file, function(err, res) {
          results = results.concat(res);
          next();
        });
      } else {
      //  node = {"@id": file}
        next();
      }
      results.push(node);
    });
  })();
});
};

walk(root, function(err, results) {
  if (err) throw err;
  context["@base"] = path.resolve(root)
  let jsonld = {"@context": context, "@graph": results}
  console.log(jsonld);

});
