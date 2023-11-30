const config = require('./dbConfig')
const Interactor = require('./Interactor')
const connection = new Interactor(config);

module.exports =  connection