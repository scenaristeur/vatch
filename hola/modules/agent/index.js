// this.p = agent properties
class Agent{

  constructor(properties){
    this.p = properties ;
  //  console.log("construct", this.p)
  if (properties.debug == true){this.debug()}
  }

  debug(){
    console.log("--- DEBUG --- props : ",this.p)
  }

  print(){
    console.log("--printing props : ",this.p)
  }

  log(text){
    console.warn('-----log--- ',text)
  }

  async wait (str, callback){
    let name = this.p.name
    setTimeout(function() {
      str+= " "+name
      callback(str);
    }, 3000);
  }


}
module.exports = Agent;
