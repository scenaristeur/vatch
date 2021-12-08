const args = require('yargs').argv;
const t = require ('./modules/tools')
const default_root = '~/holaData'

let d = t.date()
console.log("date debut", d)
console.log('args: ', args);

args.root != undefined ? console.log("Using Data Folder ",args.root) : console.log ("Using '"+default_root+"', you can customize your root folder with 'node . --root=path/to/your/root/folder'")
let local_storage = {root: args.root || default_root, folders: [], files: []}

console.log(path.sep)
if (path.sep === "\\") {
  console.log("Windows System");
} else {
  console.log("Not a Windows System");
}



const Agent = require('./modules/agent');
const Acteur = require('./modules/acteur');
const Organisation = require('./modules/organisation');
const Tension = require('./modules/tension');
const Decision = require('./modules/decision');
const Responsabilte = require('./modules/responsabilite');
const Equipe = require('./modules/equipe');
const Role = require('./modules/role');
const Source = require('./modules/source');

async function main() {

  let organisation1 = new Organisation({name: "Organisation 1"})
  await organisation1.print()
  let tension1 = new Tension({name: "Tension 1"})
  await tension1.print()

  let decision1 = new Decision({name: "Decision 1"})
  await decision1.print()
  let responsabilite1 = new Responsabilte({name: "Responsabilite 1"})
  await responsabilite1.print()
  let equipe1 = new Equipe({name: "Equipe 1", debug: true})
  await equipe1.print()
  let role1 = new Role({name: "Role 1"})
  await role1.print()

  let source1 = new Source({name: "Source 1", type: "local", folder: "bla", url_synchro:"https://mkljljdqs.sdg", debug: true})



  d = t.date()
  console.log("date intermediaire", d)

  let agent1 = new Agent({name: "AGENT1"})

  await agent1.print()
  await agent1.wait("le texte par ", console.log)


  let acteur1 = new Acteur({name: "Acteur1 swing", age: 32})

  acteur1.print()
  acteur1.printFun()
  acteur1.printAge()
  let name = acteur1.p.name

  await acteur1.wait("un texte mais avec un callback propre à l'acteur ", acteur1.log)

  console.log("name",name)
  acteur1.p.name = "Acteur1 boo"
  name = acteur1.p.name

  console.log("name boo : ",name)
  acteur1.p.age = 33

  acteur1.print()
  acteur1.printFun()
  acteur1.printAge()


  await organisation1.wait("un texte mais avec un callback propre à l'organisation ", organisation1.log)
  await tension1.wait("une tension qui se cherche ", organisation1.log)

  await agent1.wait("test de log  ", agent1.log)

  d = t.date()
  console.log("date fin", d)

}

main();



// (async () => {
//   const asyncMsg = Promise.resolve('hello world');
//   console.log(asyncMsg);
// })();

// use an async main function
