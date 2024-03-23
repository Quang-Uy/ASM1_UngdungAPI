const mongoose = require('mongoose');

const FashionSchema = new mongoose.Schema({
    ten: {
        type: String,
        required: true
    },
    hang: {
        type: String,
        required: true
    },
    gia: {
        type: Number
    }
});

const FashionModel = new mongoose.model('fashion', FashionSchema);

module.exports = FashionModel;