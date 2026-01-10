const mongoose = require('mongoose');

const topBarSchema = new mongoose.Schema({
    offers: [String],
    email: {
        type: String,
        default: 'info@brandbasecapsule.com'
    },
    locations: {
        type: String,
        default: 'Serving: USA, UK, Europe, Saudi, India, SG'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('TopBar', topBarSchema);
