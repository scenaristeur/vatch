var Acteur = require('../acteur');

class Equipe extends Acteur {

  constructor(properties){
    super(properties); // this is required
    //this.p.members == undefined ? this.p.members = [] : ""
    console.log("members",this.p.members)
  }

}
module.exports = Equipe;
