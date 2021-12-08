# run
```
node .
# or
npm run serve
```

# custom local data folder
```
node . --root=path/to/your/root/folder
```



# es6 modules import
- https://stackoverflow.com/questions/42684177/node-js-es6-classes-with-require

```
class Animal{

  constructor(name){
    this.name = name ;
  }

  print(){
    console.log('Name is :'+ this.name);
  }
}
module.exports = Animal;
```

- extend
```
var Animal = require('./Animal');

class Cat extends Animal {
  ...
}
```

- graphql server
- différents serveurs : https://graphql.org/code/#javascript
- https://www.apollographql.com/docs/apollo-server/getting-started/
- https://odyssey.apollographql.com/lift-off-part1/feature-overview-and-setup

- jsonld
- https://flur.ee/json-ld/
- https://medium.com/swlh/thow-to-implement-json-ld-structure-data-with-javascript-fdcde8ccf8f2 & https://www.npmjs.com/package/react-schemaorg
- leveldb
- https://www.yld.io/blog/node-js-databases-using-leveldb/
