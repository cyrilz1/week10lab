let mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title:{
        type: String,
        required: true
    },
    year:{
        type: Number,
        required: true
    },
    actors:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Actor'
    }]
});

module.exports = mongoose.model('Movie', movieSchema);