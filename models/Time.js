const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TimeSchema = new Schema({
    time: String,
    
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Time = mongoose.model('Time', TimeSchema);