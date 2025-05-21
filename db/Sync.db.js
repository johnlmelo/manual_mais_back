const DB = require('./models/index');

for(const model in DB){
    console.log(model)
}