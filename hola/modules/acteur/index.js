var Agent = require('../agent');

class Acteur extends Agent {

  constructor(properties){
    super(properties); // this is required
  }

  printFun(){
    console.log('Youohouhouh, my name is : '+ this.p.name);
  }

  printAge(){
    console.log(this.p.name +" is "+this.p.age+ " year(s) old.")
  }


}
module.exports = Acteur;
