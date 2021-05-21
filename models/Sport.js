const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SportSchema = new Schema({
    name: String,
    
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Sport = mongoose.model('Sport', SportSchema);