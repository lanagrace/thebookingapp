const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourtSchema = new Schema({
    name: String,
    address: String,
    lat: String,
    lng: String,
    w3w: String, 

    sport: { type: mongoose.Schema.Types.ObjectId, ref: 'Sport' },

    completed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Court = mongoose.model('Court', CourtSchema);