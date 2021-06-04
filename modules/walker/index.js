
const fs = require('fs')
//const chokidar = require('chokidar')
const path = require('path');

let context =  {
  "ldp": "http://www.w3.org/ns/ldp#",
  "xml": "https://www.w3.org/2001/XMLSchema#",
  "dcterms": "http://purl.org/dc/terms/",
  "decimal": "http://www.w3.org/2001/XMLSchema#decimal",
  "integer": "http://www.w3.org/2001/XMLSchema#integer",
  "dateTime": "http://www.w3.org/2001/XMLSchema#dateTime",
  "iana": "http://www.w3.org/ns/iana/media-types/",
  "solid": "http://www.w3.org/ns/solid/terms#",
  "label": "http://www.w3.org/1999/02/22-rdf-syntax-ns#label",
  "stat": "http://www.w3.org/ns/posix/stat#",
  //"@base": "https://bricodeurs.solidweb.org/"
}

class Walker {
  constructor(io, root) {
    this.paths = []
    this.root= root || './data'
    this.init(this.root)
    this.jsonld = {"@context": context,}
  }

  start(dir, done){
    let walker = this
    this.walk(dir, function(err, results) {
      if (err) throw err;
      //  console.log(results);
      walker.jsonld["@context"]["@base"] = path.resolve(dir)
      walker.jsonld["@graph"] = results
      done(null, walker.jsonld)
    })
  }

  ldp_contains(list,dir){
    let contained = list.map(function(x){
      return {"@id": path.resolve(dir,x), "label": x }
    })
    //  console.log(contained)
    return contained
  }
  //https://www.iana.org/assignments/media-types/media-types.xhtml
  walk(dir, done) {
    let walker = this
    var results = [];
    fs.readdir(dir, function(err, list) {
      if (err) return done(err);
      fs.stat(dir, function(err, stat) {
        let n = {"@id": dir, "label": dir, "@type": [
          "ldp:BasicContainer",
          "ldp:Container"
        ],
        "ldp:contains": walker.ldp_contains(list,dir)}
        walker.props(n,stat)
        results.push(n)
      })
      var i = 0;
      (function next() {
        var file = list[i++];
        if (!file) return done(null, results);
        let label = file
        file = path.resolve(dir, file);

        fs.stat(file, function(err, stat) {
          if (stat && stat.isDirectory()) {
            walker.walk(file, function(err, res) {
              results = results.concat(res);
              next();
            });
          } else {
            let n = {"@id": file, "label": label, "@type": [
              "ldp:Resource"
            ]}
            walker.props(n,stat)
            results.push(n);
            next();
          }
        });
      })();
    });
  };

  props(n,stat){
    n["dcterms:modified"] = {
      "@type": "dateTime",
      "@value": stat.mtime
    },
    n["stat:mtime"]= {
      "@type": "decimal",
      "@value": Number((stat.mtimeMs/1000).toFixed(3))
    },
    n["stat:size"]= {
      "@type": "integer",
      "@value": stat.size
    }
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

module.exports = Walker
