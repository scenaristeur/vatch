
const fs = require('fs')
const chokidar = require('chokidar')
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
  "stat": "http://www.w3.org/ns/posix/stat#",
  //"@base": "https://bricodeurs.solidweb.org/"
}

class Walker {
  constructor(io, root) {
    this.paths = []
    this.root= root || './data'
    this.init(this.root)
    this.jsonld = {"@context": context, "@graph": []}
  }

//
// async walk1(dir, done){
//     console.log(dir)
//     let fullPath = path.resolve(dir)
//     this.jsonld["@context"]["@base"] = fullPath
//     this.jsonld["@graph"] = []
//     await this.explore(fullPath)
//     done(null, this.jsonld)
//   }
//
//   async explore(dir){
//     let mod = this
//     let node = {"@id": dir}
//     await fs.readdir(dir, function(err, list) {
//
//
//       if (err) return done(err);
//       node["ldp:contains"] = mod.ldp_contains(list)
//       mod.jsonld["@graph"].push(node)
//     })
//
//
//   }
//
//   ldp_contains(list){
//     let contained = list.map(function(x){
//       return {"@id": path.resolve(x)}
//     })
//     console.log(contained)
//     return contained
//   }

  // start(root, cb){
  //   this.walk(root, function(err, results) {
  //     if (err) throw err;
  //     context["@base"] = path.resolve(root)
  //     let jsonld = {"@context": context, "@graph": results}
  //   //  console.log(jsonld);
  //     cb(jsonld)
  //
  //   });
  // }

  // start()

  //https://www.iana.org/assignments/media-types/media-types.xhtml
  walk(dir, done) {
    let walker = this
    let fullPath = path.resolve(dir)
    this.jsonld["@context"]["@base"] == undefined ? this.jsonld["@context"]["@base"] = fullPath : ""
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
        if (!file) return done(null, walker.jsonld);
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
            walker.walk(file, function(err, res) {
              walker.jsonld["@graph"] = walker.jsonld["@graph"].concat(res);
              next();
            });
          } else {
            //  node = {"@id": file}
            next();
          }
          walker.jsonld["@graph"].push(node);
        });
      })();
    });
  };

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
