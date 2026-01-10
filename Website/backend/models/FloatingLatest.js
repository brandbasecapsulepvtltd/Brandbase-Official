const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    link: String
});

const floatingLatestSchema = new mongoose.Schema({
    cards: [cardSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('FloatingLatest', floatingLatestSchema);
