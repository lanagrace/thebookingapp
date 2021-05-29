const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReservationSchema = new Schema({
    courtId: { type: mongoose.Schema.Types.ObjectId, ref: 'Court' },
    interval: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = Reservation = mongoose.model('Reservation', ReservationSchema);