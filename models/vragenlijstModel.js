const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');

const schema = new Schema({
    gebruiker:{type:Schema.Types.ObjectId, ref:'Gebruiker'},
    vak:{type:Schema.Types.ObjectId, ref:'Vak'},
    datum:{type:Date},
    klasgroepen:[{type:Schema.Types.ObjectId,ref:'Klasgroep'}],
    reacties:[{type:Schema.Types.ObjectId,ref:'Reactie'}]
})

module.exports = mongoose.model('Vragenlijst',schema);