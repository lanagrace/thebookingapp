const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReservationSchema = new Schema({
    name: String,
    courtId: { type: mongoose.Schema.Types.ObjectId, ref: 'Court' },
    interval: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    reservedAt: {
        type: Date,
        expires: '0',
        default: Date.now()
    }
});

module.exports = Reservation = mongoose.model('Reservation', ReservationSchema);