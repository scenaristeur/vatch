export default class Ouiz {
  constructor() {
   // this.reset() // rest manuel
    console.log("OUUUUIIIIIIZ")
    // console.log(sources)
    // this.sources = sources
    // this.graphs = []
  }

  async reset(){
    this.doc = {}
    this.graphs = []
    this.network = {nodes: [], edges: []}
  }

  async load(url){
    let documentLoaderType = 'xhr'
    await jsonld.useDocumentLoader(documentLoaderType/*, options*/);
    this.doc = await jsonld.documentLoader(url, function(err) {
      if(err) {
        alert(err)
      }
    })
    this.doc.jsonld = JSON.parse(this.doc.document)
    delete this.doc.document
    await this.ldpToGraph(this.doc)
    console.log(this)
    return this
  }

  async ldpToGraph(doc){
    let graph

    if (Array.isArray(doc.jsonld.nodes) && Array.isArray(doc.jsonld.edges) && doc.jsonld.nodes.length > 0){
      graph = doc.jsonld

    }else if (Array.isArray(doc.jsonld["ldp:contains"]) && doc.jsonld["ldp:contains"].length > 0){
      graph = await this.pairToGraph(doc)
    }else{
      //alert("no ldp:contains for ", doc.documentUrl)
      graph = await this.oneItemToGraph(doc)
    }
    this.graphs.push(graph)
    console.log(this)

  }

  async pairToGraph(doc){
    let graph = {nodes: [], edges: []}
    let items = doc.jsonld["ldp:contains"]
    graph.nodes = items//.map(obj=> ({ ...obj, label: this.getLabel(obj) })) // if no name -> id as label
    return graph
  }

  async oneItemToGraph(doc){
    let graph = {nodes: [], edges: []}
    let item = doc.jsonld
    graph.nodes.push(item)
    return graph
  }

  async toVis(omitted){
    this.omitted = omitted || []
    console.log(this.graphs, this.network)
    for await (let g of this.graphs){
      console.log("G",g)
      Array.prototype.push.apply(this.network.nodes, g.nodes);
      Array.prototype.push.apply(this.network.edges, g.edges);
    }
    for await (let n of this.network.nodes) {
      if(n.built == undefined){
        await this.buildEdges(n)
      }
    }
    return this
  }



  async buildEdges(n){
    for (const [k, v] of Object.entries(n)) {
      await this.parse(n,k,v)
    }
    n.built = true
  }

  async parse(n, k, v){
    //  let network = this.network
    if (typeof v == "string"){
      v = v.trim()
      let edgeLength = undefined
      if(!this.omitted.includes(k) && v.length > 0){
        var indexO = this.network.nodes.findIndex(x => x.id==v);
        if(indexO === -1){
          let ob =   {id: v, shape: "box", mass: 1}
          if (v.length > 20 ){
            ob.label = v.substring(0,20)+".."
            ob.title = v
          }
          else{
            ob.label = v
          }

          if (v.startsWith('http')){
            ob.color = "#7FD1B9"
            if (v.length > 50 ){
              let lab = v.endsWith('/') ? v.slice(0, -1) : v
              ob.label = lab.substr(lab.lastIndexOf('/') + 1);
              ob.label = ob.label.length > 20 ? ob.label.substring(0,20)+".." : ob.label
              ob.label = "->"+ob.label
              ob.title = v

            }else{
              ob.label = v
            }
          }else{
            ob.color = "#ECC046"
            edgeLength = 1
            ob.mass = 1
          }
          if( k == "type"){
            ob.shape = "star"
            ob.color= "#DE6E4B"
          }


          ob.built = true
          this.network.nodes.push(ob)
        }else{
          this.network.nodes[indexO].mass == undefined ? this.network.nodes[indexO].mass=1 : this.network.nodes[indexO].mass+=3
        }
        let o = this.network.nodes.find(n => n.id == v)
        o.mass+= 3
        // if( k == "type"){
        //   // must do this test a second time after the node has been added to get network.nodes.length ????
        //   edgeLength = 1000
        // }
        let edge = {from: n.id, to: o.id, label: k }
        if (edgeLength != undefined){
          edge.length = edgeLength
          //edge.strength = 300
        }
        this.network.edges.push(edge)

      }else{
        k == "pair:label" ? n.label = v : ""
        k == "label" ? n.label = v : ""
        k == "name" ? n.label = v : ""
        if(k ==  "image"){
          n.shape = "circularImage"
          n.image = v
        }
        if(k ==  "depiction"){
          n.shape = "circularImage"
          n.image = v
        }

      }
    }else if (Array.isArray(v)){
      //console.log(v)
      v.forEach((_v) => {
        this.parse(n,k,_v)
      });


    } else{
      if(!this.omitted.includes(k) && typeof v == "object"){

        var indexOBJ = this.network.nodes.findIndex(x => x.id==v.id);
        if(indexOBJ === -1){
          console.log("ADDING",n.id, typeof v,k, v)
          this.network.nodes.push(v)


        }
        this.network.edges.push({from: n.id, to: v.id, label: k})
        console.log("ADDING edge",n.id, k, v.id)
      }
      else  if(!this.omitted.includes(k) && typeof v == "number"){
        console.log("TODO",n.id, typeof v,k, v)
        //  this.parse(n, k, v)
      }
      else
      {
        console.log("TODO",n.id, typeof v,k, v)
      }

    }
  }
}
