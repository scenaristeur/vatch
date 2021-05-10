import Vue from './js/vue.js'
import App from './App.vue'
// import './registerServiceWorker'
// import router from './router'
import store from './store'



import Ouiz from './js/ouiz.js' // chargement de Ouiz
let ouiz = new Ouiz() // creation d'une instance de Ouiz
// liste des predicats pour lesquels on ne souhaite pas créer les liens
let omitted = [ "@context", "id", "label", "pair:label", "name",  "inbox", "outbox", "followers", "following", "publicKey", "shape", "type", "title", "color", "image"]

document.getElementById("loadData").addEventListener("click", function() {
  loadData()
});


async function loadData(){
  await ouiz.reset() // pour vider le ouiz, ne pas utiliser si on veut cumuler les urls dans le même graph
  document.getElementById("result").innerHTML = "<hr><hr>"
  let url = document.getElementById("inputUrl").value
  console.log("click",url,ouiz)
  await ouiz.load(url) // charge l'url et créé un tableau de graphs
  console.log(ouiz)
  await ouiz.toVis(omitted) // transform le tableau de graphs en network visjs : { nodes: [], edges: []}
  // on peut ici avoir de la même manière ouiz.toD3() ou ouiz.toCytoscape()

  console.log(ouiz)
  document.getElementById("result").innerHTML += "Nodes: "+ouiz.network.nodes.length+" nodes & Edges: "+ouiz.network.edges.length+" edges<br><hr><hr>"
  document.getElementById("result").innerHTML += JSON.stringify(ouiz.network, undefined,2)
}


var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
